"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

type BloodGroup = {
  id: string;
  blood_bank_id: string;
  type: string;
  quantity: number;
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface BloodBank {
  name: string;
  address: string;
  phone: string;
  latitude: number | null;
  longitude: number | null;
  blood_groups: BloodGroup[];
}

const BloodBankDetailsPage = () => {
  const { slug } = useParams();
  const [bank, setBank] = useState<BloodBank | null>(null);
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`/api/blood-banks/${slug}`);
      const { data } = await res.json();
      setBank(data);
    };

    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/blood-groups");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        setBloodGroups(data.bloodGroups);
      } catch (err: any) {
        setError(err.message);
      }
    };

    // 🛠️ Only run fixLeafletIcons on client
    if (typeof window !== "undefined") {
      import("@/utils/fixLeafletIcons").then((mod) => mod.default?.());
    }

    fetchDetails();
    fetchGroups();
  }, [slug]);

  if (!bank) return <div className="p-6 text-center">Loading...</div>;

  const hasCoordinates = bank.latitude !== null && bank.longitude !== null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-2">{bank.name}</h1>
      <p className="text-gray-700">{bank.address}</p>
      <p className="text-gray-700 mb-4">📞 {bank.phone}</p>

      {hasCoordinates && (
        <div className="my-6">
          <MapContainer
            center={[bank.latitude!, bank.longitude!]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[bank.latitude!, bank.longitude!]}>
              <Popup>
                {bank.name} <br /> {bank.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {hasCoordinates && (
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Directions
        </a>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2">
        Available Blood Groups
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {bloodGroups.map((group) => (
          <li
            key={group.id}
            className="border p-2 rounded bg-white text-gray-800"
          >
            <strong>{group.type}</strong>: {group.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodBankDetailsPage;
