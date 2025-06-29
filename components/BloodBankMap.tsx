// components/BloodBankMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "@/utils/fixLeafletIcons"; // fixes default marker icons

type Props = {
  latitude: number;
  longitude: number;
};

export default function BloodBankMap({ latitude, longitude }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Blood Bank Location</Popup>
      </Marker>
    </MapContainer>
  );
}
