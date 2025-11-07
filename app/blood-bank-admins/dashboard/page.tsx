// // "use client";
// // import { useEffect, useState } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// // } from "recharts";
// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";

// // // Define types for your data
// // type BloodGroupStat = {
// //   type: string;
// //   quantity: number;
// // };

// // type DashboardData = {
// //   admin: {
// //     full_name: string;
// //   };
// //   bloodBank: {
// //     name: string;
// //     address?: string;
// //     phone?: string;
// //   };
// //   stats: {
// //     totalBloodUnits: number;
// //     totalDonations: number;
// //     totalPurchases: number;
// //     totalDonors: number;
// //   };
// //   bloodInventory: BloodGroupStat[];
// //   recentDonations: {
// //     name: string;
// //     donations: number;
// //   }[];
// //   recentTransactions: {
// //     type: string;
// //     blood_type: string;
// //     quantity: number;
// //     created_at: string;
// //     person_name?: string;
// //     donor?: {
// //       full_name: string;
// //       phone?: string;
// //     };
// //     phone?: string;
// //   }[];
// // };

// // type DonationData = {
// //   name: string;
// //   donations: number;
// // };
// // const COLORS = [
// //   "#FF6384",
// //   "#36A2EB",
// //   "#FFCE56",
// //   "#8e44ad",
// //   "#2ecc71",
// //   "#f39c12",
// // ];

// // const navItems = [
// //   {
// //     name: "Dashboard",
// //     href: "/blood-bank-admins/dashboard",
// //     icon: "📊",
// //   },
// //   {
// //     name: "Blood Inventory",
// //     href: "/blood-bank-admins/dashboard/blood-groups",
// //     icon: "🩸",
// //   },
// //   {
// //     name: "Donors List",
// //     href: "/blood-bank-admins/dashboard/donors-list",
// //     icon: "❤️",
// //   },
// //   {
// //     name: "Add Donor",
// //     href: "/blood-bank-admins/dashboard/donors/add",
// //     icon: "🩹",
// //   },
// //   {
// //     name: "Billing",
// //     href: "/blood-bank-admins/dashboard/billing/add",
// //     icon: "💰",
// //   },
// //   // {
// //   //   name: "Reports",
// //   //   href: "/blood-bank-admins/dashboard/reports",
// //   //   icon: "📈",
// //   // },
// // ];

// // const classNames = (...classes: (string | boolean | undefined)[]) => {
// //   return classes.filter(Boolean).join(" ");
// // };

// // export default function DashboardPage() {
// //   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
// //     null
// //   );
// //   const [loading, setLoading] = useState(true);
// //   const pathname = usePathname();
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await fetch("/api/blood-bank/stats");
// //         const data = await res.json();

// //         if (!res.ok) throw new Error(data.error || "Failed to fetch data");

// //         setDashboardData(data);
// //       } catch (error) {
// //         console.error("Error:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();

// //     // Refresh data every 30 seconds
// //     const interval = setInterval(fetchData, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       const response = await fetch("/api/auth/logout", {
// //         method: "POST",
// //       });

// //       if (response.ok) {
// //         router.push("/");
// //       } else {
// //         console.error("Logout failed");
// //       }
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //   };

// //   if (loading) return <p className="p-4">Loading dashboard...</p>;
// //   if (!dashboardData) return <p className="p-4">Error loading data</p>;

// //   // Use real data for the donations chart
// //   const recentDonationsData: DonationData[] = dashboardData.recentDonations;

// //   return (
// //     <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
// //       {/* Sidebar */}
// //       <div className="hidden md:flex flex-col w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700">
// //         <div className="p-4 border-b border-gray-700">
// //           <h1 className="text-xl font-bold text-white">RedNet </h1>
// //           <p className="text-sm text-gray-400">Admin Dashboard</p>
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="flex-1 p-4 space-y-2">
// //           {navItems.map((item) => (
// //             <Link
// //               key={item.href}
// //               href={item.href}
// //               className={classNames(
// //                 "flex items-center px-4 py-3 rounded-lg transition-colors",
// //                 pathname === item.href
// //                   ? "bg-purple-600/30 text-white border border-purple-500/50"
// //                   : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
// //               )}
// //             >
// //               <span className="mr-3 text-lg">{item.icon}</span>
// //               <span>{item.name}</span>
// //             </Link>
// //           ))}
// //         </nav>

