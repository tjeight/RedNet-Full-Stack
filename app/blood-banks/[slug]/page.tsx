"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

type BloodGroup = {
  id: string;
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
  const router = useRouter();
  const [bank, setBank] = useState<BloodBank | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`/api/blood-banks/${slug}`);
      const { data } = await res.json();
      setBank(data);
    };

    // Fix leaflet icons on client side only
    if (typeof window !== "undefined") {
      import("@/utils/fixLeafletIcons").then((mod) => mod.default?.());
    }

    fetchDetails();
  }, [slug]);

  if (!bank)
    return <div className="p-6 text-center text-gray-300">Loading...</div>;

  const hasCoordinates = bank.latitude !== null && bank.longitude !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blood Banks
        </button>

        {/* Header Section */}
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 shadow-2xl">
          <h1 className="text-4xl font-bold text-amber-400 mb-3">
            {bank.name}
          </h1>
          <div className="flex items-center text-gray-300 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-300">{bank.address}</p>
          </div>
          <div className="flex items-center text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <p className="text-gray-300">📞 {bank.phone}</p>
          </div>
        </div>

        {/* Map Section */}
        {hasCoordinates && (
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 shadow-xl">
            <div className="my-6 rounded-lg overflow-hidden border border-gray-700">
              <MapContainer
                center={[bank.latitude!, bank.longitude!]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "350px", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[bank.latitude!, bank.longitude!]}>
                  <Popup className="text-gray-800">
                    {bank.name} <br /> {bank.address}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Get Directions
            </a>
          </div>
        )}

        {/* Blood Groups Section */}
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Available Blood Groups
          </h2>

          {bank.blood_groups && bank.blood_groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bank.blood_groups.map((group, index) => (
                <div
                  key={group.id ?? `${group.type}-${index}`}
                  className="bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-400">
                      {group.type}
                    </span>
                    <span className="text-xl font-semibold text-amber-400">
                      {group.quantity} units
                    </span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-amber-500"
                      style={{
                        width: `${Math.min(100, (group.quantity / 10) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-400 text-lg">
                No blood group data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodBankDetailsPage;
