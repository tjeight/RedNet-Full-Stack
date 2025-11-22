// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// type BloodGroup = {
//   type: string;
//   quantity: number;
// };

// type BloodBank = {
//   id: string;
//   name: string;
//   address?: string;
//   phone?: string;
//   slug: string;
//   blood_groups?: BloodGroup[];
// };

// export default function HomePage() {
//   const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
//   const [search, setSearch] = useState("");
//   const [bloodGroupFilter, setBloodGroupFilter] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshInterval, setRefreshInterval] = useState(3600000); // 30 seconds default

//   const fetchBloodBanks = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Add cache-busting parameter to ensure fresh data
//       const res = await fetch(`/api/rednet/blood-banks?t=${Date.now()}`);

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (!data.bloodBanks) {
//         throw new Error("No blood banks data received");
//       }

//       // Filter out blood groups with quantity <= 0 on the client side
//       const filteredBanks = data.bloodBanks.map((bank: BloodBank) => ({
//         ...bank,
//         blood_groups:
//           bank.blood_groups?.filter((group) => group.quantity > 0) || [],
//       }));

//       setBloodBanks(filteredBanks);
//       setLastUpdated(new Date().toISOString());
//     } catch (err) {
//       console.error("Failed to load blood banks:", err);
//       setError("Failed to load blood banks. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchBloodBanks();
//   }, []);

//   // Auto-refresh setup
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchBloodBanks();
//     }, refreshInterval);

//     return () => clearInterval(interval);
//   }, [refreshInterval]);

//   const filteredBanks = bloodBanks.filter((bank) => {
//     const matchesName = bank.name.toLowerCase().includes(search.toLowerCase());
//     const matchesBloodGroup =
//       bloodGroupFilter === "" ||
//       (bank.blood_groups &&
//         bank.blood_groups.some(
//           (group) => group.type.toLowerCase() === bloodGroupFilter.toLowerCase()
//         ));
//     return matchesName && matchesBloodGroup;
//   });

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Refresh Controls */}
//         <div className="flex justify-between items-center mb-6">
//           {lastUpdated && (
//             <p className="text-sm text-gray-400">
//               Last updated: {new Date(lastUpdated).toLocaleTimeString()}
//             </p>
//           )}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={fetchBloodBanks}
//               className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg text-sm flex items-center transition-all"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin h-4 w-4 mr-2"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Refreshing...
//                 </span>
//               ) : (
//                 <span className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 mr-1"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   Refresh Now
//                 </span>
//               )}
//             </button>
//             <select
//               value={refreshInterval}
//               onChange={(e) => setRefreshInterval(Number(e.target.value))}
//               className="p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition-all"
//               disabled={isLoading}
//             >
//               {/* <option value={15000}>15s refresh</option>
//               <option value={30000}>30s refresh</option> */}
//               {/* <option value={60000}>1m refresh</option> */}
//               <option value={3600000}>60m refresh</option>
//             </select>
//           </div>
//         </div>

//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4">
//             🩸 RedNet Blood Network
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Connecting blood donors, recipients, and banks for a life-saving
//             ecosystem
//           </p>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="flex flex-wrap justify-center gap-4 mb-12"
//         >
//           <Link href="/request-blood-bank" passHref>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium shadow-lg hover:shadow-red-500/30 transition-all"
//             >
//               Add Blood Bank
//             </motion.button>
//           </Link>

//           <Link href="/super-admin/login" passHref>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
//             >
//               Super Admin Login
//             </motion.button>
//           </Link>

//           <Link href="/blood-bank-admins/login" passHref>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
//             >
//               Blood Bank Login
//             </motion.button>
//           </Link>
//         </motion.div>

//         {/* Search Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//           className="mb-8 space-y-4"
//         >
//           <div className="relative max-w-2xl mx-auto">
//             <input
//               type="text"
//               placeholder="🔍 Search blood banks by name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Blood Group Filter */}
//           <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
//             <select
//               value={bloodGroupFilter}
//               onChange={(e) => setBloodGroupFilter(e.target.value)}
//               className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//             >
//               <option value="">All Blood Types</option>
//               {bloodGroups.map((group) => (
//                 <option key={group} value={group}>
//                   {group}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </motion.div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-8 p-4 bg-red-900/50 text-red-200 rounded-xl border border-red-700 text-center">
//             {error}
//           </div>
//         )}