// //         {/* User Info and Logout */}
// //         <div className="p-4 border-t border-gray-700">
// //           <div className="flex items-center mb-4">
// //             <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
// //               {dashboardData.admin.full_name.charAt(0)}
// //             </div>
// //             <div className="ml-3">
// //               <p className="text-sm font-medium text-white">
// //                 {dashboardData.admin.full_name}
// //               </p>
// //               <p className="text-xs text-gray-400">
// //                 {dashboardData.bloodBank.name}
// //               </p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={handleLogout}
// //             className="w-full py-2 px-4 bg-red-600/30 hover:bg-red-600/40 text-white rounded-lg transition-colors border border-red-500/50 flex items-center justify-center"
// //           >
// //             <span className="mr-2">🚪</span> Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-y-auto">
// //         <div className="p-6">
// //           <h1 className="text-3xl font-bold text-white mb-6">
// //             {dashboardData.bloodBank.name} Dashboard
// //           </h1>

// //           {/* Stats Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
// //               <h2 className="text-lg text-gray-300">🩸 Total Blood Units</h2>
// //               <p className="text-4xl font-bold text-red-400 mt-2">
// //                 {dashboardData.stats.totalBloodUnits}
// //                 <span className="text-sm ml-2 text-gray-400">units</span>
// //               </p>
// //               <div className="mt-4 h-2 bg-gray-700 rounded-full">
// //                 <div
// //                   className="h-2 bg-red-500 rounded-full"
// //                   style={{
// //                     width: `${Math.min(
// //                       100,
// //                       (dashboardData.stats.totalBloodUnits / 100) * 100
// //                     )}%`,
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>

// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-green-500/50 transition-all">
// //               <h2 className="text-lg text-gray-300">❤️ Donations (30d)</h2>
// //               <p className="text-4xl font-bold text-green-400 mt-2">
// //                 {dashboardData.stats.totalDonations}
// //                 <span className="text-sm ml-2 text-gray-400">donations</span>
// //               </p>
// //               <div className="mt-4 h-2 bg-gray-700 rounded-full">
// //                 <div
// //                   className="h-2 bg-green-500 rounded-full"
// //                   style={{
// //                     width: `${Math.min(
// //                       100,
// //                       (dashboardData.stats.totalDonations / 50) * 100
// //                     )}%`,
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>

// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all">
// //               <h2 className="text-lg text-gray-300">💰 Purchases (30d)</h2>
// //               <p className="text-4xl font-bold text-blue-400 mt-2">
// //                 {dashboardData.stats.totalPurchases}
// //                 <span className="text-sm ml-2 text-gray-400">transactions</span>
// //               </p>
// //               <div className="mt-4 h-2 bg-gray-700 rounded-full">
// //                 <div
// //                   className="h-2 bg-blue-500 rounded-full"
// //                   style={{
// //                     width: `${Math.min(
// //                       100,
// //                       (dashboardData.stats.totalPurchases / 30) * 100
// //                     )}%`,
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Charts Section */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// //             {/* Blood Group Distribution */}
// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
// //               <h2 className="text-xl font-semibold text-white mb-4">
// //                 Blood Group Distribution
// //               </h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie
// //                     data={dashboardData.bloodInventory}
// //                     dataKey="quantity"
// //                     nameKey="type"
// //                     cx="50%"
// //                     cy="50%"
// //                     outerRadius={80}
// //                     fill="#8884d8"
// //                     label={({ name, percent }) =>
// //                       `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
// //                     }
// //                   >
// //                     {dashboardData.bloodInventory.map((_, index) => (
// //                       <Cell
// //                         key={`cell-${index}`}
// //                         fill={COLORS[index % COLORS.length]}
// //                       />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "rgba(31, 41, 55, 0.8)",
// //                       borderColor: "rgba(109, 40, 217, 0.5)",
// //                       borderRadius: "0.5rem",
// //                       backdropFilter: "blur(4px)",
// //                     }}
// //                   />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>

