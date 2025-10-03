"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH3 } from "@/components/custom/Typography";
import { Map, Marker } from "pigeon-maps";

export default function CompanyDialog({ trigger, onSave, defaultData = {} }) {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    description: "",
    domain: "",
    latitude: "",
    longitude: "",
  });

  // Populate default data when dialog opens
  useEffect(() => {
    if (defaultData) {
      setCompany({
        name: defaultData.name || "",
        address: defaultData.address || "",
        description: defaultData.description || "",
        domain: defaultData.domain || "",
        latitude: defaultData.latitude || "",
        longitude: defaultData.longitude || "",
      });
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCompany((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      });
    } else {
      alert("Geolocation is not available");
    }
  };

  const handleSave = () => {
    if (company.name.trim() && company.address.trim()) {
      onSave(company);
    } else {
      alert("Please fill in the required fields");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <TypographyH3 className="text-start">
            {defaultData?.name ? "Edit Company" : "Add Company"}
          </TypographyH3>
          <DialogTitle />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
          <div className="md:col-span-8 space-y-4">
            <div className="grid gap-2">
              <Label>Company Name</Label>
              <Input
                name="name"
                placeholder="Company Name"
                value={company.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Textarea
                name="address"
                placeholder="Address"
                value={company.address}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>About Company</Label>
              <Textarea
                name="description"
                placeholder="Description"
                value={company.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Domain Name</Label>
              <Input
                name="domain"
                placeholder="Domain Name"
                value={company.domain}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 md:col-span-4">
            <div className="rounded border">
              <Map
                height={200}
                defaultCenter={[18.5204, 73.8567]}
                center={
                  company.latitude && company.longitude
                    ? [
                        parseFloat(company.latitude),
                        parseFloat(company.longitude),
                      ]
                    : [18.5204, 73.8567]
                }
                zoom={13}
              >
                {company.latitude && company.longitude && (
                  <Marker
                    width={30}
                    anchor={[
                      parseFloat(company.latitude),
                      parseFloat(company.longitude),
                    ]}
                  />
                )}
              </Map>
            </div>

            <div className="grid gap-2">
              <Label>Latitude</Label>
              <Input
                name="latitude"
                placeholder="Latitude"
                value={company.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Longitude</Label>
              <Input
                name="longitude"
                placeholder="Longitude"
                value={company.longitude}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Button
                className="w-full bg-sky-400 hover:bg-sky-500"
                onClick={handleGetLocation}
              >
                Get Location
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
