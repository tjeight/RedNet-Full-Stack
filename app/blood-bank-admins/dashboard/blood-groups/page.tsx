// // "use client";
// // import { useEffect, useState } from "react";
// // import { toast } from "react-hot-toast";
// // import { useRouter } from "next/navigation"; // Added import

// // type BloodGroup = {
// //   id: string;
// //   blood_bank_id: string;
// //   type: string;
// //   quantity: number;
// // };

// // export default function BloodGroupsPage() {
// //   const router = useRouter(); // Added router
// //   const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
// //   const [error, setError] = useState("");
// //   const [editingGroup, setEditingGroup] = useState<{
// //     type: string;
// //     quantity: number;
// //   } | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isUpdating, setIsUpdating] = useState(false);

// //   useEffect(() => {
// //     fetchBloodGroups();
// //   }, []);

// //   const fetchBloodGroups = async () => {
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch("/api/blood-groups");
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Failed to fetch");
// //       setBloodGroups(data.bloodGroups);
// //       setError("");
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred";
// //       setError(errorMessage);
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUpdate = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!editingGroup) return;

// //     setIsUpdating(true);
// //     try {
// //       const res = await fetch("/api/blood-groups", {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           bloodType: editingGroup.type,
// //           quantity: editingGroup.quantity,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Update failed");

// //       toast.success("Blood stock updated successfully");
// //       setEditingGroup(null);
// //       fetchBloodGroups();
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred";
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Added Back Button */}
// //         <button
// //           onClick={() => router.push("/blood-bank-admins/dashboard")}
// //           className="mb-4 flex items-center text-gray-400 hover:text-white transition-colors"
// //         >
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-5 w-5 mr-2"
// //             viewBox="0 0 20 20"
// //             fill="currentColor"
// //           >
// //             <path
// //               fillRule="evenodd"
// //               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
// //               clipRule="evenodd"
// //             />
// //           </svg>
// //           Back to Dashboard
// //         </button>

// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
// //               Blood Inventory
// //             </h1>
// //             <p className="text-gray-400 mt-2">
// //               Manage your blood bank&apos;s current stock levels
// //             </p>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
// //             {error}
// //           </div>
// //         )}

// //         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-700/50">
// //               <thead className="bg-gray-700/50">
// //                 <tr>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Blood Type
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Current Stock
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
// //                 {isLoading ? (
// //                   <tr>
// //                     <td colSpan={3} className="px-6 py-8 text-center">
// //                       <div className="flex justify-center">
// //                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   bloodGroups.map((group) => (
// //                     <tr key={group.id} className="hover:bg-gray-700/20">
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center">
// //                           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold">
// //                             {group.type}
// //                           </div>
// //                           <div className="ml-4">
// //                             <div className="text-sm font-medium text-white">
// //                               {group.type}
// //                             </div>
// //                             <div className="text-sm text-gray-400">
// //                               Blood Group
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div
// //                           className={`text-lg font-semibold ${
// //                             group.quantity < 5
// //                               ? "text-red-400"
// //                               : group.quantity < 10
// //                               ? "text-yellow-400"
// //                               : "text-green-400"
// //                           }`}
// //                         >
// //                           {group.quantity} units
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {group.quantity < 5
// //                             ? "Critical Level"
// //                             : group.quantity < 10
// //                             ? "Low Stock"
// //                             : "In Stock"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                         <button
// //                           onClick={() =>
// //                             setEditingGroup({
// //                               type: group.type,
// //                               quantity: group.quantity,
// //                             })
// //                           }
// //                           className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
// //                         >
// //                           Update Stock
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Edit Modal */}
// //         {editingGroup && (
// //           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
// //             <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
// //               <div className="p-6">
// //                 <h2 className="text-xl font-bold text-white mb-2">
// //                   Update Blood Stock
// //                 </h2>
// //                 <p className="text-gray-400 mb-6">
// //                   Adjust the quantity for {editingGroup.type}
// //                 </p>