// //             {/* Recent Donations */}
// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
// //               <h2 className="text-xl font-semibold text-white mb-4">
// //                 Recent Donations (7 days)
// //               </h2>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <BarChart data={recentDonationsData}>
// //                   <CartesianGrid
// //                     strokeDasharray="3 3"
// //                     stroke="rgba(255, 255, 255, 0.1)"
// //                   />
// //                   <XAxis
// //                     dataKey="name"
// //                     stroke="rgba(255, 255, 255, 0.5)"
// //                     tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
// //                   />
// //                   <YAxis
// //                     stroke="rgba(255, 255, 255, 0.5)"
// //                     tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
// //                   />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "rgba(31, 41, 55, 0.8)",
// //                       borderColor: "rgba(109, 40, 217, 0.5)",
// //                       borderRadius: "0.5rem",
// //                       backdropFilter: "blur(4px)",
// //                     }}
// //                   />
// //                   <Bar
// //                     dataKey="donations"
// //                     name="Donations"
// //                     fill="#8884d8"
// //                     radius={[4, 4, 0, 0]}
// //                   />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* Recent Activity */}
// //           <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
// //             <h2 className="text-xl font-semibold text-white mb-4">
// //               Recent Activity
// //             </h2>
// //             <div className="space-y-4">
// //               {dashboardData.recentTransactions.map((activity, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-start p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
// //                 >
// //                   <div className="flex-shrink-0 mt-1">
// //                     {activity.type === "donation" ? (
// //                       <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
// //                         ❤️
// //                       </div>
// //                     ) : (
// //                       <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
// //                         💰
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div className="ml-3 flex-1">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="text-sm font-medium text-white">
// //                         {activity.type === "donation"
// //                           ? `Donation from ${activity.donor?.full_name || activity.person_name
// //                           } (${activity.blood_type})`
// //                           : `Purchase by ${activity.person_name} (${activity.blood_type})`}
// //                       </h3>
// //                       <span className="text-xs text-gray-400">
// //                         {new Date(activity.created_at).toLocaleDateString(
// //                           "en-US",
// //                           {
// //                             month: "short",
// //                             day: "numeric",
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           }
// //                         )}
// //                       </span>
// //                     </div>
// //                     <p className="text-sm text-gray-300 mt-1">
// //                       {activity.quantity} units{" "}
// //                       {activity.type === "donation" ? "donated" : "purchased"}
// //                       {activity.phone && ` | Phone: ${activity.phone}`}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// // Define types for your data
// type BloodGroupStat = {
//   type: string;
//   quantity: number;
// };

// type DashboardData = {
//   admin: {
//     full_name: string;
//   };
//   bloodBank: {
//     name: string;
//     address?: string;
//     phone?: string;
//   };
//   stats: {
//     totalBloodUnits: number;
//     totalDonations: number;
//     totalPurchases: number;
//     totalDonors: number;
//   };
//   bloodInventory: BloodGroupStat[];
//   recentDonations: {
//     name: string;
//     donations: number;
//   }[];
//   recentTransactions: {
//     type: string;
//     blood_type: string;
//     quantity: number;
//     created_at: string;
//     person_name?: string;
//     donor?: {
//       full_name: string;
//       phone?: string;
//     };
//     phone?: string;
//   }[];
// };

// type DonationData = {
//   name: string;
//   donations: number;
// };

// const COLORS = [
//   "#EF4444",
//   "#3B82F6",
//   "#F59E0B",
//   "#8B5CF6",
//   "#10B981",
//   "#EC4899",
// ];

