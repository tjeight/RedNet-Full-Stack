// // "use client";

// // import React, { useState } from "react";
// // import { supabase } from "@/lib/supabase";
// // import { useRouter } from "next/navigation";

// // const SuperLogin = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");

// //     const { error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });

// //     if (error) {
// //       setError("❌ Invalid email or password");
// //       return;
// //     }

// //     const session = await supabase.auth.getSession();
// //     if (!session.data.session) {
// //       setError("❌ Failed to establish session");
// //       return;
// //     }

// //     await fetch("/api/set-cookie", {
// //       method: "POST",
// //       body: JSON.stringify(session.data.session),
// //       headers: { "Content-Type": "application/json" },
// //     });

// //     router.push("/super-admin/dashboard");
// //   };

// //   const handleForgotPassword = () => {
// //     router.push("/super-admin/forgot-password");
// //   };

// //   return (
// //     <div className="relative h-screen">
// //       {/* Premium Background Texture */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"></div>
// //       <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(100,100,100,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
// //       <div className="absolute inset-0 [background-image:url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E')]"></div>
// //       <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

// //       {/* Login Content */}
// //       <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
// //         {/* Back Button - Added at the top of the container */}
// //         <button
// //           onClick={() => router.push("/")}
// //           className="absolute top-6 left-6 flex items-center text-slate-300 hover:text-white transition-colors"
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
// //           Back to Homepage
// //         </button>

// //         <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-700 bg-gray-900/90 px-8 py-10 shadow-2xl backdrop-blur-sm">
// //           <div className="text-center">
// //             <h1 className="mb-2 text-3xl font-bold text-white">
// //               Super Admin <span className="text-sky-400">Portal</span>
// //             </h1>
// //             <p className="text-sm text-slate-300">
// //               Secure access to administrative controls
// //             </p>
// //           </div>

// //           {error && (
// //             <p className="rounded-lg bg-red-900/50 py-2 text-center text-red-300">
// //               {error}
// //             </p>
// //           )}

// //           <form className="space-y-5" onSubmit={handleSubmit}>
// //             <div className="text-left">
// //               <label
// //                 htmlFor="email"
// //                 className="mb-1 block text-sm font-medium text-slate-300"
// //               >
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 value={email}
// //                 className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 placeholder="admin@example.com"
// //               />
// //             </div>

// //             <div className="text-left">
// //               <label
// //                 htmlFor="password"
// //                 className="mb-1 block text-sm font-medium text-slate-300"
// //               >
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
// //                 placeholder="••••••••"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-md transition duration-300 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg"
// //             >
// //               Login
// //             </button>
// //           </form>

// //           <p
// //             className="cursor-pointer text-center text-sm text-slate-400 underline transition hover:text-sky-400"
// //             onClick={handleForgotPassword}
// //           >
// //             Forgot Password?
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuperLogin;

// "use client";
// import { useEffect, useState, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import React from "react";

// // --- TYPE DEFINITIONS for MOCKED COMPONENTS ---
// type BaseProps = {
//   className?: string;
//   children?: React.ReactNode;
// };

// type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
// type DivProps = BaseProps & React.HTMLAttributes<HTMLDivElement>;
// type HeadingProps = BaseProps & React.HTMLAttributes<HTMLHeadingElement>;
// type InputProps = { className?: string } & React.InputHTMLAttributes<HTMLInputElement>;


// // --- SHADCN UI & LUCIDE ICONS (MOCKED FOR SINGLE FILE) ---
// const Button = ({ className, children, ...props }: ButtonProps) => (
//   <button
//     className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Card = ({ className, children }: DivProps) => (
//   <div
//     className={`rounded-xl border bg-card text-card-foreground ${className}`}
//   >
//     {children}
//   </div>
// );

// const CardHeader = ({ className, children }: DivProps) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
//     {children}
//   </div>
// );

// const CardTitle = ({ className, children }: HeadingProps) => (
//   <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
//     {children}
//   </h3>
// );

// const CardContent = ({ className, children }: DivProps) => (
//   <div className={`p-6 pt-0 ${className}`}>{children}</div>
// );