// //                 <form onSubmit={handleUpdate}>
// //                   <div className="mb-6">
// //                     <label className="block text-sm font-medium text-gray-300 mb-2">
// //                       New Quantity
// //                     </label>
// //                     <input
// //                       type="number"
// //                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //                       value={editingGroup.quantity}
// //                       onChange={(e) =>
// //                         setEditingGroup({
// //                           ...editingGroup,
// //                           quantity: parseInt(e.target.value) || 0,
// //                         })
// //                       }
// //                       min={0}
// //                       required
// //                     />
// //                   </div>

// //                   <div className="flex justify-end space-x-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => setEditingGroup(null)}
// //                       className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={isUpdating}
// //                       className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
// //                     >
// //                       {isUpdating ? (
// //                         <>
// //                           <svg
// //                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                           >
// //                             <circle
// //                               className="opacity-25"
// //                               cx="12"
// //                               cy="12"
// //                               r="10"
// //                               stroke="currentColor"
// //                               strokeWidth="4"
// //                             ></circle>
// //                             <path
// //                               className="opacity-75"
// //                               fill="currentColor"
// //                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                             ></path>
// //                           </svg>
// //                           Updating...
// //                         </>
// //                       ) : (
// //                         "Save Changes"
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import type React from "react";
// // import { useEffect, useState, useMemo } from "react";
// // import { toast } from "react-hot-toast";
// // // Removed import { useRouter } from "next/navigation"; to fix compilation error

// // // --- Type Definitions ---
// // type BloodGroup = {
// //   id: string;
// //   blood_bank_id: string;
// //   type: string;
// //   quantity: number;
// //   added_at: string; // ISO string (e.g., 2025-10-02T00:00:00.000Z)
// //   expire_time: string; // ISO string
// // };

// // type EditingGroup = {
// //   type: string;
// //   quantity: number;
// //   expire_time: string; // ISO string
// // };

// // // --- Date Utility Functions ---

// // // Converts an ISO 8601 string (e.g., 2025-10-02T...) to YYYY-MM-DD format for HTML input[type=date]
// // const toInputDate = (isoString: string | null | undefined): string => {
// //   if (!isoString) return '';
// //   // Safely converts to a local date string based on the date part only
// //   return new Date(isoString).toISOString().split('T')[0];
// // };

// // // Converts an ISO 8601 string to a user-friendly format
// // const toDisplayDate = (isoString: string | null | undefined): string => {
// //   if (!isoString) return 'N/A';
// //   return new Date(isoString).toLocaleDateString('en-US', {
// //     year: 'numeric',
// //     month: 'short',
// //     day: 'numeric',
// //   });
// // };

// // // --- Main Component ---

// // export default function BloodGroupsPage(): React.JSX.Element {
// //   // const router = useRouter(); // Removed
// //   const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
// //   const [error, setError] = useState<string>("");
// //   const [editingGroup, setEditingGroup] = useState<EditingGroup | null>(null);
// //   const [isLoading, setIsLoading] = useState<boolean>(true);
// //   const [isUpdating, setIsUpdating] = useState<boolean>(false);

// //   // Memoized for efficiency and to stabilize table display logic
// //   const isCritical = useMemo(() => bloodGroups.some(g => g.quantity < 5), [bloodGroups]);

// //   useEffect(() => {
// //     fetchBloodGroups();
// //   }, []);

// //   const fetchBloodGroups = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Use the administrative inventory route
// //       const res = await fetch("/api/blood-groups");
// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data.error || "Failed to fetch inventory");

// //       // Assuming the response structure is { bloodGroups: BloodGroup[] }
// //       setBloodGroups(data.bloodGroups);
// //       setError("");
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred while fetching data";
// //       setError(errorMessage);
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (!editingGroup) return;

// //     // Check if a valid expiration time is selected
// //     if (!editingGroup.expire_time) {
// //       toast.error("Please select an expiration date.");
// //       return;
// //     }

// //     setIsUpdating(true);
// //     try {
// //       const res = await fetch("/api/blood-groups", {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           bloodType: editingGroup.type,
// //           quantity: editingGroup.quantity,
// //           // Send the ISO string date derived from the date input
// //           expire_time: editingGroup.expire_time,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Stock update failed");

