// "use client";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation"; // Added import

// type BloodGroup = {
//   id: string;
//   blood_bank_id: string;
//   type: string;
//   quantity: number;
// };

// export default function BloodGroupsPage() {
//   const router = useRouter(); // Added router
//   const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
//   const [error, setError] = useState("");
//   const [editingGroup, setEditingGroup] = useState<{
//     type: string;
//     quantity: number;
//   } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     fetchBloodGroups();
//   }, []);

//   const fetchBloodGroups = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/blood-groups");
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch");
//       setBloodGroups(data.bloodGroups);
//       setError("");
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingGroup) return;

//     setIsUpdating(true);
//     try {
//       const res = await fetch("/api/blood-groups", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bloodType: editingGroup.type,
//           quantity: editingGroup.quantity,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Update failed");

//       toast.success("Blood stock updated successfully");
//       setEditingGroup(null);
//       fetchBloodGroups();
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred";
//       toast.error(errorMessage);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Added Back Button */}
//         <button
//           onClick={() => router.push("/blood-bank-admins/dashboard")}
//           className="mb-4 flex items-center text-gray-400 hover:text-white transition-colors"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Back to Dashboard
//         </button>

//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
//               Blood Inventory
//             </h1>
//             <p className="text-gray-400 mt-2">
//               Manage your blood bank&apos;s current stock levels
//             </p>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
//             {error}
//           </div>
//         )}