// const Input = ({ className, ...props }: InputProps) => (
//   <input
//     className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     {...props}
//   />
// );

// const Badge = ({ className, children }: DivProps) => (
//   <div
//     className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
//   >
//     {children}
//   </div>
// );

// const Separator = ({ className }: { className?: string }) => (
//   <div className={`shrink-0 bg-border h-[1px] w-full ${className}`} />
// );

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
//   Droplet,
//   Activity,
//   ArrowRight
// } from "lucide-react";

// // --- TYPE DEFINITIONS ---
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

// // --- SKELETON LOADER COMPONENT ---
// const BloodBankCardSkeleton = () => (
//   <div className="h-full bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4 animate-pulse">
//     <div className="h-6 bg-slate-700 rounded-md w-3/4"></div>
//     <div className="space-y-3 pt-2">
//       <div className="flex items-start gap-3">
//         <div className="w-5 h-5 bg-slate-700 rounded-md mt-0.5"></div>
//         <div className="h-4 bg-slate-700 rounded-md w-full"></div>
//       </div>
//       <div className="flex items-center gap-3">
//         <div className="w-5 h-5 bg-slate-700 rounded-md"></div>
//         <div className="h-4 bg-slate-700 rounded-md w-1/2"></div>
//       </div>
//     </div>
//     <div className="h-px bg-slate-700 w-full my-4"></div>
//     <div className="h-4 bg-slate-700 rounded-md w-1/3 mb-3"></div>
//     <div className="flex flex-wrap gap-2">
//       <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
//       <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
//       <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
//     </div>
//     <div className="pt-2">
//       <div className="h-10 w-full bg-slate-700 rounded-lg"></div>
//     </div>
//   </div>
// );

// // --- MAIN PAGE COMPONENT ---
// export default function HomePage() {
//   const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
//   const [search, setSearch] = useState("");
//   const [bloodGroupFilter, setBloodGroupFilter] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const refreshInterval = 3600000; // Default 60 mins

//   const fetchBloodBanks = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
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
//   }, []);

//   useEffect(() => {
//     fetchBloodBanks();
//   }, [fetchBloodBanks]);

//   useEffect(() => {
//     const interval = setInterval(fetchBloodBanks, refreshInterval);
//     return () => clearInterval(interval);
//   }, [refreshInterval, fetchBloodBanks]);

//   const filteredBanks = useMemo(() =>
//     bloodBanks.filter((bank) => {
//       const matchesName = bank.name.toLowerCase().includes(search.toLowerCase());
//       const matchesBloodGroup = !bloodGroupFilter ||
//         bank.blood_groups?.some(g => g.type.toLowerCase() === bloodGroupFilter.toLowerCase());
//       return matchesName && matchesBloodGroup;
//     }),
//     [bloodBanks, search, bloodGroupFilter]
//   );

//   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
//       {/* Background Grid and Glows */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(12,14,33,0.9),rgba(12,14,33,1))]"></div>
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyOTNSwwLjA1KSI+PHBhdGggZD0iTTAgLjUgMzIgLjUgTS41IDAgLjUgMzIiLz48L3N2Zz4=')]" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/40 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-900/40 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-3000"></div>
//       </div>

//       <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
//         >
//           {lastUpdated ? (
//             <div className="flex items-center gap-2 text-sm text-gray-400 bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700 shadow-lg">
//               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
//               <Clock className="w-4 h-4 text-gray-500" />
//               <span>
//                 Updated: {new Date(lastUpdated).toLocaleTimeString()}
//               </span>
//             </div>
//           ) : <div />}
//           <div className="flex items-center gap-3">
//             <Button
//               onClick={fetchBloodBanks}
//               disabled={isLoading}
//               className="flex items-center gap-2 bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-800 hover:border-slate-600 shadow-sm hover:shadow-lg transition-all"
//             >
//               <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
//               {isLoading ? "Refreshing..." : "Refresh"}
//             </Button>
//           </div>
//         </motion.div>