// //       toast.success("Blood stock and expiry date updated successfully");
// //       setEditingGroup(null);
// //       fetchBloodGroups(); // Refresh data
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred during update";
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   const handleEditClick = (group: BloodGroup) => {
// //     setEditingGroup({
// //       type: group.type,
// //       quantity: group.quantity,
// //       // Initialize the modal state with the existing expire_time
// //       expire_time: group.expire_time,
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Back Button - Changed from button+router.push to <a> tag */}
// //         <a
// //           href="/blood-bank-admins/dashboard"
// //           className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
// //         >
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-5 w-5 mr-2"
// //             viewBox="0 0 20 20"
// //             fill="currentColor"
// //           >
// //             <path
// //               fillRule="evenodd"
// //               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
// //               clipRule="evenodd"
// //             />
// //           </svg>
// //           Back to Dashboard
// //         </a>

// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
// //               Blood Inventory
// //             </h1>
// //             <p className="text-gray-400 mt-2 text-lg">
// //               Manage your blood bank&apos;s current stock levels and expiration dates.
// //             </p>
// //           </div>
// //         </div>

// //         {isCritical && (
// //           <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 font-semibold flex items-center">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M8.257 3.344a1.875 1.875 0 013.486 0l1.723 3.447a1.875 1.875 0 001.385.955l3.804.553a1.875 1.875 0 011.037 3.193l-2.753 2.684a1.875 1.875 0 00-.54 1.65l.649 3.784a1.875 1.875 0 01-2.723 1.962L10 16.71l-3.398 1.78a1.875 1.875 0 01-2.723-1.962l.649-3.784a1.875 1.875 0 00-.54-1.65L.892 11.532a1.875 1.875 0 011.037-3.193l3.804-.553a1.875 1.875 0 001.385-.955l1.723-3.447z" clipRule="evenodd" />
// //             </svg>
// //             Warning: Some blood groups are at **Critical** level (less than 5 units).
// //           </div>
// //         )}

// //         {error && (
// //           <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
// //             {error}
// //           </div>
// //         )}

// //         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-700/50">
// //               <thead className="bg-gray-700/50">
// //                 <tr>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Blood Type
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Current Stock
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Added On
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Expiration Date
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
// //                 {isLoading ? (
// //                   <tr>
// //                     <td colSpan={5} className="px-6 py-8 text-center">
// //                       <div className="flex justify-center">
// //                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   bloodGroups.map((group) => {
// //                     const expiryDate = new Date(group.expire_time);
// //                     const isExpired = expiryDate.getTime() < Date.now();
// //                     const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

// //                     return (
// //                       <tr key={group.id} className="hover:bg-gray-700/20">
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="flex items-center">
// //                             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold text-lg">
// //                               {group.type}
// //                             </div>
// //                             <div className="ml-4">
// //                               <div className="text-sm font-medium text-white">
// //                                 {group.type}
// //                               </div>
// //                               <div className="text-sm text-gray-400">
// //                                 Blood Group
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div
// //                             className={`text-lg font-semibold ${group.quantity < 5
// //                               ? "text-red-400"
// //                               : group.quantity < 10
// //                                 ? "text-yellow-400"
// //                                 : "text-green-400"
// //                               }`}
// //                           >
// //                             {group.quantity} units
// //                           </div>
// //                           <div className="text-xs text-gray-400">
// //                             {group.quantity < 5
// //                               ? "Critical Level"
// //                               : group.quantity < 10
// //                                 ? "Low Stock"
// //                                 : "In Stock"}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
// //                           {toDisplayDate(group.added_at)}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className={`text-sm font-medium ${isExpired ? 'text-red-500' : daysUntilExpiry <= 7 ? 'text-yellow-500' : 'text-gray-300'}`}>
// //                             {toDisplayDate(group.expire_time)}
// //                           </div>
// //                           <div className="text-xs text-gray-500">
// //                             {isExpired
// //                               ? "EXPIRED"
// //                               : daysUntilExpiry <= 7
// //                                 ? `Expires in ${daysUntilExpiry} days`
// //                                 : `Valid for ${daysUntilExpiry} days`}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                           <button
// //                             onClick={() => handleEditClick(group)}
// //                             className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
// //                           >
// //                             Update Inventory
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Edit Modal */}
// //         {editingGroup && (
// //           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
// //             <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
// //               <div className="p-6">
// //                 <h2 className="text-xl font-bold text-white mb-2">
// //                   Update Blood Stock: {editingGroup.type}
// //                 </h2>
// //                 <p className="text-gray-400 mb-6">
// //                   Adjust the quantity and set the new expiration date for this batch.
// //                 </p>

