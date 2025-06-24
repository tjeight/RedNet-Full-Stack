"use client";

import { useEffect, useState } from "react";

type Request = {
  id: number;
  full_name: string;
  email: string;
  blood_bank_name: string;
  address: string;
  phone: string;
  status: string;
};

const SuperDashBoard = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/get-requests");
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRequests();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/signout", {
      method: "POST",
    });
    window.location.href = "/super-admin/login"; // Redirect after logout
  };

  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/handle-request", {
        method: "POST",
        body: JSON.stringify({ id, action }),
      });

      const result = await res.json();
      if (result.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">
            Super Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* ✅ Requests Section */}
        <div className="bg-white border rounded p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
          {requests.length === 0 ? (
            <p className="text-gray-500">No requests found.</p>
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className="p-4 border rounded shadow-sm text-left bg-red-50"
                >
                  <p>
                    <strong>Name:</strong> {req.full_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {req.email}
                  </p>
                  <p>
                    <strong>Blood Bank:</strong> {req.blood_bank_name}
                  </p>
                  <p>
                    <strong>Address:</strong> {req.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {req.phone}
                  </p>
                  <p>
                    <strong>Status:</strong> {req.status}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleAction(req.id, "approve")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "reject")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperDashBoard;