//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <div className="flex justify-center mb-6">
//             <motion.div
//               className="relative"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             >
//               <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/30">
//                 <Droplet className="w-12 h-12 text-white/90" strokeWidth={1.5} />
//               </div>
//               <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                 <Activity className="w-5 h-5 text-white" />
//               </div>
//             </motion.div>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-red-400 bg-clip-text text-transparent tracking-tight">
//             RedNet
//           </h1>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
//             Connecting blood donors, recipients, and banks for a life-saving
//             ecosystem. <span className="font-semibold text-red-400">Every drop counts.</span>
//           </p>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="flex flex-wrap justify-center gap-4 mb-16"
//         >
//           <a href="/request-blood-bank">
//             <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-base shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 transform hover:-translate-y-0.5">
//               <Building2 className="w-5 h-5 mr-2" />
//               Add Blood Bank
//             </Button>
//           </a>
//           <a href="/super-admin/login">
//             <Button className="border-slate-700 bg-slate-800/50 text-gray-300 hover:bg-slate-800 hover:border-slate-600 px-6 py-3 text-base shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
//               <Users className="w-5 h-5 mr-2" />
//               Admin Login
//             </Button>
//           </a>
//         </motion.div>

//         {/* Search and Filter Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="mb-10 sticky top-4 z-20"
//         >
//           <Card className="shadow-2xl bg-slate-800/50 backdrop-blur-lg border-slate-700 p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
//               <div className="md:col-span-1 relative">
//                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
//                 <Input
//                   type="text"
//                   placeholder="Search by name..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="pl-11 pr-4 py-5 text-base bg-slate-900 border-slate-700 focus:border-red-500 focus:ring-red-500/40 rounded-lg shadow-sm text-gray-200 placeholder-gray-500"
//                 />
//               </div>
//               <div className="md:col-span-2 flex flex-wrap items-center gap-2">
//                 <Button
//                   onClick={() => setBloodGroupFilter("")}
//                   className={`px-3 py-1.5 rounded-md text-sm transition-colors ${!bloodGroupFilter ? 'bg-red-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
//                 >
//                   All Types
//                 </Button>
//                 {bloodGroups.map((group) => (
//                   <Button
//                     key={group}
//                     onClick={() => setBloodGroupFilter(bloodGroupFilter === group ? "" : group)}
//                     className={`px-3 py-1.5 rounded-md text-sm transition-colors ${bloodGroupFilter === group ? 'bg-red-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
//                   >
//                     {group}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </Card>
//         </motion.div>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//             className="mb-8 p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-300 flex items-center justify-center gap-2"
//           >
//             <AlertCircle className="w-5 h-5" />
//             <span className="font-medium">{error}</span>
//           </motion.div>
//         )}

