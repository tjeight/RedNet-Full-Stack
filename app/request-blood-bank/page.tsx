"use client";

import React, { useState } from "react";

const RequestForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bname, setBName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    // ✅ Validation
    if (!name || !email || !bname || !location || !phone || !password) {
      setError("❌ All fields are required.");
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
          address: location,
          phone,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong!");
      }

      setSuccess("✅ Request submitted successfully!");
      setName("");
      setEmail("");
      setBName("");
      setLocation("");
      setPhone("");
      setPassword("");
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg border border-red-100">
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600"
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
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Blood Bank Request
          </h1>
          <p className="text-gray-600">
            Fill the form to request admin access for your blood bank
          </p>
        </div>

        {/* ✅ Show messages */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                placeholder="Tejas Jagdale"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                placeholder="tejasjagdale@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Blood Bank Name
            </label>
            <input
              type="text"
              id="bname"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              placeholder="City Blood Center"
              value={bname}
              onChange={(e) => setBName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Blood Bank Address
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              placeholder="123 Main Street"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Set Admin Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Request Admin Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