// const navItems = [
//   {
//     name: "Dashboard",
//     href: "/blood-bank-admins/dashboard",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     ),
//   },
//   {
//     name: "Blood Inventory",
//     href: "/blood-bank-admins/dashboard/blood-groups",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//       </svg>
//     ),
//   },
//   {
//     name: "Donors List",
//     href: "/blood-bank-admins/dashboard/donors-list",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Add Donor",
//     href: "/blood-bank-admins/dashboard/donors/add",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Billing",
//     href: "/blood-bank-admins/dashboard/billing/add",
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     ),
//   },
// ];

// const classNames = (...classes: (string | boolean | undefined)[]) => {
//   return classes.filter(Boolean).join(" ");
// };

// export default function DashboardPage() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulated data for demo
//         const mockData: DashboardData = {
//           admin: { full_name: "Dr. Sarah Johnson" },
//           bloodBank: {
//             name: "Central Blood Bank",
//             address: "123 Medical Center Dr",
//             phone: "+1 (555) 123-4567"
//           },
//           stats: {
//             totalBloodUnits: 847,
//             totalDonations: 156,
//             totalPurchases: 89,
//             totalDonors: 1243,
//           },
//           bloodInventory: [
//             { type: "A+", quantity: 145 },
//             { type: "O+", quantity: 198 },
//             { type: "B+", quantity: 132 },
//             { type: "AB+", quantity: 87 },
//             { type: "A-", quantity: 112 },
//             { type: "O-", quantity: 173 },
//           ],
//           recentDonations: [
//             { name: "Mon", donations: 23 },
//             { name: "Tue", donations: 19 },
//             { name: "Wed", donations: 28 },
//             { name: "Thu", donations: 31 },
//             { name: "Fri", donations: 25 },
//             { name: "Sat", donations: 18 },
//             { name: "Sun", donations: 12 },
//           ],
//           recentTransactions: [
//             {
//               type: "donation",
//               blood_type: "O+",
//               quantity: 2,
//               created_at: new Date().toISOString(),
//               donor: { full_name: "John Smith", phone: "555-0123" },
//               phone: "555-0123",
//             },
//             {
//               type: "purchase",
//               blood_type: "A+",
//               quantity: 1,
//               created_at: new Date(Date.now() - 3600000).toISOString(),
//               person_name: "City Hospital",
//               phone: "555-0456",
//             },
//             {
//               type: "donation",
//               blood_type: "B-",
//               quantity: 1,
//               created_at: new Date(Date.now() - 7200000).toISOString(),
//               donor: { full_name: "Emily Davis" },
//               phone: "555-0789",
//             },
//           ],
//         };
//         setDashboardData(mockData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/auth/logout", {
//         method: "POST",
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <p className="text-gray-600">Error loading data</p>
//       </div>
//     );
//   }

//   const recentDonationsData: DonationData[] = dashboardData.recentDonations;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">RedNet</h1>
//               <p className="text-xs text-gray-500">Blood Bank System</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 p-4 space-y-1">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={classNames(
//                 "w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
//                 pathname === item.href
//                   ? "bg-red-50 text-red-600 shadow-sm"
//                   : "text-gray-700 hover:bg-gray-50"
//               )}
//             >
//               <span className="mr-3">{item.icon}</span>
//               <span>{item.name}</span>
//             </Link>
//           ))}
//         </nav>

