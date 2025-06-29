"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Define types for your data
type BloodGroupStat = {
  type: string;
  quantity: number;
};

type DashboardData = {
  admin: {
    full_name: string;
  };
  bloodBank: {
    name: string;
    address?: string;
    phone?: string;
  };
  stats: {
    totalBloodUnits: number;
    totalDonations: number;
    totalPurchases: number;
    totalDonors: number;
  };
  bloodInventory: BloodGroupStat[];
  recentDonations: {
    name: string;
    donations: number;
  }[];
  recentTransactions: {
    type: string;
    blood_type: string;
    quantity: number;
    created_at: string;
    person_name?: string;
    donor?: {
      full_name: string;
      phone?: string;
    };
    phone?: string;
  }[];
};

type DonationData = {
  name: string;
  donations: number;
};
const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#8e44ad",
  "#2ecc71",
  "#f39c12",
];

const navItems = [
  {
    name: "Dashboard",
    href: "/blood-bank-admins/dashboard",
    icon: "📊",
  },
  {
    name: "Blood Inventory",
    href: "/blood-bank-admins/dashboard/blood-groups",
    icon: "🩸",
  },
  {
    name: "Donors List",
    href: "/blood-bank-admins/dashboard/donors-list",
    icon: "❤️",
  },
  {
    name: "Add Donor",
    href: "/blood-bank-admins/dashboard/donors/add",
    icon: "🩹",
  },
  {
    name: "Billing",
    href: "/blood-bank-admins/dashboard/billing/add",
    icon: "💰",
  },
  // {
  //   name: "Reports",
  //   href: "/blood-bank-admins/dashboard/reports",
  //   icon: "📈",
  // },
];

const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/blood-bank/stats");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch data");

        setDashboardData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/blood-bank-admins/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (!dashboardData) return <p className="p-4">Error loading data</p>;

  // Use real data for the donations chart
  const recentDonationsData: DonationData[] = dashboardData.recentDonations;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">RedNet </h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-purple-600/30 text-white border border-purple-500/50"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info and Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
              {dashboardData.admin.full_name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {dashboardData.admin.full_name}
              </p>
              <p className="text-xs text-gray-400">
                {dashboardData.bloodBank.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600/30 hover:bg-red-600/40 text-white rounded-lg transition-colors border border-red-500/50 flex items-center justify-center"
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            {dashboardData.bloodBank.name} Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
              <h2 className="text-lg text-gray-300">🩸 Total Blood Units</h2>
              <p className="text-4xl font-bold text-red-400 mt-2">
                {dashboardData.stats.totalBloodUnits}
                <span className="text-sm ml-2 text-gray-400">units</span>
              </p>
              <div className="mt-4 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-red-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (dashboardData.stats.totalBloodUnits / 100) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-green-500/50 transition-all">
              <h2 className="text-lg text-gray-300">❤️ Donations (30d)</h2>
              <p className="text-4xl font-bold text-green-400 mt-2">
                {dashboardData.stats.totalDonations}
                <span className="text-sm ml-2 text-gray-400">donations</span>
              </p>
              <div className="mt-4 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (dashboardData.stats.totalDonations / 50) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <h2 className="text-lg text-gray-300">💰 Purchases (30d)</h2>
              <p className="text-4xl font-bold text-blue-400 mt-2">
                {dashboardData.stats.totalPurchases}
                <span className="text-sm ml-2 text-gray-400">transactions</span>
              </p>
              <div className="mt-4 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (dashboardData.stats.totalPurchases / 30) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Blood Group Distribution */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">
                Blood Group Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.bloodInventory}
                    dataKey="quantity"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) =>
                      `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                  >
                    {dashboardData.bloodInventory.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.8)",
                      borderColor: "rgba(109, 40, 217, 0.5)",
                      borderRadius: "0.5rem",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Donations */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Donations (7 days)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentDonationsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255, 255, 255, 0.5)"
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <YAxis
                    stroke="rgba(255, 255, 255, 0.5)"
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.8)",
                      borderColor: "rgba(109, 40, 217, 0.5)",
                      borderRadius: "0.5rem",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Bar
                    dataKey="donations"
                    name="Donations"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {dashboardData.recentTransactions.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === "donation" ? (
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                        ❤️
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        💰
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">
                        {activity.type === "donation"
                          ? `Donation from ${
                              activity.donor?.full_name || activity.person_name
                            } (${activity.blood_type})`
                          : `Purchase by ${activity.person_name} (${activity.blood_type})`}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {new Date(activity.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {activity.quantity} units{" "}
                      {activity.type === "donation" ? "donated" : "purchased"}
                      {activity.phone && ` | Phone: ${activity.phone}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
