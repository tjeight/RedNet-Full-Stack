"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/admin-logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/blood-bank-admins/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-red-600">
                Blood Bank Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Dashboard Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Blood Units
                </h3>
                <p className="text-3xl font-bold text-red-600 mt-2">1,245</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-gray-500 text-sm font-medium">
                  Pending Requests
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-gray-500 text-sm font-medium">
                  Donations Today
                </h3>
                <p className="text-3xl font-bold text-green-600 mt-2">18</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600">D</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Donation #{item} completed
                        </p>
                        <p className="text-sm text-gray-500">
                          {item} hour{item !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
