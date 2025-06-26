// app/page.tsx
"use client";

import { useEffect, useState } from "react";

type BloodBank = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  slug: string;
};

export default function HomePage() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const res = await fetch("/api/rednet/blood-banks");
        const data = await res.json();
        setBloodBanks(data.bloodBanks || []);
      } catch (error) {
        console.error("Failed to load blood banks", error);
      }
    };

    fetchBloodBanks();
  }, []);

  const filteredBanks = bloodBanks.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-2 text-center">
          🩸 Welcome to RedNet
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Find nearby blood banks, check blood availability, and more.
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search blood banks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No blood banks found.
            </p>
          ) : (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-red-600">
                  {bank.name}
                </h3>
                <p className="text-gray-600">{bank.address || "No address"}</p>
                <p className="text-gray-600">{bank.phone || "No phone"}</p>
                <a
                  href={`/blood-banks/${bank.slug}`}
                  className="mt-4 inline-block text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  View Details →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