// //                 <form onSubmit={handleUpdate}>
// //                   <div className="mb-4">
// //                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
// //                       New Quantity
// //                     </label>
// //                     <input
// //                       id="quantity"
// //                       type="number"
// //                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //                       value={editingGroup.quantity}
// //                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setEditingGroup({
// //                           ...editingGroup,
// //                           quantity: parseInt(e.target.value) || 0,
// //                         })
// //                       }
// //                       min={0}
// //                       required
// //                     />
// //                   </div>

// //                   <div className="mb-6">
// //                     <label htmlFor="expire_time" className="block text-sm font-medium text-gray-300 mb-2">
// //                       Expiration Date
// //                     </label>
// //                     <input
// //                       id="expire_time"
// //                       type="date"
// //                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all date-input"
// //                       // Convert ISO string from state to YYYY-MM-DD for the date input field
// //                       value={toInputDate(editingGroup.expire_time)}
// //                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setEditingGroup({
// //                           ...editingGroup,
// //                           // Convert the YYYY-MM-DD input back to an ISO string (start of day) for the state
// //                           expire_time: new Date(e.target.value).toISOString(),
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>

// //                   <div className="flex justify-end space-x-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => setEditingGroup(null)}
// //                       className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={isUpdating}
// //                       className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
// //                     >
// //                       {isUpdating ? (
// //                         <>
// //                           <svg
// //                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                           >
// //                             <circle
// //                               className="opacity-25"
// //                               cx="12"
// //                               cy="12"
// //                               r="10"
// //                               stroke="currentColor"
// //                               strokeWidth="4"
// //                             ></circle>
// //                             <path
// //                               className="opacity-75"
// //                               fill="currentColor"
// //                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                             ></path>
// //                           </svg>
// //                           Updating...
// //                         </>
// //                       ) : (
// //                         "Save Changes"
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import type React from "react";
// // import { useEffect, useState, useMemo } from "react";
// // import { toast } from "react-hot-toast";
// // import Link from "next/link";

// // // --- Type Definitions ---
// // type BloodGroup = {
// //   id: string;
// //   blood_bank_id: string;
// //   type: string;
// //   quantity: number;
// //   added_at: string; // ISO string (e.g., 2025-10-02T00:00:00.000Z)
// //   expire_time: string; // ISO string
// // };

// // type EditingGroup = {
// //   type: string;
// //   quantity: number;
// //   expire_time: string; // ISO string
// // };

// // // --- Date Utility Functions ---

// // // Converts an ISO 8601 string (e.g., 2025-10-02T...) to YYYY-MM-DD format for HTML input[type=date]
// // const toInputDate = (isoString: string | null | undefined): string => {
// //   if (!isoString) return '';
// //   // Safely converts to a local date string based on the date part only
// //   return new Date(isoString).toISOString().split('T')[0];
// // };

// // // Converts an ISO 8601 string to a user-friendly format
// // const toDisplayDate = (isoString: string | null | undefined): string => {
// //   if (!isoString) return 'N/A';
// //   return new Date(isoString).toLocaleDateString('en-US', {
// //     year: 'numeric',
// //     month: 'short',
// //     day: 'numeric',
// //   });
// // };

// // // --- Main Component ---

// // export default function BloodGroupsPage(): React.JSX.Element {
// //   const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
// //   const [error, setError] = useState<string>("");
// //   const [editingGroup, setEditingGroup] = useState<EditingGroup | null>(null);
// //   const [isLoading, setIsLoading] = useState<boolean>(true);
// //   const [isUpdating, setIsUpdating] = useState<boolean>(false);

