import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as faceapi from "face-api.js";
import { TypographyH3 } from "@/components/custom/Typography";
import { Check, LogOut } from "lucide-react";

export default function Attendance() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [imageValid, setImageValid] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loadingModels, setLoadingModels] = useState(true);
  const [mode, setMode] = useState("");
  const [attendanceDone, setAttendanceDone] = useState(false);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setLoadingModels(false);
    };
    loadModels();
  }, []);

  // Get location and address
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setMessage({
        text: "Geolocation is not supported by your browser",
        type: "red",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        try {
          // Use a more reliable address API if you have a key, else fallback to OSM
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setAddress(data.display_name || "Address not found");
        } catch (e) {
          setAddress("Address fetch failed");
        }
      },
      () => {
        setMessage({
          text: "Failed to get location automatically",
          type: "red",
        });
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Format time in 12-hour format
  const formatTime = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Face detection and capture logic
  const handleCapture = async (captureMode) => {
    setMessage({ text: "", type: "" });
    if (!webcamRef.current) {
      setMessage({ text: "Webcam not ready", type: "red" });
      return;
    }
    if (attendanceDone) {
      setMessage({ text: "Attendance already marked for today.", type: "red" });
      return;
    }
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      setMessage({ text: "Failed to capture image", type: "red" });
      return;
    }
    // Face detection
    const img = new window.Image();
    img.src = screenshot;
    img.onload = async () => {
      const detections = await faceapi.detectAllFaces(
        img,
        new faceapi.TinyFaceDetectorOptions()
      );
      if (detections.length === 1) {
        setImageValid(true);
        setImage(screenshot);
        const now = new Date();
        if (captureMode === "in") {
          setInTime(now.toISOString());
          setMessage({ text: "Check-in successful!", type: "green" });
        } else if (captureMode === "out") {
          setOutTime(now.toISOString());
          setMessage({ text: "Check-out successful!", type: "green" });
        }
        fetchLocation();
        setMode(captureMode);
        // If both in and out are done, mark attendance as done
        if (inTime && captureMode === "out") setAttendanceDone(true);
        if (captureMode === "in" && outTime) setAttendanceDone(true);
      } else {
        setImageValid(false);
        setMessage({
          text: "Face not detected or multiple faces found. Please try again.",
          type: "red",
        });
      }
    };
  };

  const submitAttendance = () => {
    if (!image || !location || !inTime) {
      setMessage({ text: "Incomplete attendance data!", type: "red" });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      userId: "USER_ID_HERE",
      selfie: image,
      location,
      address,
      inTime,
      outTime,
      timestamp: new Date().toISOString(),
    };
    // Simulate API call
    setTimeout(() => {
      setMessage({ text: "Attendance submitted successfully!", type: "green" });
      setIsSubmitting(false);
      setAttendanceDone(true);
    }, 1000);
  };

  // Webcam border color logic
  const webcamBorder =
    imageValid && image
      ? "border-green-500"
      : image && !imageValid
      ? "border-red-500"
      : "border-gray-300";

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <TypographyH3>Live Webcam</TypographyH3>
        <div>
          <div
            className={`mx-auto flex items-center justify-center border-4 ${webcamBorder} rounded-full w-64 h-64 overflow-hidden bg-black`}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="object-cover w-64 h-64 rounded-full"
              videoConstraints={{ facingMode: "user" }}
            />
          </div>
          {loadingModels && (
            <div className="text-center text-sm text-gray-500 mt-2">
              Loading face detection...
            </div>
          )}
          {message.text && (
            <div
              className={`my-3 text-center text-sm ${
                message.type === "green" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <TypographyH3>Attendance Details</TypographyH3>
        <div>
          {image && (
            <div
              className={`mb-4 border-4 rounded-full w-48 h-48 mx-auto flex items-center justify-center overflow-hidden ${
                imageValid ? "border-green-500" : "border-red-500"
              }`}
            >
              <img
                src={image}
                alt="Selfie"
                className="rounded-full object-cover w-48 h-48"
              />
            </div>
          )}

          {inTime && (
            <p className="text-sm text-green-700 mb-1">
              In Time: {formatTime(inTime)}
            </p>
          )}
          {outTime && (
            <p className="text-sm text-red-700 mb-1">
              Out Time: {formatTime(outTime)}
            </p>
          )}

          {address && (
            <p className="text-sm text-gray-800 break-words">
              Address: {address}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Button
              onClick={() => handleCapture("in")}
              disabled={!!inTime || loadingModels || attendanceDone}
              variant="default"
            >
              <Check /> Check In
            </Button>
            <Button
              onClick={() => handleCapture("out")}
              disabled={!inTime || !!outTime || loadingModels || attendanceDone}
              variant="secondary"
            >
              <LogOut /> Check Out
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={submitAttendance}
              disabled={
                isSubmitting || !inTime || !image || !location || attendanceDone
              }
              className="mt-4"
            >
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
