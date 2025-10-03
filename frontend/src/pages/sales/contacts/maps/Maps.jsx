"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Map, Marker } from "pigeon-maps";

const companies = [
  { id: 1, name: "Company A", lat: 18.5204, lng: 73.8567 }, // Pune
  { id: 2, name: "Company B", lat: 18.5245, lng: 73.8478 },
  { id: 3, name: "Company C", lat: 18.51, lng: 73.85 },
  { id: 4, name: "Company D", lat: 18.53, lng: 73.87 },
];

const distanceOptions = [
  { label: "1KM", value: 1 },
  { label: "5KM", value: 5 },
  { label: "10KM", value: 10 },
  { label: "30KM", value: 30 },
  { label: "60KM", value: 60 },
];

export default function Maps() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(false);
        },
        () => {
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
    }
  }, []);

  useEffect(() => {
    if (selectedCompany && selectedDistance) {
      const center = companies.find((c) => c.id === parseInt(selectedCompany));
      const nearby = companies.filter((company) => {
        const distance = getDistanceFromLatLonInKm(
          center.lat,
          center.lng,
          company.lat,
          company.lng
        );
        return distance <= selectedDistance;
      });
      setFilteredCompanies(nearby);
    }
  }, [selectedCompany, selectedDistance]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-6 items-center">
        <Select onValueChange={(value) => setSelectedCompany(value)}>
          <SelectTrigger className="sm:w-[250px]">
            <SelectValue placeholder="Select a Company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id.toString()}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedDistance(Number(value))}>
          <SelectTrigger className="sm:w-[250px]">
            <SelectValue placeholder="Select Distance" />
          </SelectTrigger>
          <SelectContent>
            {distanceOptions.map((opt, i) => (
              <SelectItem key={i} value={opt.value.toString()}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error Message for Location Permission */}
      {locationError && (
        <div className="text-red-600 text-sm">
          Please Allow Location Permission for browser *
        </div>
      )}

      <div className="w-full h-[700px] rounded overflow-hidden">
        <Map
          center={
            userLocation
              ? [userLocation.lat, userLocation.lng]
              : [18.5204, 73.8567]
          }
          zoom={13}
          height={600}
        >
          {filteredCompanies.map((company) => (
            <Marker
              key={company.id}
              width={30}
              anchor={[company.lat, company.lng]}
            />
          ))}
          {userLocation && (
            <Marker
              width={30}
              color="blue"
              anchor={[userLocation.lat, userLocation.lng]}
            />
          )}
        </Map>
      </div>
    </div>
  );
}