// //   // Memoized for efficiency and to stabilize table display logic
// //   const isCritical = useMemo(() => bloodGroups.some(g => g.quantity < 5), [bloodGroups]);

// //   useEffect(() => {
// //     fetchBloodGroups();
// //   }, []);

// //   const fetchBloodGroups = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Use the administrative inventory route
// //       const res = await fetch("/api/blood-groups");
// //       const data = await res.json();

// //       if (!res.ok) throw new Error(data.error || "Failed to fetch inventory");

// //       // Assuming the response structure is { bloodGroups: BloodGroup[] }
// //       setBloodGroups(data.bloodGroups);
// //       setError("");
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred while fetching data";
// //       setError(errorMessage);
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (!editingGroup) return;

// //     // Check if a valid expiration time is selected
// //     if (!editingGroup.expire_time) {
// //       toast.error("Please select an expiration date.");
// //       return;
// //     }

// //     setIsUpdating(true);
// //     try {
// //       const res = await fetch("/api/blood-groups", {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           bloodType: editingGroup.type,
// //           quantity: editingGroup.quantity,
// //           // Send the ISO string date derived from the date input
// //           expire_time: editingGroup.expire_time,
// //         }),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Stock update failed");

// //       toast.success("Blood stock and expiry date updated successfully");
// //       setEditingGroup(null);
// //       fetchBloodGroups(); // Refresh data
// //     } catch (err: unknown) {
// //       const errorMessage =
// //         err instanceof Error ? err.message : "An unknown error occurred during update";
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   const handleEditClick = (group: BloodGroup) => {
// //     setEditingGroup({
// //       type: group.type,
// //       quantity: group.quantity,
// //       // Initialize the modal state with the existing expire_time
// //       expire_time: group.expire_time,
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Back Button - Changed to Link component */}
// //         <Link
// //           href="/blood-bank-admins/dashboard"
// //           className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
// //         >
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-5 w-5 mr-2"
// //             viewBox="0 0 20 20"
// //             fill="currentColor"
// //           >
// //             <path
// //               fillRule="evenodd"
// //               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
// //               clipRule="evenodd"
// //             />
// //           </svg>
// //           Back to Dashboard
// //         </Link>

// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
// //               Blood Inventory
// //             </h1>
// //             <p className="text-gray-400 mt-2 text-lg">
// //               Manage your blood bank&apos;s current stock levels and expiration dates.
// //             </p>
// //           </div>
// //         </div>

// //         {isCritical && (
// //           <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 font-semibold flex items-center">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M8.257 3.344a1.875 1.875 0 013.486 0l1.723 3.447a1.875 1.875 0 001.385.955l3.804.553a1.875 1.875 0 011.037 3.193l-2.753 2.684a1.875 1.875 0 00-.54 1.65l.649 3.784a1.875 1.875 0 01-2.723 1.962L10 16.71l-3.398 1.78a1.875 1.875 0 01-2.723-1.962l.649-3.784a1.875 1.875 0 00-.54-1.65L.892 11.532a1.875 1.875 0 011.037-3.193l3.804-.553a1.875 1.875 0 001.385-.955l1.723-3.447z" clipRule="evenodd" />
// //             </svg>
// //             Warning: Some blood groups are at **Critical** level (less than 5 units).
// //           </div>
// //         )}

// //         {error && (
// //           <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
// //             {error}
// //           </div>
// //         )}

// //         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-700/50">
// //               <thead className="bg-gray-700/50">
// //                 <tr>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Blood Type
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Current Stock
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Added On
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Expiration Date
// //                   </th>
// //                   <th
// //                     scope="col"
// //                     className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
// //                   >
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
// //                 {isLoading ? (
// //                   <tr>
// //                     <td colSpan={5} className="px-6 py-8 text-center">
// //                       <div className="flex justify-center">
// //                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   bloodGroups.map((group) => {
// //                     const expiryDate = new Date(group.expire_time);
// //                     const isExpired = expiryDate.getTime() < Date.now();
// //                     const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