//         {/* Blood Banks Grid */}
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//               className="h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full"
//             />
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.9, duration: 0.6 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredBanks.length === 0 ? (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-xl text-gray-400">
//                   {search || bloodGroupFilter
//                     ? "No matching blood banks found"
//                     : "No blood banks available yet"}
//                 </p>
//               </div>
//             ) : (
//               filteredBanks.map((bank, index) => (
//                 <motion.div
//                   key={bank.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/30 hover:border-red-500/30 transition-all"
//                 >
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-white mb-2">
//                       {bank.name}
//                     </h3>
//                     <div className="space-y-3 text-gray-300">
//                       <p className="flex items-center">
//                         <svg
//                           className="w-5 h-5 mr-2 text-red-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                         {bank.address || "Address not provided"}
//                       </p>
//                       <p className="flex items-center">
//                         <svg
//                           className="w-5 h-5 mr-2 text-blue-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                           />
//                         </svg>
//                         {bank.phone || "Phone not provided"}
//                       </p>
//                       {bank.blood_groups && bank.blood_groups.length > 0 && (
//                         <div className="pt-2">
//                           <p className="text-sm text-gray-400 mb-1">
//                             Available blood types :
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {bank.blood_groups.map((group) => (
//                               <div
//                                 key={group.type}
//                                 className={`px-2 py-1 rounded text-xs flex items-center ${
//                                   bloodGroupFilter &&
//                                   group.type.toLowerCase() ===
//                                     bloodGroupFilter.toLowerCase()
//                                     ? "bg-red-500/90 text-white"
//                                     : "bg-red-900/50 text-red-300"
//                                 }`}
//                               >
//                                 <span>{group.type}</span>
//                                 {/* <span className="ml-1 font-bold">
//                                   ({group.quantity})
//                                 </span> */}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <Link href={`/blood-banks/${bank.slug}`} passHref>
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         className="mt-6 w-full py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center"
//                       >
//                         View Details
//                         <svg
//                           className="w-4 h-4 ml-2"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </motion.button>
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </motion.div>
//         )}
//         {/* After About Section */}
//         {/* After About Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-center mb-12 mt-2"
//         >
//           <Link href="/about" passHref>
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-6 py-3 bg-transparent border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20 transition-all"
//             >
//               📩 About Us
//             </motion.button>
//           </Link>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-center mb-12"
//         >
//           <Link href="/contact" passHref>
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-6 py-3 bg-transparent border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20 transition-all"
//             >
//               📩 Contact Us
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


//  Second home page comments

// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   RefreshCw,
//   Search,
//   MapPin,
//   Phone,
//   Heart,
//   Users,
//   Building2,
//   Clock,
//   AlertCircle,
// } from "lucide-react";

// type BloodGroup = {
//   type: string;
//   quantity: number;
// };

// type BloodBank = {
//   id: string;
//   name: string;
//   address?: string;
//   phone?: string;
//   slug: string;
//   blood_groups?: BloodGroup[];
// };

// export default function HomePage() {
//   const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
//   const [search, setSearch] = useState("");
//   const [bloodGroupFilter, setBloodGroupFilter] = useState("A+");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshInterval, setRefreshInterval] = useState(3600000);

//   const fetchBloodBanks = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await fetch(`/api/rednet/blood-banks?t=${Date.now()}`);
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       if (!data.bloodBanks) {
//         throw new Error("No blood banks data received");
//       }
//       const filteredBanks = data.bloodBanks.map((bank: BloodBank) => ({
//         ...bank,
//         blood_groups:
//           bank.blood_groups?.filter((group) => group.quantity > 0) || [],
//       }));
//       setBloodBanks(filteredBanks);
//       setLastUpdated(new Date().toISOString());
//     } catch (err: unknown) {
//       console.error("Failed to load blood banks:", err);
//       setError("Failed to load blood banks. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBloodBanks();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchBloodBanks();
//     }, refreshInterval);
//     return () => clearInterval(interval);
//   }, [refreshInterval]);

//   const filteredBanks = bloodBanks.filter((bank) => {
//     const matchesName = bank.name.toLowerCase().includes(search.toLowerCase());
//     const matchesBloodGroup =
//       bloodGroupFilter === "" ||
//       (bank.blood_groups &&
//         bank.blood_groups.some(
//           (group) => group.type.toLowerCase() === bloodGroupFilter.toLowerCase()
//         ));
//     return matchesName && matchesBloodGroup;
//   });

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
//         >
//           <div className="flex items-center gap-3">
//             {lastUpdated && (
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                 <Clock className="w-4 h-4" />
//                 <span>
//                   Updated: {new Date(lastUpdated).toLocaleTimeString()}
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <Button
//               onClick={fetchBloodBanks}
//               disabled={isLoading}
//               variant="outline"
//               size="sm"
//               className="flex items-center gap-2 bg-transparent"
//             >
//               <RefreshCw
//                 className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
//               />
//               {isLoading ? "Refreshing..." : "Refresh"}
//             </Button>
//             <Select
//               value={refreshInterval.toString()}
//               onValueChange={(value) => setRefreshInterval(Number(value))}
//               disabled={isLoading}
//             >
//               <SelectTrigger className="w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="3600000">60m refresh</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </motion.div>

//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
//                 <Heart className="w-10 h-10 text-white" fill="currentColor" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                 <Users className="w-3 h-3 text-white" />
//               </div>
//             </div>
//           </div>
//           <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             Red<span className="text-red-600">Net</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-2 font-medium">
//             Blood Network System
//           </p>
//           <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
//             Connecting blood donors, recipients, and banks for a life-saving
//             ecosystem.
//             <br />
//             <span className="text-red-600 font-semibold">
//               Every drop counts. Every life matters.
//             </span>
//           </p>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="flex flex-wrap justify-center gap-4 mb-12"
//         >
//           <Link href="/request-blood-bank">
//             <Button
//               size="lg"
//               className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
//             >
//               <Building2 className="w-5 h-5 mr-2" />
//               Add Blood Bank
//             </Button>
//           </Link>
//           <Link href="/super-admin/login">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg bg-transparent"
//             >
//               <Users className="w-5 h-5 mr-2" />
//               Super Admin
//             </Button>
//           </Link>
//           <Link href="/blood-bank-admins/login">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg bg-transparent"
//             >
//               <Heart className="w-5 h-5 mr-2" />
//               Bank Admin
//             </Button>
//           </Link>
//         </motion.div>

//         {/* Search and Filter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="mb-8"
//         >
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-center text-gray-800 flex items-center justify-center gap-2">
//                 <Search className="w-5 h-5" />
//                 Find Blood Banks
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="relative max-w-2xl mx-auto">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   type="text"
//                   placeholder="Search blood banks by name..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-10 py-6 text-lg border-gray-200 focus:border-red-300 focus:ring-red-200"
//                 />
//               </div>

//               <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-700 font-medium">
//                     Filter by blood type:
//                   </span>
//                   <Select
//                     value={bloodGroupFilter}
//                     onValueChange={setBloodGroupFilter}
//                   >
//                     <SelectTrigger className="w-40">
//                       <SelectValue placeholder="All Types" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="A+">All Types</SelectItem>
//                       {bloodGroups.map((group) => (
//                         <SelectItem key={group} value={group}>
//                           {group}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {bloodGroups.map((group) => (
//                     <Button
//                       key={group}
//                       variant={
//                         bloodGroupFilter === group ? "default" : "outline"
//                       }
//                       size="sm"
//                       onClick={() =>
//                         setBloodGroupFilter(
//                           bloodGroupFilter === group ? "" : group
//                         )
//                       }
//                       className={
//                         bloodGroupFilter === group
//                           ? "bg-red-600 hover:bg-red-700 text-white"
//                           : "border-gray-200 text-gray-700 hover:bg-gray-50"
//                       }
//                     >
//                       {group}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mb-8"
//           >
//             <Card className="border-red-200 bg-red-50">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-center text-red-700">
//                   <AlertCircle className="w-5 h-5 mr-2" />
//                   <span className="font-medium">Error: </span>
//                   <span className="ml-1">{error}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Blood Banks Grid */}
//         {isLoading ? (
//           <div className="flex flex-col justify-center items-center py-20">
//             <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
//             <p className="text-gray-600 text-lg">Loading blood banks...</p>
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//           >
//             {filteredBanks.length === 0 ? (
//               <Card className="text-center py-16 bg-gray-50">
//                 <CardContent className="pt-6">
//                   <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-700 mb-2">
//                     {search || bloodGroupFilter
//                       ? "No matching blood banks found"
//                       : "No blood banks available yet"}
//                   </h3>
//                   <p className="text-gray-500">
//                     {search || bloodGroupFilter
//                       ? "Try adjusting your search criteria"
//                       : "Be the first to add a blood bank to the network"}
//                   </p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <>
//                 <div className="text-center mb-8">
//                   <Badge variant="secondary" className="text-lg px-4 py-2">
//                     Found {filteredBanks.length} blood bank
//                     {filteredBanks.length !== 1 ? "s" : ""}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredBanks.map((bank, index) => (
//                     <motion.div
//                       key={bank.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 + index * 0.05 }}
//                       whileHover={{ y: -4 }}
//                       className="h-full"
//                     >
//                       <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
//                         <CardHeader className="pb-4">
//                           <div className="flex items-start justify-between">
//                             <CardTitle className="text-xl text-gray-800 leading-tight">
//                               {bank.name}
//                             </CardTitle>
//                             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0 mt-1" />
//                           </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                           <div className="space-y-3 text-gray-600">
//                             <div className="flex items-start gap-3">
//                               <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//                               <span className="text-sm leading-relaxed">
//                                 {bank.address || "Address not provided"}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                               <span className="text-sm">
//                                 {bank.phone || "Phone not provided"}
//                               </span>
//                             </div>
//                           </div>

//                           {bank.blood_groups &&
//                             bank.blood_groups.length > 0 && (
//                               <>
//                                 <Separator />
//                                 <div>
//                                   <div className="flex items-center gap-2 mb-3">
//                                     <Heart className="w-4 h-4 text-red-500" />
//                                     <span className="text-sm font-medium text-gray-700">
//                                       Available Blood Types
//                                     </span>
//                                   </div>
//                                   <div className="flex flex-wrap gap-2">
//                                     {bank.blood_groups.map((group) => (
//                                       <Badge
//                                         key={group.type}
//                                         variant={
//                                           bloodGroupFilter &&
//                                             group.type.toLowerCase() ===
//                                             bloodGroupFilter.toLowerCase()
//                                             ? "default"
//                                             : "secondary"
//                                         }
//                                         className={
//                                           bloodGroupFilter &&
//                                             group.type.toLowerCase() ===
//                                             bloodGroupFilter.toLowerCase()
//                                             ? "bg-red-600 hover:bg-red-700"
//                                             : "bg-red-100 text-red-700 hover:bg-red-200"
//                                         }
//                                       >
//                                         {group.type}
//                                       </Badge>
//                                     ))}
//                                   </div>
//                                 </div>
//                               </>
//                             )}

//                           <Separator />
//                           <Link
//                             href={`/blood-banks/${bank.slug}`}
//                             className="block"
//                           >
//                             <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
//                               View Details
//                               <svg
//                                 className="w-4 h-4 ml-2"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                                 />
//                               </svg>
//                             </Button>
//                           </Link>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </motion.div>
//         )}

//         {/* Footer Links */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-200"
//         >
//           <Link href="/about">
//             <Button
//               variant="ghost"
//               size="lg"
//               className="text-gray-600 hover:text-gray-800"
//             >
//               📖 About Us
//             </Button>
//           </Link>
//           <Link href="/contact">
//             <Button
//               variant="ghost"
//               size="lg"
//               className="text-gray-600 hover:text-gray-800"
//             >
//               📩 Contact Us
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


//


// ---------------------------------------------
// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   RefreshCw,
//   Search,
//   MapPin,
//   Phone,
//   Heart,
//   Users,
//   Building2,
//   Clock,
//   AlertCircle,
// } from "lucide-react";

// type BloodGroup = {
//   type: string;
//   quantity: number;
// };

// type BloodBank = {
//   id: string;
//   name: string;
//   address?: string;
//   phone?: string;
//   slug: string;
//   blood_groups?: BloodGroup[];
// };

// export default function HomePage() {
//   const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
//   const [search, setSearch] = useState("");
//   const [bloodGroupFilter, setBloodGroupFilter] = useState("A+");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshInterval, setRefreshInterval] = useState(3600000);

//   const fetchBloodBanks = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await fetch(`/api/rednet/blood-banks?t=${Date.now()}`);
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       if (!data.bloodBanks) {
//         throw new Error("No blood banks data received");
//       }
//       const filteredBanks = data.bloodBanks.map((bank: BloodBank) => ({
//         ...bank,
//         blood_groups:
//           bank.blood_groups?.filter((group) => group.quantity > 0) || [],
//       }));
//       setBloodBanks(filteredBanks);
//       setLastUpdated(new Date().toISOString());
//     } catch (err: unknown) {
//       console.error("Failed to load blood banks:", err);
//       setError("Failed to load blood banks. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBloodBanks();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchBloodBanks();
//     }, refreshInterval);
//     return () => clearInterval(interval);
//   }, [refreshInterval]);

//   const filteredBanks = bloodBanks.filter((bank) => {
//     const matchesName = bank.name.toLowerCase().includes(search.toLowerCase());
//     const matchesBloodGroup =
//       bloodGroupFilter === "" ||
//       (bank.blood_groups &&
//         bank.blood_groups.some(
//           (group) => group.type.toLowerCase() === bloodGroupFilter.toLowerCase()
//         ));
//     return matchesName && matchesBloodGroup;
//   });

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
//         >
//           <div className="flex items-center gap-3">
//             {lastUpdated && (
//               <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                 <Clock className="w-4 h-4" />
//                 <span>
//                   Updated: {new Date(lastUpdated).toLocaleTimeString()}
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <Button
//               onClick={fetchBloodBanks}
//               disabled={isLoading}
//               variant="outline"
//               size="sm"
//               className="flex items-center gap-2 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 backdrop-blur-sm"
//             >
//               <RefreshCw
//                 className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
//               />
//               {isLoading ? "Refreshing..." : "Refresh"}
//             </Button>
//             <Select
//               value={refreshInterval.toString()}
//               onValueChange={(value) => setRefreshInterval(Number(value))}
//               disabled={isLoading}
//             >
//               <SelectTrigger className="w-32 bg-gray-800/50 border-gray-600 text-gray-300 backdrop-blur-sm">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-800 border-gray-600">
//                 <SelectItem value="3600000" className="text-gray-300 hover:bg-gray-700">60m refresh</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </motion.div>

//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <div className="flex justify-center mb-6">
//             <motion.div
//               className="relative"
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/30 ring-4 ring-red-500/20">
//                 <Heart className="w-12 h-12 text-white" fill="currentColor" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
//                 <Users className="w-4 h-4 text-white" />
//               </div>
//               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 blur-xl opacity-30 animate-pulse"></div>
//             </motion.div>
//           </div>
//           <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
//             Red<span className="text-red-400">Net</span>
//           </h1>
//           <p className="text-2xl text-gray-300 mb-2 font-medium">
//             Blood Network System
//           </p>
//           <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
//             Connecting blood donors, recipients, and banks for a life-saving
//             ecosystem.
//             <br />
//             <span className="text-red-400 font-semibold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
//               Every drop counts. Every life matters.
//             </span>
//           </p>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="flex flex-wrap justify-center gap-4 mb-12"
//         >
//           <Link href="/request-blood-bank">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg shadow-xl shadow-red-500/25 border-0 backdrop-blur-sm"
//             >
//               <Building2 className="w-5 h-5 mr-2" />
//               Add Blood Bank
//             </Button>
//           </Link>
//           <Link href="/super-admin/login">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-8 py-6 text-lg backdrop-blur-sm shadow-lg shadow-purple-500/10"
//             >
//               <Users className="w-5 h-5 mr-2" />
//               Admin Login
//             </Button>
//           </Link>
//           {/* <Link href="/blood-bank-admins/login">
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-blue-500/50 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 px-8 py-6 text-lg backdrop-blur-sm shadow-lg shadow-blue-500/10"
//             >
//               <Heart className="w-5 h-5 mr-2" />
//               Bank Admin
//             </Button>
//           </Link> */}
//         </motion.div>

//         {/* Search and Filter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="mb-8"
//         >
//           <Card className="shadow-2xl border-0 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-center text-white flex items-center justify-center gap-2">
//                 <Search className="w-5 h-5 text-red-400" />
//                 Find Blood Banks
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="relative max-w-2xl mx-auto">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <Input
//                   type="text"
//                   placeholder="Search blood banks by name..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-10 py-6 text-lg bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400/50 backdrop-blur-sm"
//                 />
//               </div>

//               <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-300 font-medium">
//                     Filter by blood type:
//                   </span>
//                   <Select
//                     value={bloodGroupFilter}
//                     onValueChange={setBloodGroupFilter}
//                   >
//                     <SelectTrigger className="w-40 bg-gray-900/50 border-gray-600 text-white">
//                       <SelectValue placeholder="All Types" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-gray-800 border-gray-600">
//                       <SelectItem value="A+" className="text-gray-300 hover:bg-gray-700">All Types</SelectItem>
//                       {bloodGroups.map((group) => (
//                         <SelectItem key={group} value={group} className="text-gray-300 hover:bg-gray-700">
//                           {group}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {bloodGroups.map((group) => (
//                     <Button
//                       key={group}
//                       variant={
//                         bloodGroupFilter === group ? "default" : "outline"
//                       }
//                       size="sm"
//                       onClick={() =>
//                         setBloodGroupFilter(
//                           bloodGroupFilter === group ? "" : group
//                         )
//                       }
//                       className={
//                         bloodGroupFilter === group
//                           ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
//                           : "border-gray-600 bg-gray-800/30 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
//                       }
//                     >
//                       {group}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mb-8"
//           >
//             <Card className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-center text-red-400">
//                   <AlertCircle className="w-5 h-5 mr-2" />
//                   <span className="font-medium">Error: </span>
//                   <span className="ml-1">{error}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Blood Banks Grid */}
//         {isLoading ? (
//           <div className="flex flex-col justify-center items-center py-20">
//             <div className="w-16 h-16 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin mb-4" />
//             <p className="text-gray-400 text-lg">Loading blood banks...</p>
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//           >
//             {filteredBanks.length === 0 ? (
//               <Card className="text-center py-16 bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
//                   <h3 className="text-2xl font-semibold text-gray-300 mb-2">
//                     {search || bloodGroupFilter
//                       ? "No matching blood banks found"
//                       : "No blood banks available yet"}
//                   </h3>
//                   <p className="text-gray-400">
//                     {search || bloodGroupFilter
//                       ? "Try adjusting your search criteria"
//                       : "Be the first to add a blood bank to the network"}
//                   </p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <>
//                 <div className="text-center mb-8">
//                   <Badge variant="secondary" className="text-lg px-4 py-2 bg-gray-700/50 text-gray-300 border-gray-600 backdrop-blur-sm">
//                     Found {filteredBanks.length} blood bank
//                     {filteredBanks.length !== 1 ? "s" : ""}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredBanks.map((bank, index) => (
//                     <motion.div
//                       key={bank.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 + index * 0.05 }}
//                       whileHover={{ y: -8, scale: 1.02 }}
//                       className="h-full"
//                     >
//                       <Card className="h-full shadow-2xl hover:shadow-red-500/10 transition-all duration-500 border-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 group">
//                         <CardHeader className="pb-4">
//                           <div className="flex items-start justify-between">
//                             <CardTitle className="text-xl text-white leading-tight group-hover:text-red-300 transition-colors">
//                               {bank.name}
//                             </CardTitle>
//                             <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0 mt-1 shadow-lg shadow-green-400/50" />
//                           </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                           <div className="space-y-3 text-gray-400">
//                             <div className="flex items-start gap-3">
//                               <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
//                               <span className="text-sm leading-relaxed">
//                                 {bank.address || "Address not provided"}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
//                               <span className="text-sm">
//                                 {bank.phone || "Phone not provided"}
//                               </span>
//                             </div>
//                           </div>

//                           {bank.blood_groups &&
//                             bank.blood_groups.length > 0 && (
//                               <>
//                                 <Separator className="bg-gray-700/50" />
//                                 <div>
//                                   <div className="flex items-center gap-2 mb-3">
//                                     <Heart className="w-4 h-4 text-red-400" />
//                                     <span className="text-sm font-medium text-gray-300">
//                                       Available Blood Types
//                                     </span>
//                                   </div>
//                                   <div className="flex flex-wrap gap-2">
//                                     {bank.blood_groups.map((group) => (
//                                       <Badge
//                                         key={group.type}
//                                         variant={
//                                           bloodGroupFilter &&
//                                             group.type.toLowerCase() ===
//                                             bloodGroupFilter.toLowerCase()
//                                             ? "default"
//                                             : "secondary"
//                                         }
//                                         className={
//                                           bloodGroupFilter &&
//                                             group.type.toLowerCase() ===
//                                             bloodGroupFilter.toLowerCase()
//                                             ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
//                                             : "bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/50"
//                                         }
//                                       >
//                                         {group.type}
//                                       </Badge>
//                                     ))}
//                                   </div>
//                                 </div>
//                               </>
//                             )}

//                           <Separator className="bg-gray-700/50" />
//                           <Link
//                             href={`/blood-banks/${bank.slug}`}
//                             className="block"
//                           >
//                             <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 border-0 transition-all duration-300 group-hover:shadow-red-500/40">
//                               View Details
//                               <svg
//                                 className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                                 />
//                               </svg>
//                             </Button>
//                           </Link>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </motion.div>
//         )}

//         {/* Footer Links */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 pt-8 border-t border-gray-700/50"
//         >
//           <Link href="/about">
//             <Button
//               variant="ghost"
//               size="lg"
//               className="text-gray-400 hover:text-white hover:bg-gray-800/50"
//             >
//               📖 About Us
//             </Button>
//           </Link>
//           <Link href="/contact">
//             <Button
//               variant="ghost"
//               size="lg"
//               className="text-gray-400 hover:text-white hover:bg-gray-800/50"
//             >
//               📩 Contact Us
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// --- TYPE DEFINITIONS for MOCKED COMPONENTS ---
type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type DivProps = BaseProps & React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = BaseProps & React.HTMLAttributes<HTMLHeadingElement>;
type InputProps = { className?: string } & React.InputHTMLAttributes<HTMLInputElement>;


// --- SHADCN UI & LUCIDE ICONS (MOCKED FOR SINGLE FILE) ---
const Button = ({ className, children, ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className, children }: DivProps) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children }: DivProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className, children }: HeadingProps) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className, children }: DivProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Input = ({ className, ...props }: InputProps) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Badge = ({ className, children }: DivProps) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

const Separator = ({ className }: { className?: string }) => (
  <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} />
);

import {
  RefreshCw,
  Search,
  MapPin,
  Phone,
  Heart,
  Users,
  Building2,
  Clock,
  AlertCircle,
  Droplet,
  Activity,
  ArrowRight
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type BloodGroup = {
  type: string;
  quantity: number;
};

type BloodBank = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  slug: string;
  blood_groups?: BloodGroup[];
};

// --- SKELETON LOADER COMPONENT ---
const BloodBankCardSkeleton = () => (
  <div className="h-full bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-slate-700 rounded-md w-3/4"></div>
    <div className="space-y-3 pt-2">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-slate-700 rounded-md mt-0.5"></div>
        <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-slate-700 rounded-md"></div>
        <div className="h-4 bg-slate-700 rounded-md w-1/2"></div>
      </div>
    </div>
    <div className="h-px bg-slate-700 w-full my-4"></div>
    <div className="h-4 bg-slate-700 rounded-md w-1/3 mb-3"></div>
    <div className="flex flex-wrap gap-2">
      <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
      <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
      <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
    </div>
    <div className="pt-2">
      <div className="h-10 w-full bg-slate-700 rounded-lg"></div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const refreshInterval = 3600000; // Default 60 mins

  const fetchBloodBanks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/rednet/blood-banks?t=${Date.now()}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (!data.bloodBanks) {
        throw new Error("No blood banks data received");
      }
      const filteredBanks = data.bloodBanks.map((bank: BloodBank) => ({
        ...bank,
        blood_groups:
          bank.blood_groups?.filter((group) => group.quantity > 0) || [],
      }));
      setBloodBanks(filteredBanks);
      setLastUpdated(new Date().toISOString());
    } catch (err: unknown) {
      console.error("Failed to load blood banks:", err);
      setError("Failed to load blood banks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBloodBanks();
  }, [fetchBloodBanks]);

  useEffect(() => {
    const interval = setInterval(fetchBloodBanks, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, fetchBloodBanks]);
  const filteredBanks = useMemo(() => {
    return bloodBanks.filter((bank) => {

      const matchesName = bank.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // Normalize all blood types (lowercase and trimmed)
      const types = bank.blood_groups?.map(
        (g) => g.type.trim().toLowerCase()
      ) || [];

      // If filter is empty → just match name
      if (!bloodGroupFilter) {
        return matchesName;
      }

      // Case-insensitive filter match
      const matchesBloodGroup =
        types.includes(bloodGroupFilter.toLowerCase());

      return matchesName && matchesBloodGroup;
    });
  }, [bloodBanks, search, bloodGroupFilter]);



  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Background Grid and Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(12,14,33,0.9),rgba(12,14,33,1))]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyOTNSwwLjA1KSI+PHBhdGggZD0iTTAgLjUgMzIgLjUgTS41IDAgLjUgMzIiLz48L3N2Zz4=')]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/40 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-900/40 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
        >
          {lastUpdated ? (
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700 shadow-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
              <Clock className="w-4 h-4 text-gray-500" />
              <span>
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          ) : <div />}
          <div className="flex items-center gap-3">
            <Button
              onClick={fetchBloodBanks}
              disabled={isLoading}
              className="flex items-center gap-2 bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-800 hover:border-slate-600 shadow-sm hover:shadow-lg transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/30">
                <Droplet className="w-12 h-12 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-red-400 bg-clip-text text-transparent tracking-tight">
            RedNet
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connecting blood donors, recipients, and banks for a life-saving
            ecosystem. <span className="font-semibold text-red-400">Every drop counts.</span>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a href="/request-blood-bank">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-base shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
              <Building2 className="w-5 h-5 mr-2" />
              Add Blood Bank
            </Button>
          </a>
          <a href="/super-admin/login">
            <Button className="border-slate-700 bg-slate-800/50 text-gray-300 hover:bg-slate-800 hover:border-slate-600 px-6 py-3 text-base shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              <Users className="w-5 h-5 mr-2" />
              Admin Login
            </Button>
          </a>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 sticky top-4 z-20"
        >
          <Card className="shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 pr-4 py-5 text-base bg-slate-900 border-slate-700 focus:border-red-500 focus:ring-red-500/40 rounded-lg shadow-sm text-gray-200 placeholder-gray-500"
                />
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center gap-2">
                <Button
                  onClick={() => setBloodGroupFilter("")}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${!bloodGroupFilter ? 'bg-red-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
                >
                  All Types
                </Button>
                {bloodGroups.map((group) => (
                  <Button
                    key={group}
                    onClick={() => setBloodGroupFilter(bloodGroupFilter === group ? "" : group)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${bloodGroupFilter === group ? 'bg-red-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
                  >
                    {group}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-300 flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        {/* Results Count and Grid */}
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            {!isLoading && filteredBanks.length > 0 && (
              <div className="text-center mb-8">
                <Badge className="text-base px-5 py-2 bg-slate-800/80 backdrop-blur-sm text-gray-300 border border-slate-700 shadow-lg font-normal">
                  Found <span className="font-semibold text-white mx-1.5">{filteredBanks.length}</span> blood bank{filteredBanks.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => <BloodBankCardSkeleton key={index} />)
              ) : filteredBanks.length === 0 ? (
                <div className="col-span-full">
                  <Card className="text-center py-20 bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-lg">
                    <CardContent>
                      <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-200 mb-2">
                        No Matching Blood Banks Found
                      </h3>
                      <p className="text-gray-400">
                        Try adjusting your search or filter criteria.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                filteredBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="h-full"
                  >
                    <a href={`/blood-banks/${bank.slug}`} className="block h-full group">
                      <Card className="h-full bg-slate-800/50 backdrop-blur-lg border-slate-700 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/50">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl text-gray-100 group-hover:text-red-400 transition-colors font-bold">
                              {bank.name}
                            </CardTitle>
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3 text-gray-400">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">
                                {bank.address || "Address not provided"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                              <span className="text-sm font-medium">
                                {bank.phone || "Phone not provided"}
                              </span>
                            </div>
                          </div>

                          {bank.blood_groups && bank.blood_groups.length > 0 && (
                            <>
                              <Separator className="my-3 bg-slate-700" />
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  <span className="text-sm font-semibold text-gray-300">
                                    Available Blood Types
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {bank.blood_groups.map((group) => (
                                    <Badge key={group.type} className={bloodGroupFilter === group.type ? "bg-red-600 text-white border-transparent" : "bg-red-900/50 text-red-300 border-red-800/60"}>
                                      {group.type}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                          <div className="pt-2">
                            <div className="flex items-center justify-end text-sm font-semibold text-red-400 group-hover:text-red-300 transition-colors">
                              View Details <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