//         {/* Results Count and Grid */}
//         <AnimatePresence>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
//             {!isLoading && filteredBanks.length > 0 && (
//               <div className="text-center mb-8">
//                 <Badge className="text-base px-5 py-2 bg-slate-800/80 backdrop-blur-sm text-gray-300 border border-slate-700 shadow-lg font-normal">
//                   Found <span className="font-semibold text-white mx-1.5">{filteredBanks.length}</span> blood bank{filteredBanks.length !== 1 ? "s" : ""}
//                 </Badge>
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {isLoading ? (
//                 Array.from({ length: 6 }).map((_, index) => <BloodBankCardSkeleton key={index} />)
//               ) : filteredBanks.length === 0 ? (
//                 <div className="col-span-full">
//                   <Card className="text-center py-20 bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-lg">
//                     <CardContent>
//                       <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
//                       <h3 className="text-2xl font-semibold text-gray-200 mb-2">
//                         No Matching Blood Banks Found
//                       </h3>
//                       <p className="text-gray-400">
//                         Try adjusting your search or filter criteria.
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ) : (
//                 filteredBanks.map((bank, index) => (
//                   <motion.div
//                     key={bank.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 + index * 0.05 }}
//                     className="h-full"
//                   >
//                     <a href={`/blood-banks/${bank.slug}`} className="block h-full group">
//                       <Card className="h-full bg-slate-800/50 backdrop-blur-lg border-slate-700 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-900/50">
//                         <CardHeader className="pb-4">
//                           <div className="flex items-start justify-between">
//                             <CardTitle className="text-xl text-gray-100 group-hover:text-red-400 transition-colors font-bold">
//                               {bank.name}
//                             </CardTitle>
//                             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
//                           </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                           <div className="space-y-3 text-gray-400">
//                             <div className="flex items-start gap-3">
//                               <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//                               <span className="text-sm">
//                                 {bank.address || "Address not provided"}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
//                               <span className="text-sm font-medium">
//                                 {bank.phone || "Phone not provided"}
//                               </span>
//                             </div>
//                           </div>

//                           {bank.blood_groups && bank.blood_groups.length > 0 && (
//                             <>
//                               <Separator className="my-3 bg-slate-700" />
//                               <div>
//                                 <div className="flex items-center gap-2 mb-3">
//                                   <Heart className="w-4 h-4 text-red-500" />
//                                   <span className="text-sm font-semibold text-gray-300">
//                                     Available Blood Types
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                   {bank.blood_groups.map((group) => (
//                                     <Badge key={group.type} className={bloodGroupFilter === group.type ? "bg-red-600 text-white border-transparent" : "bg-red-900/50 text-red-300 border-red-800/60"}>
//                                       {group.type}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                           <div className="pt-2">
//                             <div className="flex items-center justify-end text-sm font-semibold text-red-400 group-hover:text-red-300 transition-colors">
//                               View Details <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </a>
//                   </motion.div>
//                 ))
//               )}
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

// const SuperLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError("❌ Invalid email or password");
//       return;
//     }

//     const session = await supabase.auth.getSession();
//     if (!session.data.session) {
//       setError("❌ Failed to establish session");
//       return;
//     }

//     await fetch("/api/set-cookie", {
//       method: "POST",
//       body: JSON.stringify(session.data.session),
//       headers: { "Content-Type": "application/json" },
//     });

//     router.push("/super-admin/dashboard");
//   };

//   const handleForgotPassword = () => {
//     router.push("/super-admin/forgot-password");
//   };

//   return (
//     <div className="relative h-screen">
//       {/* Premium Background Texture */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"></div>
//       <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(100,100,100,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
//       <div className="absolute inset-0 [background-image:url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E')]"></div>
//       <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

//       {/* Login Content */}
//       <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
//         {/* Back Button - Added at the top of the container */}
//         <button
//           onClick={() => router.push("/")}
//           className="absolute top-6 left-6 flex items-center text-slate-300 hover:text-white transition-colors"
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
//           Back to Homepage
//         </button>

//         <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-700 bg-gray-900/90 px-8 py-10 shadow-2xl backdrop-blur-sm">
//           <div className="text-center">
//             <h1 className="mb-2 text-3xl font-bold text-white">
//               Super Admin <span className="text-sky-400">Portal</span>
//             </h1>
//             <p className="text-sm text-slate-300">
//               Secure access to administrative controls
//             </p>
//           </div>

//           {error && (
//             <p className="rounded-lg bg-red-900/50 py-2 text-center text-red-300">
//               {error}
//             </p>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div className="text-left">
//               <label
//                 htmlFor="email"
//                 className="mb-1 block text-sm font-medium text-slate-300"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@example.com"
//               />
//             </div>

//             <div className="text-left">
//               <label
//                 htmlFor="password"
//                 className="mb-1 block text-sm font-medium text-slate-300"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-md transition duration-300 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg"
//             >
//               Login
//             </button>
//           </form>

//           <p
//             className="cursor-pointer text-center text-sm text-slate-400 underline transition hover:text-sky-400"
//             onClick={handleForgotPassword}
//           >
//             Forgot Password?
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperLogin;
// "use client";
// import type React from "react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   ArrowLeft,
//   Mail,
//   Lock,
//   Heart,
//   Shield,
//   AlertCircle,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// const AdminLogin = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/admin-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error);
//         return;
//       }

//       // Role-based redirection
//       if (data.role === "super_admin") {
//         window.location.href = "/super-admin/dashboard";
//       } else if (data.role === "blood_bank_admin") {
//         window.location.href = "/blood-bank-admins/dashboard";
//       } else {
//         setError("Unknown user role. Please contact support.");
//       }
//     } catch {
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link
//             href="/"
//             className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-1" />
//             Back to Home
//           </Link>
//         </div>

//         <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="text-center space-y-4 pb-8">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
//                 Admin Login
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Access the administrative portal
//               </CardDescription>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {error && (
//               <Alert variant="destructive" className="border-red-200 bg-red-50">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                   Email Address
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="admin@example.com"
//                     className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     <span>Signing in...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <Heart className="w-4 h-4" />
//                     <span>Sign In</span>
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="text-center">
//               <Link
//                 href="/admin/forgot-password"
//                 className="text-sm text-red-600 hover:text-red-700 underline transition-colors"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-6 text-center text-xs text-gray-500">
//           By signing in, you agree to our Terms of Service and Privacy Policy
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

// "use client";
// import type React from "react";
// import { useState } from "react";
// import {
//   ArrowLeft,
//   Mail,
//   Lock,
//   Shield,
//   AlertCircle,
//   Eye,
//   EyeOff,
//   LogIn,
// } from "lucide-react";

// // --- Type Definitions for Mock Components ---

// interface BaseProps {
//   className?: string;
//   children: React.ReactNode;
// }

// interface ComponentProps extends BaseProps {
//   // Allows for arbitrary props on wrappers
//   [key: string]: any;
// }

// interface LabelProps extends BaseProps {
//   htmlFor: string;
// }

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
// }

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   className?: string;
//   disabled?: boolean;
// }

// interface AlertProps extends BaseProps {
//   variant: "destructive" | "default";
// }

// interface AlertDescriptionProps {
//   children: React.ReactNode;
// }


// // --- Mock shadcn/ui Components for Self-Containment (Updated for Dark Mode) ---

// const Card: React.FC<ComponentProps> = ({ className = "", children }) => (
//   <div
//     className={`bg-gray-900 shadow-2xl shadow-gray-950/50 border border-gray-700 rounded-xl overflow-hidden ${className}`}
//   >
//     {children}
//   </div>
// );

// const CardHeader: React.FC<BaseProps> = ({ className = "", children }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
//     {children}
//   </div>
// );

// const CardTitle: React.FC<BaseProps> = ({ className = "", children }) => (
//   <h2 className={`text-3xl font-extrabold leading-none tracking-tight text-white ${className}`}>
//     {children}
//   </h2>
// );

// const CardDescription: React.FC<BaseProps> = ({ className = "", children }) => (
//   <p className={`text-sm text-gray-400 ${className}`}>
//     {children}
//   </p>
// );

// const CardContent: React.FC<ComponentProps> = ({ className = "", children }) => (
//   <div className={`p-6 pt-0 ${className}`}>{children}</div>
// );

// const Label: React.FC<LabelProps> = ({ className = "", htmlFor, children }) => (
//   <label
//     htmlFor={htmlFor}
//     className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 ${className}`}
//   >
//     {children}
//   </label>
// );

// const Input: React.FC<InputProps> = ({ className = "", type = "text", ...props }) => (
//   <input
//     type={type}
//     // Dark input background, white text, light border, subtle focus ring
//     className={`flex h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white ring-offset-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 ${className}`}
//     {...props}
//   />
// );

// const Button: React.FC<ButtonProps> = ({ className = "", children, disabled, ...props }) => (
//   <button
//     // High-contrast light button on a dark card
//     className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 py-3 transition-colors disabled:pointer-events-none disabled:opacity-60 bg-gray-200 text-gray-950 hover:bg-white active:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 shadow-xl ${className}`}
//     disabled={disabled}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Alert: React.FC<AlertProps> = ({ className = "", variant, children }) => {
//   const baseClasses = "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7";
//   // Dark mode destructive alert: dark red background with light red text
//   const variantClasses = variant === "destructive"
//     ? "bg-red-900/40 border-red-700 text-red-300"
//     : "bg-gray-700 border-gray-600 text-gray-300";
//   return <div className={`${baseClasses} ${variantClasses} ${className}`}>{children}</div>;
// };

// const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => (
//   <div className="text-sm [&_p]:leading-relaxed">{children}</div>
// );

// // --- Main AdminLogin Component ---

// const AdminLogin: React.FC = () => {
//   const [error, setError] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/admin-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Login failed. Please check your credentials.");
//         return;
//       }

//       // Role-based redirection (using window.location.href as before)
//       if (data.role === "super_admin") {
//         console.log("Redirecting to: /super-admin/dashboard");
//         window.location.href = "/super-admin/dashboard";
//       } else if (data.role === "blood_bank_admin") {
//         console.log("Redirecting to: /blood-bank-admins/dashboard");
//         window.location.href = "/blood-bank-admins/dashboard";
//       } else {
//         setError("Unknown user role. Please contact system administrator.");
//       }
//     } catch (e: unknown) {
//       console.error(e);
//       setError("A network error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // Dark background with a subtle radial gradient for premium texture effect
//     <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4 font-sans antialiased"
//       style={{ backgroundImage: 'radial-gradient(at 50% 10%, #1e293b, #030712)', backgroundAttachment: 'fixed' }}>
//       <div className="w-full max-w-md">
//         {/* Back Button */}
//         <div className="mb-8">
//           <a
//             href="/"
//             className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </a>
//         </div>

//         <Card>
//           <CardHeader className="text-center space-y-4 pb-8">
//             {/* High-contrast icon container */}
//             <div className="mx-auto w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-xl">
//               <Shield className="w-8 h-8 text-gray-950" />
//             </div>
//             <div>
//               <CardTitle>
//                 Admin Portal
//               </CardTitle>
//               <CardDescription>
//                 Sign in to manage organizational resources.
//               </CardDescription>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4 text-red-500" /> {/* Red icon for destructive alert */}
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="email">
//                   Email Address
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                     placeholder="Enter email address"
//                     className="pl-10 h-11"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="pl-10 pr-10 h-11"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     // Icon color for dark mode
//                     className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 transition-colors"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     {/* Dark spinner color for contrast on light button */}
//                     <div className="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
//                     <span>Authenticating...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <LogIn className="w-4 h-4" />
//                     <span>Sign In</span>
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="text-center">
//               <a
//                 href="/admin/forgot-password"
//                 // Link color for dark mode
//                 className="text-sm font-medium text-gray-400 hover:text-white underline transition-colors"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-8 text-center text-xs text-gray-600">
//           <p>Secure administrative access maintained by our system.</p>
//           <p className="mt-1">
//             <a href="/terms" className="hover:text-gray-400 underline transition-colors">Terms of Service</a> &bull; <a href="/privacy" className="hover:text-gray-400 underline transition-colors">Privacy Policy</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default AdminLogin;
// "use client";
// import type React from "react";
// import { useState } from "react";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Mail,
//   Lock,
//   Shield,
//   AlertCircle,
//   Eye,
//   EyeOff,
//   LogIn,
// } from "lucide-react";

// // --- Type Definitions for Mock Components ---

// interface BaseProps {
//   className?: string;
//   children: React.ReactNode;
// }

// interface ComponentProps extends BaseProps {
//   [key: string]: unknown;
// }

// interface LabelProps extends BaseProps {
//   htmlFor: string;
// }

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
// }

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   className?: string;
//   disabled?: boolean;
// }

// interface AlertProps extends BaseProps {
//   variant: "destructive" | "default";
// }

// interface AlertDescriptionProps {
//   children: React.ReactNode;
// }


// // --- Mock shadcn/ui Components for Self-Containment (Updated for Dark Mode) ---

// const Card: React.FC<ComponentProps> = ({ className = "", children }) => (
//   <div
//     className={`bg-gray-900 shadow-2xl shadow-gray-950/50 border border-gray-700 rounded-xl overflow-hidden ${className}`}
//   >
//     {children}
//   </div>
// );

// const CardHeader: React.FC<BaseProps> = ({ className = "", children }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
//     {children}
//   </div>
// );

// const CardTitle: React.FC<BaseProps> = ({ className = "", children }) => (
//   <h2 className={`text-3xl font-extrabold leading-none tracking-tight text-white ${className}`}>
//     {children}
//   </h2>
// );

// const CardDescription: React.FC<BaseProps> = ({ className = "", children }) => (
//   <p className={`text-sm text-gray-400 ${className}`}>
//     {children}
//   </p>
// );

// const CardContent: React.FC<ComponentProps> = ({ className = "", children }) => (
//   <div className={`p-6 pt-0 ${className}`}>{children}</div>
// );

// const Label: React.FC<LabelProps> = ({ className = "", htmlFor, children }) => (
//   <label
//     htmlFor={htmlFor}
//     className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 ${className}`}
//   >
//     {children}
//   </label>
// );

// const Input: React.FC<InputProps> = ({ className = "", type = "text", ...props }) => (
//   <input
//     type={type}
//     // Dark input background, white text, light border, subtle focus ring
//     className={`flex h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white ring-offset-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 ${className}`}
//     {...props}
//   />
// );

// const Button: React.FC<ButtonProps> = ({ className = "", children, disabled, ...props }) => (
//   <button
//     // High-contrast light button on a dark card
//     className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 py-3 transition-colors disabled:pointer-events-none disabled:opacity-60 bg-gray-200 text-gray-950 hover:bg-white active:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 shadow-xl ${className}`}
//     disabled={disabled}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Alert: React.FC<AlertProps> = ({ className = "", variant, children }) => {
//   const baseClasses = "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7";
//   // Dark mode destructive alert: dark red background with light red text
//   const variantClasses = variant === "destructive"
//     ? "bg-red-900/40 border-red-700 text-red-300"
//     : "bg-gray-700 border-gray-600 text-gray-300";
//   return <div className={`${baseClasses} ${variantClasses} ${className}`}>{children}</div>;
// };

// const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => (
//   <div className="text-sm [&_p]:leading-relaxed">{children}</div>
// );

// // --- Main AdminLogin Component ---

// const AdminLogin: React.FC = () => {
//   const [error, setError] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/admin-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Login failed. Please check your credentials.");
//         return;
//       }

//       // Role-based redirection (using window.location.href as before)
//       if (data.role === "super_admin") {
//         console.log("Redirecting to: /super-admin/dashboard");
//         window.location.href = "/super-admin/dashboard";
//       } else if (data.role === "blood_bank_admin") {
//         console.log("Redirecting to: /blood-bank-admins/dashboard");
//         window.location.href = "/blood-bank-admins/dashboard";
//       } else {
//         setError("Unknown user role. Please contact system administrator.");
//       }
//     } catch (err: unknown) {
//       console.error(err);
//       setError("A network error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // Dark background with a subtle radial gradient for premium texture effect
//     <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4 font-sans antialiased"
//       style={{ backgroundImage: 'radial-gradient(at 50% 10%, #1e293b, #030712)', backgroundAttachment: 'fixed' }}>
//       <div className="w-full max-w-md">
//         {/* Back Button - Changed to Link component */}
//         <div className="mb-8">
//           <Link
//             href="/"
//             className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//         </div>

//         <Card>
//           <CardHeader className="text-center space-y-4 pb-8">
//             {/* High-contrast icon container */}
//             <div className="mx-auto w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-xl">
//               <Shield className="w-8 h-8 text-gray-950" />
//             </div>
//             <div>
//               <CardTitle>
//                 Admin Portal
//               </CardTitle>
//               <CardDescription>
//                 Sign in to manage organizational resources.
//               </CardDescription>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4 text-red-500" /> {/* Red icon for destructive alert */}
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="email">
//                   Email Address
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                     placeholder="Enter email address"
//                     className="pl-10 h-11"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="pl-10 pr-10 h-11"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     // Icon color for dark mode
//                     className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 transition-colors"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center space-x-2">
//                     {/* Dark spinner color for contrast on light button */}
//                     <div className="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
//                     <span>Authenticating...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <LogIn className="w-4 h-4" />
//                     <span>Sign In</span>
//                   </div>
//                 )}
//               </Button>
//             </form>

//             <div className="text-center">
//               <Link
//                 href="/admin/forgot-password"
//                 // Link color for dark mode
//                 className="text-sm font-medium text-gray-400 hover:text-white underline transition-colors"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mt-8 text-center text-xs text-gray-600">
//           <p>Secure administrative access maintained by our system.</p>
//           <p className="mt-1">
//             <Link href="/terms" className="hover:text-gray-400 underline transition-colors">Terms of Service</Link> &bull; <Link href="/privacy" className="hover:text-gray-400 underline transition-colors">Privacy Policy</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Shield,
  AlertCircle,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

// --- Type Definitions ---

interface BaseProps {
  className?: string;
  children: React.ReactNode;
}
interface ComponentProps extends BaseProps {
  [key: string]: unknown;
}
interface LabelProps extends BaseProps {
  htmlFor: string;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
}
interface AlertProps extends BaseProps {
  variant: "destructive" | "default";
}
interface AlertDescriptionProps {
  children: React.ReactNode;
}

// --- Mock Components ---

const Card: React.FC<ComponentProps> = ({ className = "", children }) => (
  <div
    className={`bg-gray-900 shadow-2xl shadow-gray-950/50 border border-gray-700 rounded-xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<BaseProps> = ({ className = "", children }) => (
  <h2 className={`text-3xl font-extrabold leading-none tracking-tight text-white ${className}`}>
    {children}
  </h2>
);

const CardDescription: React.FC<BaseProps> = ({ className = "", children }) => (
  <p className={`text-sm text-gray-400 ${className}`}>
    {children}
  </p>
);

const CardContent: React.FC<ComponentProps> = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Label: React.FC<LabelProps> = ({ className = "", htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-gray-300 ${className}`}
  >
    {children}
  </label>
);

const Input: React.FC<InputProps> = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-300 ${className}`}
    {...props}
  />
);

const Button: React.FC<ButtonProps> = ({ className = "", children, disabled, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 transition-colors bg-gray-200 text-gray-950 shadow-xl disabled:opacity-60 ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Alert: React.FC<AlertProps> = ({ className = "", variant, children }) => {
  const style =
    variant === "destructive"
      ? "bg-red-900/40 border-red-700 text-red-300"
      : "bg-gray-700 border-gray-600 text-gray-300";
  return (
    <div className={`relative w-full rounded-lg border p-4 ${style} ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => (
  <div className="text-sm">{children}</div>
);

// --- MAIN COMPONENT ---

const AdminLogin: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setValidationError("");
    setIsLoading(true);

    // VALIDATION ------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setValidationError("Password must include at least one uppercase letter.");
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setValidationError("Password must include at least one lowercase letter.");
      setIsLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setValidationError("Password must include at least one number.");
      setIsLoading(false);
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setValidationError("Password must include at least one special character.");
      setIsLoading(false);
      return;
    }
    // END VALIDATION --------------------------

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please check your credentials.");
        return;
      }

      if (data.role === "super_admin") {
        window.location.href = "/super-admin/dashboard";
      } else if (data.role === "blood_bank_admin") {
        window.location.href = "/blood-bank-admins/dashboard";
      } else {
        setError("Unknown user role. Please contact system administrator.");
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- RETURN UI (UNCHANGED) ---
  return (
    <div
      className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4"
      style={{
        backgroundImage: "radial-gradient(at 50% 10%, #1e293b, #030712)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-xl">
              <Shield className="w-8 h-8 text-gray-950" />
            </div>
            <div>
              <CardTitle>Admin Portal</CardTitle>
              <CardDescription>Sign in to manage organizational resources.</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link href="/admin/forgot-password" className="text-sm text-gray-400 hover:text-white underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-600">
          <p>Secure administrative access maintained by our system.</p>
          <p className="mt-1">
            <Link href="/terms" className="hover:text-gray-400 underline">Terms of Service</Link>{" "}
            &bull;{" "}
            <Link href="/privacy" className="hover:text-gray-400 underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