// //                     return (
// //                       <tr key={group.id} className="hover:bg-gray-700/20">
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="flex items-center">
// //                             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold text-lg">
// //                               {group.type}
// //                             </div>
// //                             <div className="ml-4">
// //                               <div className="text-sm font-medium text-white">
// //                                 {group.type}
// //                               </div>
// //                               <div className="text-sm text-gray-400">
// //                                 Blood Group
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div
// //                             className={`text-lg font-semibold ${group.quantity < 5
// //                               ? "text-red-400"
// //                               : group.quantity < 10
// //                                 ? "text-yellow-400"
// //                                 : "text-green-400"
// //                               }`}
// //                           >
// //                             {group.quantity} units
// //                           </div>
// //                           <div className="text-xs text-gray-400">
// //                             {group.quantity < 5
// //                               ? "Critical Level"
// //                               : group.quantity < 10
// //                                 ? "Low Stock"
// //                                 : "In Stock"}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
// //                           {toDisplayDate(group.added_at)}
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className={`text-sm font-medium ${isExpired ? 'text-red-500' : daysUntilExpiry <= 7 ? 'text-yellow-500' : 'text-gray-300'}`}>
// //                             {toDisplayDate(group.expire_time)}
// //                           </div>
// //                           <div className="text-xs text-gray-500">
// //                             {isExpired
// //                               ? "EXPIRED"
// //                               : daysUntilExpiry <= 7
// //                                 ? `Expires in ${daysUntilExpiry} days`
// //                                 : `Valid for ${daysUntilExpiry} days`}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                           <button
// //                             onClick={() => handleEditClick(group)}
// //                             className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
// //                           >
// //                             Update Inventory
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Edit Modal */}
// //         {editingGroup && (
// //           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
// //             <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
// //               <div className="p-6">
// //                 <h2 className="text-xl font-bold text-white mb-2">
// //                   Update Blood Stock: {editingGroup.type}
// //                 </h2>
// //                 <p className="text-gray-400 mb-6">
// //                   Adjust the quantity and set the new expiration date for this batch.
// //                 </p>

// //                 <form onSubmit={handleUpdate}>
// //                   <div className="mb-4">
// //                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
// //                       New Quantity
// //                     </label>
// //                     <input
// //                       id="quantity"
// //                       type="number"
// //                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //                       value={editingGroup.quantity}
// //                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setEditingGroup({
// //                           ...editingGroup,
// //                           quantity: parseInt(e.target.value) || 0,
// //                         })
// //                       }
// //                       min={0}
// //                       required
// //                     />
// //                   </div>

// //                   <div className="mb-6">
// //                     <label htmlFor="expire_time" className="block text-sm font-medium text-gray-300 mb-2">
// //                       Expiration Date
// //                     </label>
// //                     <input
// //                       id="expire_time"
// //                       type="date"
// //                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all date-input"
// //                       // Convert ISO string from state to YYYY-MM-DD for the date input field
// //                       value={toInputDate(editingGroup.expire_time)}
// //                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setEditingGroup({
// //                           ...editingGroup,
// //                           // Convert the YYYY-MM-DD input back to an ISO string (start of day) for the state
// //                           expire_time: new Date(e.target.value).toISOString(),
// //                         })
// //                       }
// //                       required
// //                     />
// //                   </div>

// //                   <div className="flex justify-end space-x-3">
// //                     <button
// //                       type="button"
// //                       onClick={() => setEditingGroup(null)}
// //                       className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={isUpdating}
// //                       className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
// //                     >
// //                       {isUpdating ? (
// //                         <>
// //                           <svg
// //                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                           >
// //                             <circle
// //                               className="opacity-25"
// //                               cx="12"
// //                               cy="12"
// //                               r="10"
// //                               stroke="currentColor"
// //                               strokeWidth="4"
// //                             ></circle>
// //                             <path
// //                               className="opacity-75"
// //                               fill="currentColor"
// //                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                             ></path>
// //                           </svg>
// //                           Updating...
// //                         </>
// //                       ) : (
// //                         "Save Changes"
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Link from "next/link";

// type BloodUnit = {
//   id: string;
//   type: string;
//   added_at: string;
//   expire_at: string;
//   status: string;
// };

