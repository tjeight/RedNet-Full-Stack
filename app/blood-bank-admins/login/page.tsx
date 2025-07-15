// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const AdminLogin = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/admin-login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error);
//       return;
//     }
//     router.push("/blood-bank-admins/dashboard");
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
//       {/* Back Button */}
//       <Link
//         href="/"
//         className="absolute top-6 left-6 z-50 inline-flex items-center text-gray-400 hover:text-white transition-colors group"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Back to Home
//       </Link>

//       {/* Premium Dark Texture Background */}
//       <div className="absolute inset-0 bg-gray-950">
//         <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,#4a4a4a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-950/80 to-gray-950"></div>
//         <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
//       </div>

//       {/* Glassmorphism Card */}
//       <div className="relative w-full max-w-md bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50">
//         {/* Decorative Elements */}
//         <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-600/10 rounded-full filter blur-[80px]"></div>
//         <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-600/10 rounded-full filter blur-[80px]"></div>

//         {/* Card Content */}
//         <div className="p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg rotate-3 transform">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-10 w-10 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                 />
//               </svg>
//             </div>
//             {error && (
//               <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm animate-fade-in">
//                 <div className="flex items-center justify-center">
//                   <svg
//                     className="w-4 h-4 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                   {error}
//                 </div>
//               </div>
//             )}
//             <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 mb-2">
//               BloodBank Admin
//             </h1>
//             <p className="text-gray-400 text-sm font-light tracking-wider">
//               SECURE ADMINISTRATIVE ACCESS
//             </p>
//           </div>

//           {/* Form */}
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-1">
//               <label
//                 htmlFor="email"
//                 className="block text-xs font-medium text-gray-400 uppercase tracking-wider"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-3 text-sm bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all pl-10"
//                   placeholder="admin@bloodbank.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label
//                 htmlFor="password"
//                 className="block text-xs font-medium text-gray-400 uppercase tracking-wider"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   className="w-full px-4 py-3 text-sm bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all pl-10"
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-800/70"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-xs text-gray-400"
//                 >
//                   Remember this device
//                 </label>
//               </div>

//               <div className="text-xs">
//                 <a
//                   href="#"
//                   className="font-medium text-red-400 hover:text-red-300 transition-colors"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full group relative overflow-hidden bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <span className="relative z-10 flex items-center justify-center">
//                 <span>Authenticate</span>
//                 <svg
//                   className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                   ></path>
//                 </svg>
//               </span>
//               <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-800/50">
//             <p className="text-center text-xs text-gray-500">
//               <span className="block mb-1">Need administrative access?</span>
//               <a
//                 href="#"
//                 className="font-medium text-red-400 hover:text-red-300 transition-colors inline-flex items-center"
//               >
//                 Request credentials
//                 <svg
//                   className="ml-1 w-3 h-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   ></path>
//                 </svg>
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Animation styles */}
//       <style jsx global>{`
//         .animate-fade-in {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminLogin;

"use client";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Mail,
  Lock,
  Heart,
  Shield,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminLogin = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/blood-bank-admins/dashboard");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)]" />

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            {/* Logo/Icon */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <div className="relative">
                <Heart className="h-8 w-8 text-white" fill="currentColor" />
                <Shield className="h-4 w-4 text-white absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Blood Bank Admin
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Secure administrative access to manage blood bank operations
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@bloodbank.com"
                    className="pl-10 py-6 text-base border-gray-200 focus:border-red-300 focus:ring-red-200"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 py-6 text-base border-gray-200 focus:border-red-300 focus:ring-red-200"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" disabled={isLoading} />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Remember this device
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Sign In Securely
                  </div>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-100">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Need administrative access?
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Request credentials
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Security Notice
                  </h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    This is a secure administrative portal. All login attempts
                    are monitored and logged for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 RedNet Blood Network. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl" />
    </div>
  );
};

export default AdminLogin;