//         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700/50">
//               <thead className="bg-gray-700/50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Blood Type
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Current Stock
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={3} className="px-6 py-8 text-center">
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   bloodGroups.map((group) => (
//                     <tr key={group.id} className="hover:bg-gray-700/20">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold">
//                             {group.type}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-white">
//                               {group.type}
//                             </div>
//                             <div className="text-sm text-gray-400">
//                               Blood Group
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div
//                           className={`text-lg font-semibold ${
//                             group.quantity < 5
//                               ? "text-red-400"
//                               : group.quantity < 10
//                               ? "text-yellow-400"
//                               : "text-green-400"
//                           }`}
//                         >
//                           {group.quantity} units
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {group.quantity < 5
//                             ? "Critical Level"
//                             : group.quantity < 10
//                             ? "Low Stock"
//                             : "In Stock"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() =>
//                             setEditingGroup({
//                               type: group.type,
//                               quantity: group.quantity,
//                             })
//                           }
//                           className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
//                         >
//                           Update Stock
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {editingGroup && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold text-white mb-2">
//                   Update Blood Stock
//                 </h2>
//                 <p className="text-gray-400 mb-6">
//                   Adjust the quantity for {editingGroup.type}
//                 </p>

//                 <form onSubmit={handleUpdate}>
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-300 mb-2">
//                       New Quantity
//                     </label>
//                     <input
//                       type="number"
//                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                       value={editingGroup.quantity}
//                       onChange={(e) =>
//                         setEditingGroup({
//                           ...editingGroup,
//                           quantity: parseInt(e.target.value) || 0,
//                         })
//                       }
//                       min={0}
//                       required
//                     />
//                   </div>

//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setEditingGroup(null)}
//                       className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isUpdating}
//                       className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
//                     >
//                       {isUpdating ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Updating...
//                         </>
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import type React from "react";
// import { useEffect, useState, useMemo } from "react";
// import { toast } from "react-hot-toast";
// // Removed import { useRouter } from "next/navigation"; to fix compilation error

// // --- Type Definitions ---
// type BloodGroup = {
//   id: string;
//   blood_bank_id: string;
//   type: string;
//   quantity: number;
//   added_at: string; // ISO string (e.g., 2025-10-02T00:00:00.000Z)
//   expire_time: string; // ISO string
// };

// type EditingGroup = {
//   type: string;
//   quantity: number;
//   expire_time: string; // ISO string
// };

// // --- Date Utility Functions ---

// // Converts an ISO 8601 string (e.g., 2025-10-02T...) to YYYY-MM-DD format for HTML input[type=date]
// const toInputDate = (isoString: string | null | undefined): string => {
//   if (!isoString) return '';
//   // Safely converts to a local date string based on the date part only
//   return new Date(isoString).toISOString().split('T')[0];
// };

// // Converts an ISO 8601 string to a user-friendly format
// const toDisplayDate = (isoString: string | null | undefined): string => {
//   if (!isoString) return 'N/A';
//   return new Date(isoString).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// // --- Main Component ---

// export default function BloodGroupsPage(): React.JSX.Element {
//   // const router = useRouter(); // Removed
//   const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
//   const [error, setError] = useState<string>("");
//   const [editingGroup, setEditingGroup] = useState<EditingGroup | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isUpdating, setIsUpdating] = useState<boolean>(false);

//   // Memoized for efficiency and to stabilize table display logic
//   const isCritical = useMemo(() => bloodGroups.some(g => g.quantity < 5), [bloodGroups]);

//   useEffect(() => {
//     fetchBloodGroups();
//   }, []);

//   const fetchBloodGroups = async () => {
//     setIsLoading(true);
//     try {
//       // Use the administrative inventory route
//       const res = await fetch("/api/blood-groups");
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Failed to fetch inventory");

//       // Assuming the response structure is { bloodGroups: BloodGroup[] }
//       setBloodGroups(data.bloodGroups);
//       setError("");
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred while fetching data";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!editingGroup) return;

//     // Check if a valid expiration time is selected
//     if (!editingGroup.expire_time) {
//       toast.error("Please select an expiration date.");
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       const res = await fetch("/api/blood-groups", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bloodType: editingGroup.type,
//           quantity: editingGroup.quantity,
//           // Send the ISO string date derived from the date input
//           expire_time: editingGroup.expire_time,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Stock update failed");

//       toast.success("Blood stock and expiry date updated successfully");
//       setEditingGroup(null);
//       fetchBloodGroups(); // Refresh data
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An unknown error occurred during update";
//       toast.error(errorMessage);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleEditClick = (group: BloodGroup) => {
//     setEditingGroup({
//       type: group.type,
//       quantity: group.quantity,
//       // Initialize the modal state with the existing expire_time
//       expire_time: group.expire_time,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Back Button - Changed from button+router.push to <a> tag */}
//         <a
//           href="/blood-bank-admins/dashboard"
//           className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Back to Dashboard
//         </a>

//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
//               Blood Inventory
//             </h1>
//             <p className="text-gray-400 mt-2 text-lg">
//               Manage your blood bank&apos;s current stock levels and expiration dates.
//             </p>
//           </div>
//         </div>

//         {isCritical && (
//           <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 font-semibold flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M8.257 3.344a1.875 1.875 0 013.486 0l1.723 3.447a1.875 1.875 0 001.385.955l3.804.553a1.875 1.875 0 011.037 3.193l-2.753 2.684a1.875 1.875 0 00-.54 1.65l.649 3.784a1.875 1.875 0 01-2.723 1.962L10 16.71l-3.398 1.78a1.875 1.875 0 01-2.723-1.962l.649-3.784a1.875 1.875 0 00-.54-1.65L.892 11.532a1.875 1.875 0 011.037-3.193l3.804-.553a1.875 1.875 0 001.385-.955l1.723-3.447z" clipRule="evenodd" />
//             </svg>
//             Warning: Some blood groups are at **Critical** level (less than 5 units).
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
//             {error}
//           </div>
//         )}

//         <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/30">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700/50">
//               <thead className="bg-gray-700/50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Blood Type
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Current Stock
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Added On
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Expiration Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-800/30 divide-y divide-gray-700/50">
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-8 text-center">
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   bloodGroups.map((group) => {
//                     const expiryDate = new Date(group.expire_time);
//                     const isExpired = expiryDate.getTime() < Date.now();
//                     const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

//                     return (
//                       <tr key={group.id} className="hover:bg-gray-700/20">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold text-lg">
//                               {group.type}
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-white">
//                                 {group.type}
//                               </div>
//                               <div className="text-sm text-gray-400">
//                                 Blood Group
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div
//                             className={`text-lg font-semibold ${group.quantity < 5
//                               ? "text-red-400"
//                               : group.quantity < 10
//                                 ? "text-yellow-400"
//                                 : "text-green-400"
//                               }`}
//                           >
//                             {group.quantity} units
//                           </div>
//                           <div className="text-xs text-gray-400">
//                             {group.quantity < 5
//                               ? "Critical Level"
//                               : group.quantity < 10
//                                 ? "Low Stock"
//                                 : "In Stock"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                           {toDisplayDate(group.added_at)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className={`text-sm font-medium ${isExpired ? 'text-red-500' : daysUntilExpiry <= 7 ? 'text-yellow-500' : 'text-gray-300'}`}>
//                             {toDisplayDate(group.expire_time)}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {isExpired
//                               ? "EXPIRED"
//                               : daysUntilExpiry <= 7
//                                 ? `Expires in ${daysUntilExpiry} days`
//                                 : `Valid for ${daysUntilExpiry} days`}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button
//                             onClick={() => handleEditClick(group)}
//                             className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
//                           >
//                             Update Inventory
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {editingGroup && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-md">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold text-white mb-2">
//                   Update Blood Stock: {editingGroup.type}
//                 </h2>
//                 <p className="text-gray-400 mb-6">
//                   Adjust the quantity and set the new expiration date for this batch.
//                 </p>

//                 <form onSubmit={handleUpdate}>
//                   <div className="mb-4">
//                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
//                       New Quantity
//                     </label>
//                     <input
//                       id="quantity"
//                       type="number"
//                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                       value={editingGroup.quantity}
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                         setEditingGroup({
//                           ...editingGroup,
//                           quantity: parseInt(e.target.value) || 0,
//                         })
//                       }
//                       min={0}
//                       required
//                     />
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="expire_time" className="block text-sm font-medium text-gray-300 mb-2">
//                       Expiration Date
//                     </label>
//                     <input
//                       id="expire_time"
//                       type="date"
//                       className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all date-input"
//                       // Convert ISO string from state to YYYY-MM-DD for the date input field
//                       value={toInputDate(editingGroup.expire_time)}
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                         setEditingGroup({
//                           ...editingGroup,
//                           // Convert the YYYY-MM-DD input back to an ISO string (start of day) for the state
//                           expire_time: new Date(e.target.value).toISOString(),
//                         })
//                       }
//                       required
//                     />
//                   </div>

//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setEditingGroup(null)}
//                       className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-all"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isUpdating}
//                       className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center disabled:opacity-70"
//                     >
//                       {isUpdating ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Updating...
//                         </>
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
// Removed import { useRouter } from "next/navigation"; to fix compilation error

// --- Type Definitions ---
type BloodGroup = {
  id: string;
  blood_bank_id: string;
  type: string;
  quantity: number;
  added_at: string; // ISO string (e.g., 2025-10-02T00:00:00.000Z)
  expire_time: string; // ISO string
};

type EditingGroup = {
  type: string;
  quantity: number;
  expire_time: string; // ISO string
};

// --- Date Utility Functions ---

// Converts an ISO 8601 string (e.g., 2025-10-02T...) to YYYY-MM-DD format for HTML input[type=date]
const toInputDate = (isoString: string | null | undefined): string => {
  if (!isoString) return '';
  // Safely converts to a local date string based on the date part only
  return new Date(isoString).toISOString().split('T')[0];
};

// Converts an ISO 8601 string to a user-friendly format
const toDisplayDate = (isoString: string | null | undefined): string => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// --- Main Component ---

export default function BloodGroupsPage(): React.JSX.Element {
  // const router = useRouter(); // Removed
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [error, setError] = useState<string>("");
  const [editingGroup, setEditingGroup] = useState<EditingGroup | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Memoized for efficiency and to stabilize table display logic
  const isCritical = useMemo(() => bloodGroups.some(g => g.quantity < 5), [bloodGroups]);

  useEffect(() => {
    fetchBloodGroups();
  }, []);

  const fetchBloodGroups = async () => {
    setIsLoading(true);
    try {
      // Use the administrative inventory route
      const res = await fetch("/api/blood-groups");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch inventory");

      // Assuming the response structure is { bloodGroups: BloodGroup[] }
      setBloodGroups(data.bloodGroups);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred while fetching data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingGroup) return;

    // Check if a valid expiration time is selected
    if (!editingGroup.expire_time) {
      toast.error("Please select an expiration date.");
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
          bloodType: editingGroup.type,
          quantity: editingGroup.quantity,
          // Send the ISO string date derived from the date input
          expire_time: editingGroup.expire_time,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Stock update failed");

      toast.success("Blood stock and expiry date updated successfully");
      setEditingGroup(null);
      fetchBloodGroups(); // Refresh data
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred during update";
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditClick = (group: BloodGroup) => {
    setEditingGroup({
      type: group.type,
      quantity: group.quantity,
      // Initialize the modal state with the existing expire_time
      expire_time: group.expire_time,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button - Changed from button+router.push to <a> tag */}
        <a
          href="/blood-bank-admins/dashboard"
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
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
        </a>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Blood Inventory
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Manage your blood bank&apos;s current stock levels and expiration dates.
            </p>
          </div>
        </div>

        {isCritical && (
          <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.344a1.875 1.875 0 013.486 0l1.723 3.447a1.875 1.875 0 001.385.955l3.804.553a1.875 1.875 0 011.037 3.193l-2.753 2.684a1.875 1.875 0 00-.54 1.65l.649 3.784a1.875 1.875 0 01-2.723 1.962L10 16.71l-3.398 1.78a1.875 1.875 0 01-2.723-1.962l.649-3.784a1.875 1.875 0 00-.54-1.65L.892 11.532a1.875 1.875 0 011.037-3.193l3.804-.553a1.875 1.875 0 001.385-.955l1.723-3.447z" clipRule="evenodd" />
            </svg>
            Warning: Some blood groups are at **Critical** level (less than 5 units).
          </div>
        )}

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
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Added On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Expiration Date
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
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bloodGroups.map((group) => {
                    const expiryDate = new Date(group.expire_time);
                    const isExpired = expiryDate.getTime() < Date.now();
                    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                    return (
                      <tr key={group.id} className="hover:bg-gray-700/20">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold text-lg">
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
                            className={`text-lg font-semibold ${group.quantity < 5
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {toDisplayDate(group.added_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${isExpired ? 'text-red-500' : daysUntilExpiry <= 7 ? 'text-yellow-500' : 'text-gray-300'}`}>
                            {toDisplayDate(group.expire_time)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {isExpired
                              ? "EXPIRED"
                              : daysUntilExpiry <= 7
                                ? `Expires in ${daysUntilExpiry} days`
                                : `Valid for ${daysUntilExpiry} days`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(group)}
                            className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-4 py-2 rounded-lg border border-red-800/50 transition-all"
                          >
                            Update Inventory
                          </button>
                        </td>
                      </tr>
                    );
                  })
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
                  Update Blood Stock: {editingGroup.type}
                </h2>
                <p className="text-gray-400 mb-6">
                  Adjust the quantity and set the new expiration date for this batch.
                </p>

                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
                      New Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      value={editingGroup.quantity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingGroup({
                          ...editingGroup,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      min={0}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="expire_time" className="block text-sm font-medium text-gray-300 mb-2">
                      Expiration Date
                    </label>
                    <input
                      id="expire_time"
                      type="date"
                      className="w-full bg-gray-700/50 border border-gray-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all date-input"
                      // Convert ISO string from state to YYYY-MM-DD for the date input field
                      value={toInputDate(editingGroup.expire_time)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditingGroup({
                          ...editingGroup,
                          // Convert the YYYY-MM-DD input back to an ISO string (start of day) for the state
                          expire_time: new Date(e.target.value).toISOString(),
                        })
                      }
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
