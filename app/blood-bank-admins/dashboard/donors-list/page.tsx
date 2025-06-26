"use client";
import { useEffect, useState } from "react";

type Donor = {
  id: string;
  full_name: string;
  blood_type: string;
  phone?: string;
  last_donated?: string;
  created_at: string;
};

export default function DonorListPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await fetch("/api/donors-list");
      const data = await res.json();
      setDonors(data.donors || []);
      setLoading(false);
    };

    fetchDonors();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🙍 Donor List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : donors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <table className="w-full border rounded-md shadow-sm bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Blood Type</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Last Donated</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{donor.full_name}</td>
                <td className="py-2 px-4">{donor.blood_type}</td>
                <td className="py-2 px-4">{donor.phone || "-"}</td>
                <td className="py-2 px-4">
                  {donor.last_donated
                    ? new Date(donor.last_donated).toLocaleDateString()
                    : "Never"}
                </td>
                <td className="py-2 px-4">
                  {new Date(donor.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