//         {/* User Info and Logout */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow">
//               {dashboardData.admin.full_name.charAt(0)}
//             </div>
//             <div className="ml-3 flex-1 min-w-0">
//               <p className="text-sm font-semibold text-gray-900 truncate">
//                 {dashboardData.admin.full_name}
//               </p>
//               <p className="text-xs text-gray-500 truncate">
//                 {dashboardData.bloodBank.name}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors border border-gray-300 flex items-center justify-center text-sm font-medium"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-8">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Dashboard Overview
//             </h1>
//             <p className="text-gray-500">
//               Welcome back, {dashboardData.admin.full_name.split(' ')[0]}! Here's what's happening today.
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
//                   +12.5%
//                 </span>
//               </div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">Total Blood Units</h3>
//               <p className="text-3xl font-bold text-gray-900">
//                 {dashboardData.stats.totalBloodUnits}
//               </p>
//               <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
//                   style={{
//                     width: `${Math.min(100, (dashboardData.stats.totalBloodUnits / 1000) * 100)}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
//                   30 days
//                 </span>
//               </div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">Donations</h3>
//               <p className="text-3xl font-bold text-gray-900">
//                 {dashboardData.stats.totalDonations}
//               </p>
//               <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
//                   style={{
//                     width: `${Math.min(100, (dashboardData.stats.totalDonations / 200) * 100)}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                 </div>
//                 <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
//                   30 days
//                 </span>
//               </div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">Purchases</h3>
//               <p className="text-3xl font-bold text-gray-900">
//                 {dashboardData.stats.totalPurchases}
//               </p>
//               <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
//                   style={{
//                     width: `${Math.min(100, (dashboardData.stats.totalPurchases / 100) * 100)}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
//                   Total
//                 </span>
//               </div>
//               <h3 className="text-sm font-medium text-gray-500 mb-1">Active Donors</h3>
//               <p className="text-3xl font-bold text-gray-900">
//                 {dashboardData.stats.totalDonors}
//               </p>
//               <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
//                   style={{ width: "75%" }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Blood Group Distribution */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">Blood Inventory</h2>
//                   <p className="text-sm text-gray-500 mt-1">Current stock distribution</p>
//                 </div>
//                 <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                   View All
//                 </button>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={dashboardData.bloodInventory}
//                     dataKey="quantity"
//                     nameKey="type"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={90}
//                     fill="#8884d8"
//                     label={({ name, percent }) =>
//                       `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
//                     }
//                     labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
//                   >
//                     {dashboardData.bloodInventory.map((_, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #E5E7EB",
//                       borderRadius: "0.5rem",
//                       boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Recent Donations */}
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">Weekly Donations</h2>
//                   <p className="text-sm text-gray-500 mt-1">Last 7 days activity</p>
//                 </div>
//                 <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                   View Report
//                 </button>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={recentDonationsData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                   <XAxis
//                     dataKey="name"
//                     stroke="#9CA3AF"
//                     tick={{ fill: "#6B7280", fontSize: 12 }}
//                   />
//                   <YAxis
//                     stroke="#9CA3AF"
//                     tick={{ fill: "#6B7280", fontSize: 12 }}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #E5E7EB",
//                       borderRadius: "0.5rem",
//                       boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                     }}
//                     cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
//                   />
//                   <Bar
//                     dataKey="donations"
//                     name="Donations"
//                     fill="#3B82F6"
//                     radius={[6, 6, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
//                 <p className="text-sm text-gray-500 mt-1">Latest transactions and updates</p>
//               </div>
//               <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                 View All
//               </button>
//             </div>
//             <div className="space-y-3">
//               {dashboardData.recentTransactions.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="flex-shrink-0 mt-0.5">
//                     {activity.type === "donation" ? (
//                       <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
//                         <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                   <div className="ml-4 flex-1 min-w-0">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-sm font-semibold text-gray-900 mb-1">
//                           {activity.type === "donation"
//                             ? `${activity.donor?.full_name || activity.person_name}`
//                             : `${activity.person_name}`}
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           {activity.type === "donation" ? "donated" : "purchased"}{" "}
//                           <span className="font-medium text-gray-900">{activity.quantity} units</span>{" "}
//                           of <span className="font-medium text-gray-900">{activity.blood_type}</span>
//                         </p>
//                         {activity.phone && (
//                           <p className="text-xs text-gray-500 mt-1">
//                             📞 {activity.phone}
//                           </p>
//                         )}
//                       </div>
//                       <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
//                         {new Date(activity.created_at).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// 🧩 --- Type Definitions ---
type BloodGroupStat = { type: string; quantity: number };
type DashboardData = {
  admin: { full_name: string };
  bloodBank: { name: string; address?: string; phone?: string };
  stats: {
    totalBloodUnits: number;
    totalDonations: number;
    totalPurchases: number;
    totalDonors: number;
  };
  bloodInventory: BloodGroupStat[];
  recentDonations: { name: string; donations: number }[];
  recentTransactions: {
    type: string;
    blood_type: string;
    quantity: number;
    created_at: string;
    person_name?: string;
    donor?: { full_name: string; phone?: string };
    phone?: string;
  }[];
};

