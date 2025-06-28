"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type BloodGroup = {
  type: string;
  quantity: number;
};

type BloodBank = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  slug: string;
  blood_groups?: BloodGroup[];
};

export default function HomePage() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(3600000); // 30 seconds default

  const fetchBloodBanks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Add cache-busting parameter to ensure fresh data
      const res = await fetch(`/api/rednet/blood-banks?t=${Date.now()}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.bloodBanks) {
        throw new Error("No blood banks data received");
      }

      // Filter out blood groups with quantity <= 0 on the client side
      const filteredBanks = data.bloodBanks.map((bank: BloodBank) => ({
        ...bank,
        blood_groups:
          bank.blood_groups?.filter((group) => group.quantity > 0) || [],
      }));

      setBloodBanks(filteredBanks);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("Failed to load blood banks:", err);
      setError("Failed to load blood banks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBloodBanks();
  }, []);

  // Auto-refresh setup
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBloodBanks();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const filteredBanks = bloodBanks.filter((bank) => {
    const matchesName = bank.name.toLowerCase().includes(search.toLowerCase());
    const matchesBloodGroup =
      bloodGroupFilter === "" ||
      (bank.blood_groups &&
        bank.blood_groups.some(
          (group) => group.type.toLowerCase() === bloodGroupFilter.toLowerCase()
        ));
    return matchesName && matchesBloodGroup;
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Refresh Controls */}
        <div className="flex justify-between items-center mb-6">
          {lastUpdated && (
            <p className="text-sm text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBloodBanks}
              className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm flex items-center transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Refreshing...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Now
                </span>
              )}
            </button>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
              disabled={isLoading}
            >
              {/* <option value={15000}>15s refresh</option>
              <option value={30000}>30s refresh</option> */}
              {/* <option value={60000}>1m refresh</option> */}
              <option value={3600000}>60m refresh</option>
            </select>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4">
            🩸 RedNet Blood Network
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting blood donors, recipients, and banks for a life-saving
            ecosystem
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link href="/request-blood-bank" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Add Blood Bank
            </motion.button>
          </Link>

          <Link href="/super-admin/login" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Super Admin Login
            </motion.button>
          </Link>

          <Link href="/blood-bank-admins/login" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Blood Bank Login
            </motion.button>
          </Link>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Search blood banks by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Blood Group Filter */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="">All Blood Types</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/50 text-red-200 rounded-xl border border-red-700 text-center">
            {error}
          </div>
        )}

        {/* Blood Banks Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBanks.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-400">
                  {search || bloodGroupFilter
                    ? "No matching blood banks found"
                    : "No blood banks available yet"}
                </p>
              </div>
            ) : (
              filteredBanks.map((bank, index) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/30 hover:border-red-500/30 transition-all"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {bank.name}
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {bank.address || "Address not provided"}
                      </p>
                      <p className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {bank.phone || "Phone not provided"}
                      </p>
                      {bank.blood_groups && bank.blood_groups.length > 0 && (
                        <div className="pt-2">
                          <p className="text-sm text-gray-400 mb-1">
                            Available blood types :
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {bank.blood_groups.map((group) => (
                              <div
                                key={group.type}
                                className={`px-2 py-1 rounded text-xs flex items-center ${
                                  bloodGroupFilter &&
                                  group.type.toLowerCase() ===
                                    bloodGroupFilter.toLowerCase()
                                    ? "bg-red-500/90 text-white"
                                    : "bg-red-900/50 text-red-300"
                                }`}
                              >
                                <span>{group.type}</span>
                                {/* <span className="ml-1 font-bold">
                                  ({group.quantity})
                                </span> */}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Link href={`/blood-banks/${bank.slug}`} passHref>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-6 w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center"
                      >
                        View Details
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
        {/* After About Section */}
        {/* After About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12 mt-2"
        >
          <Link href="/about" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-transparent border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20 transition-all"
            >
              📩 About Us
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-transparent border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20 transition-all"
            >
              📩 Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
