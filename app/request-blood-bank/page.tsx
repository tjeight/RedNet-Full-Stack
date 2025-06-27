"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Types
type Coordinates = [number, number];

// Dynamically import Leaflet components
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

// Create a component that uses useMapEvents
const MapClickHandler = ({
  setCoordinates,
}: {
  setCoordinates: (coords: Coordinates) => void;
}) => {
  const map = dynamic(
    () =>
      import("react-leaflet").then((mod) => {
        const { useMapEvents } = mod;
        return function MapEvents() {
          useMapEvents({
            click(e) {
              setCoordinates([e.latlng.lat, e.latlng.lng]);
            },
          });
          return null;
        };
      }),
    { ssr: false }
  );

  const MapEvents = map as React.FC<{
    setCoordinates: (coords: Coordinates) => void;
  }>;
  return <MapEvents setCoordinates={setCoordinates} />;
};

const RequestForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bname, setBName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const defaultCenter: Coordinates = [20.5937, 78.9629]; // Center of India
  const mapRef = useRef(null);

  useEffect(() => {
    setIsMapLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name ||
      !email ||
      !bname ||
      !address ||
      !phone ||
      !password ||
      !coordinates
    ) {
      setError("All fields are required and location must be selected on map");
      return;
    }

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
          blood_bank_name: bname,
          address,
          location: {
            type: "Point",
            coordinates: [coordinates[1], coordinates[0]],
          },
          phone,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong!");
      }

      setSuccess("Request submitted successfully!");
      setName("");
      setEmail("");
      setBName("");
      setAddress("");
      setPhone("");
      setPassword("");
      setCoordinates(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-slate-950 [&>div]:absolute [&>div]:bottom-0 [&>div]:right-[-20%] [&>div]:top-[-10%] [&>div]:h-[500px] [&>div]:w-[500px] [&>div]:rounded-full [&>div]:bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
          <div></div>
        </div>
      </div>

      <Link
        href="/"
        className="absolute top-6 left-6 z-50 inline-flex items-center text-gray-400 hover:text-white transition-colors group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <div className="relative w-full max-w-4xl flex gap-6">
        {/* Form Section */}
        <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-800">
          <div className="text-center mb-4">
            <div className="mx-auto w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            </div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-1">
              Blood Bank Portal
            </h1>
            <p className="text-gray-400 text-xs">
              Request administrative access for your blood bank
            </p>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-xs animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-3 p-2 bg-green-900/50 border border-green-800 rounded-lg text-green-200 text-xs animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {success}
              </div>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="bname"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Blood Bank Name
              </label>
              <input
                type="text"
                id="bname"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="City Blood Center"
                value={bname}
                onChange={(e) => setBName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Blood Bank Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="123 Main Street"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="phone"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                Set Admin Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-300 text-xs mt-2"
            >
              Request Admin Access
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="flex-1 bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-800">
          <div className="h-full flex flex-col">
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Pin Your Location on Map
              </label>
              <p className="text-xs text-gray-500">
                Click on the map to set your blood bank location
              </p>
              {coordinates && (
                <p className="text-xs text-gray-400 mt-1">
                  Selected: {coordinates[0].toFixed(4)},{" "}
                  {coordinates[1].toFixed(4)}
                </p>
              )}
            </div>
            <div className="flex-1 rounded-lg overflow-hidden border border-gray-700">
              {isMapLoaded && (
                <MapContainer
                  center={defaultCenter}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler setCoordinates={setCoordinates} />
                  {coordinates && (
                    <Marker position={coordinates}>
                      <Popup>Blood Bank Location</Popup>
                    </Marker>
                  )}
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RequestForm;