// export default function BloodUnitsPage() {
//   const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const fetchUnits = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/blood-groups");
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to load units");

//       setBloodUnits(data.bloodUnits);
//     } catch (err: any) {
//       toast.error(err.message || "Error loading units");
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toDisplayDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const daysLeft = (expire: string) =>
//     Math.ceil((new Date(expire).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto">
//         <Link
//           href="/blood-bank-admins/dashboard"
//           className="text-gray-400 hover:text-white mb-6 flex items-center"
//         >
//           ← Back to Dashboard
//         </Link>

//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-8">
//           Blood Inventory (Individual Units)
//         </h1>

//         {error && (
//           <div className="p-4 bg-red-900/30 border border-red-700 text-red-300 mb-4 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="bg-gray-800/50 rounded-xl shadow-xl border border-gray-700/30 overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-700/50">
//             <thead className="bg-gray-700/50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
//                   Added On
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
//                   Expiry
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-700/30">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan={4} className="text-center py-10 text-gray-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : (
//                 bloodUnits.map((unit) => {
//                   const remaining = daysLeft(unit.expire_at);
//                   const expired = remaining <= 0;
//                   return (
//                     <tr key={unit.id} className="hover:bg-gray-700/20">
//                       <td className="px-6 py-4 font-semibold text-red-400">{unit.type}</td>
//                       <td className="px-6 py-4 text-gray-300">{toDisplayDate(unit.added_at)}</td>
//                       <td
//                         className={`px-6 py-4 font-medium ${expired
//                           ? "text-red-500"
//                           : remaining <= 7
//                             ? "text-yellow-400"
//                             : "text-green-400"
//                           }`}
//                       >
//                         {toDisplayDate(unit.expire_at)}{" "}
//                         <span className="text-xs text-gray-500">
//                           ({expired ? "Expired" : `${remaining} days left`})
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-300 capitalize">
//                         {unit.status}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";

// --- Type Definitions ---
type BloodUnit = {
  id: string;
  blood_bank_id: string;
  type: string;
  added_at: string;
  expire_time: string;
};

type BloodGroupSummary = {
  type: string;
  count: number;
};

type EditingUnit = {
  id: string;
  type: string;
  expire_time: string;
};

// --- Date Utility Functions ---
const toInputDate = (isoString: string | null | undefined): string => {
  if (!isoString) return '';
  return new Date(isoString).toISOString().split('T')[0];
};

const toDisplayDate = (isoString: string | null | undefined): string => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// --- Toast Notification Component ---
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg border ${type === 'success'
      ? 'bg-white border-gray-800 text-gray-900'
      : 'bg-gray-900 border-gray-300 text-white'
      }`}>
      {message}
    </div>
  );
};

// --- Main Component ---
export default function BloodGroupsPage() {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>([]);
  const [error, setError] = useState<string>("");
  const [editingUnit, setEditingUnit] = useState<EditingUnit | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const itemsPerPage = 10;

  // Calculate blood group summaries
  const bloodGroupSummary: BloodGroupSummary[] = useMemo(() => {
    const summary = bloodUnits.reduce((acc, unit) => {
      acc[unit.type] = (acc[unit.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return bloodTypes.map(type => ({
      type,
      count: summary[type] || 0
    }));
  }, [bloodUnits]);

  // Filter units based on selected blood type
  const filteredUnits = useMemo(() => {
    if (filterType === "ALL") return bloodUnits;
    return bloodUnits.filter(unit => unit.type === filterType);
  }, [bloodUnits, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const paginatedUnits = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUnits.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUnits, currentPage]);

  useEffect(() => {
    fetchBloodUnits();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filterType]);

  const fetchBloodUnits = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blood-groups");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch inventory");

      setBloodUnits(data.bloodGroups || []);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred while fetching data";
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUnit) return;

    if (!editingUnit.expire_time) {
      setToast({ message: "Please select an expiration date.", type: 'error' });
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch("/api/blood-groups", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingUnit.id,
          expire_time: editingUnit.expire_time,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setToast({ message: "Blood unit updated successfully", type: 'success' });
      setEditingUnit(null);
      fetchBloodUnits();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred during update";
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blood unit?")) return;

    try {
      const res = await fetch("/api/blood-groups", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setToast({ message: "Blood unit deleted successfully", type: 'success' });
      fetchBloodUnits();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred during deletion";
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blood-bank-admins/dashboard"
          className="mb-6 inline-flex items-center text-gray-600 hover:text-black transition-colors text-sm font-medium"
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
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Blood Inventory Management
          </h1>
          <p className="text-gray-600 text-lg">
            Track and manage individual blood units with expiration dates
          </p>
        </div>

        {/* Blood Group Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {bloodGroupSummary.map((group) => (
            <button
              key={group.type}
              onClick={() => setFilterType(filterType === group.type ? "ALL" : group.type)}
              className={`p-4 border-2 rounded-lg transition-all ${filterType === group.type
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-black hover:border-black'
                }`}
            >
              <div className="text-2xl font-bold mb-1">{group.type}</div>
              <div className="text-sm opacity-80">{group.count} units</div>
            </button>
          ))}
        </div>

        {/* Filter Info */}
        {filterType !== "ALL" && (
          <div className="mb-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-700">
              Showing {filteredUnits.length} units of type <strong>{filterType}</strong>
            </span>
            <button
              onClick={() => setFilterType("ALL")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Clear Filter
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-gray-100 border-2 border-gray-800 rounded-lg text-gray-900">
            {error}
          </div>
        )}

        {/* Blood Units Table */}
        <div className="bg-white border-2 border-gray-900 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-900">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Unit ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Added Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Expiration Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
                      </div>
                    </td>
                  </tr>
                ) : paginatedUnits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No blood units found
                    </td>
                  </tr>
                ) : (
                  paginatedUnits.map((unit) => {
                    const expiryDate = new Date(unit.expire_time);
                    const isExpired = expiryDate.getTime() < Date.now();
                    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                    return (
                      <tr key={unit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-gray-900">
                            {unit.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full border-2 border-gray-900 flex items-center justify-center bg-white">
                              <span className="text-sm font-bold text-gray-900">{unit.type}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {toDisplayDate(unit.added_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {toDisplayDate(unit.expire_time)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border-2 ${isExpired
                            ? 'bg-gray-900 text-white border-gray-900'
                            : daysUntilExpiry <= 7
                              ? 'bg-white text-gray-900 border-gray-900'
                              : 'bg-white text-gray-600 border-gray-300'
                            }`}>
                            {isExpired
                              ? "EXPIRED"
                              : daysUntilExpiry <= 7
                                ? `${daysUntilExpiry}d left`
                                : `${daysUntilExpiry}d left`}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => setEditingUnit({
                              id: unit.id,
                              type: unit.type,
                              expire_time: unit.expire_time,
                            })}
                            className="inline-flex items-center px-3 py-1 border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded transition-all text-xs font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(unit.id)}
                            className="inline-flex items-center px-3 py-1 border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded transition-all text-xs font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-900 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUnits.length)} of {filteredUnits.length} units
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-semibold"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border-2 rounded text-sm font-semibold transition-all ${currentPage === page
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingUnit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-4 border-gray-900 rounded-lg shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Update Blood Unit
                </h2>
                <p className="text-gray-600 mb-6">
                  Update expiration date for {editingUnit.type} unit
                </p>

                <div>
                  <div className="mb-6">
                    <label htmlFor="expire_time" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      New Expiration Date
                    </label>
                    <input
                      id="expire_time"
                      type="date"
                      className="w-full border-2 border-gray-900 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
                      value={toInputDate(editingUnit.expire_time)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingUnit({
                          ...editingUnit,
                          expire_time: new Date(e.target.value).toISOString(),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingUnit(null)}
                      className="px-6 py-2 border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-all font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        const fakeEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
                        handleUpdate(fakeEvent);
                      }}
                      disabled={isUpdating}
                      className="px-6 py-2 bg-gray-900 text-white border-2 border-gray-900 rounded-lg hover:bg-black transition-all flex items-center disabled:opacity-50 font-semibold"
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}