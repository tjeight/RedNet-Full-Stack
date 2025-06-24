"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const SuperLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("❌ Invalid email or password");
      return;
    }

    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      setError("❌ Failed to establish session");
      return;
    }

    // Send tokens to server to set cookie
    await fetch("/api/set-cookie", {
      method: "POST",
      body: JSON.stringify(session.data.session),
      headers: { "Content-Type": "application/json" },
    });

    // Redirect to dashboard
    router.push("/super-admin/dashboard");
  };

  // Handle Forgot Password redirect
  const handleForgotPassword = () => {
    router.push("/super-admin/forgot-password");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-orange-300 via-white to-green-400 px-4">
      <div className="space-y-6 text-center w-full max-w-md bg-white shadow-2xl rounded-2xl px-6 py-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Super Admin Login
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-red-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        <p
          className="underline text-blue-600 hover:text-blue-800 cursor-pointer mt-4"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default SuperLogin;
