"use client";
import { useEffect, useState } from "react";

type BloodGroup = {
  id: string;
  blood_bank_id: string;
  type: string;
  quantity: number;
};

export default function BloodGroupsPage() {
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blood Group Stock</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Blood Type</th>
            <th className="p-2 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {bloodGroups.map((group) => (
            <tr key={group.id}>
              <td className="p-2 border">{group.type}</td>
              <td className="p-2 border">{group.quantity} units</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
