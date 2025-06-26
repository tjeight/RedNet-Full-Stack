"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#8e44ad",
  "#2ecc71",
  "#f39c12",
];

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch("/api/summary");
      const data = await res.json();
      setSummary(data);
    };

    fetchSummary();
  }, []);

  if (!summary) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg text-gray-600">🩸 Total Blood Units</h2>
          <p className="text-3xl font-bold text-red-600">
            {summary.totalStock}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg text-gray-600">❤️ Donations (30d)</h2>
          <p className="text-3xl font-bold text-green-600">
            {summary.donationCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg text-gray-600">💰 Purchases (30d)</h2>
          <p className="text-3xl font-bold text-blue-600">
            {summary.purchaseCount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          🩸 Blood Group Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summary.bloodGroupStats}
              dataKey="quantity"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {summary.bloodGroupStats.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
