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

  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/handle-request", {
        method: "POST",
        body: JSON.stringify({ id, action }),
      });

      const result = await res.json();
      if (result.success) {
        // Refresh requests
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  return (
    <div className="flex justify-center text-center items-center min-h-screen bg-white">
      <div className="border rounded max-w-3xl p-6 shadow-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
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
                <button
                  className="bg-green-500 text-white p-2 rounded m-2"
                  onClick={() => handleAction(req.id, "approve")}
                >
                  {" "}
                  Accept{" "}
                </button>
                <button
                  className="bg-red-600 text-white p-2 rounded"
                  onClick={() => handleAction(req.id, "reject")}
                >
                  {" "}
                  Reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SuperDashBoard;
