"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    router.push("/blood-bank-admins/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link
            href="/blood-bank-admins/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700/30 p-6">
          <div className="border-b border-gray-700/50 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Add New Donor
            </h1>
            <p className="text-gray-400 mt-1">
              Register a new blood donor to the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                name="full_name"
                type="text"
                placeholder="John Doe"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone (optional)
              </label>
              <input
                name="phone"
                type="text"
                placeholder="+1 (123) 456-7890"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Blood Type
              </label>
              <select
                name="blood_type"
                value={form.blood_type}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="" disabled className="text-gray-500">
                  Select Blood Type
                </option>
                <option className="bg-gray-800">O+</option>
                <option className="bg-gray-800">O-</option>
                <option className="bg-gray-800">A+</option>
                <option className="bg-gray-800">A-</option>
                <option className="bg-gray-800">B+</option>
                <option className="bg-gray-800">B-</option>
                <option className="bg-gray-800">AB+</option>
                <option className="bg-gray-800">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Units (1-10)
              </label>
              <input
                name="quantity"
                type="number"
                placeholder="1"
                min="1"
                max="10"
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Donor...
                </span>
              ) : (
                "Add Donor"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDonorPage;
