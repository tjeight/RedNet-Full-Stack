"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Added import

type BloodGroup = {
  id: string;
  blood_bank_id: string;
  type: string;
  quantity: number;
};

export default function BloodGroupsPage() {
  const router = useRouter(); // Added router
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [error, setError] = useState("");
  const [editingGroup, setEditingGroup] = useState<{
    type: string;
    quantity: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchBloodGroups();
  }, []);

  const fetchBloodGroups = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blood-groups");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setBloodGroups(data.bloodGroups);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup) return;

    setIsUpdating(true);
    try {
      const res = await fetch("/api/blood-groups", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodType: editingGroup.type,
          quantity: editingGroup.quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      toast.success("Blood stock updated successfully");
      setEditingGroup(null);
      fetchBloodGroups();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Added Back Button */}
        <button
          onClick={() => router.push("/blood-bank-admins/dashboard")}
          className="mb-4 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Blood Inventory
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your blood bank&apos;s current stock levels
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="bg-gray-700/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Blood Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Current Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bloodGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-700/20">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold">
                            {group.type}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {group.type}
                            </div>
                            <div className="text-sm text-gray-400">
                              Blood Group
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-lg font-semibold ${
                            group.quantity < 5
                              ? "text-red-400"
                              : group.quantity < 10
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {group.quantity} units
                        </div>
                        <div className="text-xs text-gray-400">
                          {group.quantity < 5
                            ? "Critical Level"
                            : group.quantity < 10
                            ? "Low Stock"
                            : "In Stock"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            setEditingGroup({
                              type: group.type,
                              quantity: group.quantity,
                            })
                          }
                          className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
                        >
                          Update Stock
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Update Blood Stock
                </h2>
                <p className="text-gray-400 mb-6">
                  Adjust the quantity for {editingGroup.type}
                </p>

                <form onSubmit={handleUpdate}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      value={editingGroup.quantity}
                      onChange={(e) =>
                        setEditingGroup({
                          ...editingGroup,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      min={0}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingGroup(null)}
                      className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
                    >
                      {isUpdating ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Updating...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