type DonationData = { name: string; donations: number };

const COLORS = ["#EF4444", "#3B82F6", "#F59E0B", "#8B5CF6", "#10B981", "#EC4899"];

const navItems = [
  { name: "Dashboard", href: "/blood-bank-admins/dashboard", icon: "📊" },
  { name: "Blood Inventory", href: "/blood-bank-admins/dashboard/blood-groups", icon: "🩸" },
  { name: "Donors List", href: "/blood-bank-admins/dashboard/donors-list", icon: "❤️" },
  { name: "Add Donor", href: "/blood-bank-admins/dashboard/donors/add", icon: "➕" },
  { name: "Billing", href: "/blood-bank-admins/dashboard/billing/add", icon: "💰" },
];

const classNames = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// 🧠 --- Main Component ---
export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // 🛰️ Fetch Real Data From API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/blood-bank/stats", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch dashboard data");
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🚪 Logout Handler
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) router.push("/");
      else console.error("Logout failed");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );

  if (!dashboardData)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Error loading data</p>
      </div>
    );

  const recentDonationsData: DonationData[] = dashboardData.recentDonations;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 🌐 Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg text-white text-lg">
              🩸
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RedNet</h1>
              <p className="text-xs text-gray-500">Blood Bank Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
                pathname === item.href
                  ? "bg-red-50 text-red-600 shadow-sm border border-red-100"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Admin Info + Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold shadow">
              {dashboardData.admin.full_name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {dashboardData.admin.full_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{dashboardData.bloodBank.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* 🧭 Main Dashboard */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mb-8">
            Welcome back, {dashboardData.admin.full_name.split(" ")[0]} 👋
          </p>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                title: "Total Blood Units",
                value: dashboardData.stats.totalBloodUnits,
                color: "from-red-500 to-red-600",
                icon: "🩸",
              },
              {
                title: "Donations (30d)",
                value: dashboardData.stats.totalDonations,
                color: "from-green-500 to-green-600",
                icon: "❤️",
              },
              {
                title: "Purchases (30d)",
                value: dashboardData.stats.totalPurchases,
                color: "from-blue-500 to-blue-600",
                icon: "💰",
              },
              {
                title: "Active Donors",
                value: dashboardData.stats.totalDonors,
                color: "from-purple-500 to-purple-600",
                icon: "🧍",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${`bg-gradient-to-br ${stat.color} text-white`}`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded">
                    + Updated
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Blood Group Distribution */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Blood Group Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.bloodInventory}
                    dataKey="quantity"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dashboardData.bloodInventory.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Donations */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Weekly Donations
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentDonationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#6B7280" }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "0.5rem",
                    }}
                    cursor={{ fill: "rgba(59,130,246,0.1)" }}
                  />
                  <Bar dataKey="donations" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {dashboardData.recentTransactions.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5 text-2xl">
                    {activity.type === "donation" ? "❤️" : "💰"}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {activity.type === "donation"
                            ? `${activity.donor?.full_name || activity.person_name}`
                            : `${activity.person_name}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {activity.quantity} units of{" "}
                          <span className="font-semibold">{activity.blood_type}</span>{" "}
                          {activity.type === "donation" ? "donated" : "purchased"}
                        </p>
                        {activity.phone && (
                          <p className="text-xs text-gray-500">📞 {activity.phone}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(activity.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
