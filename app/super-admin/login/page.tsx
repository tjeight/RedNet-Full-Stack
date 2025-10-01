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

      // Role-based redirection
      if (data.role === "super_admin") {
        window.location.href = "/super-admin/dashboard";
      } else if (data.role === "blood_bank_admin") {
        window.location.href = "/blood-bank-admins/dashboard";
      } else {
        setError("Unknown user role. Please contact support.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Admin Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access the administrative portal
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/admin/forgot-password"
                className="text-sm text-red-600 hover:text-red-700 underline transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;