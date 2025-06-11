"use client";

import React from "react";

const SuperLogin = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-orange-300 via-white to-green-400 px-4">
      <div className="space-y-6 text-center w-full max-w-md bg-white shadow-2xl rounded-2xl px-6 py-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Super Admin Login</h1>

        <form className="space-y-5">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
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
      </div>
    </div>
  );
};

export default SuperLogin;
