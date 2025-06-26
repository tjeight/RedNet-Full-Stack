"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddBillingPage = () => {
  const router = useRouter();

  const [buyerName, setBuyerName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/billing/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyerName, phone, bloodType, quantity, price }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/blood-bank-admins/dashboard/billing");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Add New Billing</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Buyer Name"
          className="w-full border px-4 py-2 rounded"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full border px-4 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="w-full border px-4 py-2 rounded"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          required
        >
          <option value="">Select Blood Type</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border px-4 py-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border px-4 py-2 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBillingPage;
