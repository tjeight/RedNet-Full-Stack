// app/blood-bank-admins/dashboard/donors/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddDonorPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    blood_type: "",
    phone: "",
    quantity: 1,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return setError(data.error || "Something went wrong");

    router.push("/blood-bank-admins/dashboard/donors");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Donor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="full_name"
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="blood_type"
          value={form.blood_type}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blood Type</option>
          <option>O+</option>
          <option>O-</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Units (1-10)"
          min="1"
          max="10"
          value={form.quantity}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Adding..." : "Add Donor"}
        </button>
      </form>
    </div>
  );
};

export default AddDonorPage;
