"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenHash, setTokenHash] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const allParams: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      allParams[key] = value;
    });

    console.log("All URL parameters:", allParams);
    setDebugInfo(JSON.stringify(allParams, null, 2));

    const error = searchParams.get("error");
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      if (errorCode === "otp_expired") {
        setError(
          "Password reset link has expired. Please request a new reset link."
        );
      } else if (error === "access_denied") {
        setError(
          "Access denied. The reset link may have been used already or is invalid."
        );
      } else {
        setError(
          decodeURIComponent(
            errorDescription || "Authentication error occurred."
          )
        );
      }
      return;
    }

    const tokenHash = searchParams.get("token_hash") || null;
    const type = searchParams.get("type") || null;

    console.log("Token Hash:", tokenHash, "Type:", type);

    if (!tokenHash || type !== "recovery") {
      setError(
        "Invalid or missing reset token. Please request a new reset link."
      );
      return;
    }

    setTokenHash(tokenHash);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (!tokenHash) {
      setError("Invalid reset session. Please request a new reset link.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-admin-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword,
          tokenHash,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }

      setMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/super-admin/login"), 2500);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasValidToken = !!tokenHash;

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Reset Password</h1>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-4 text-xs">
            <summary className="cursor-pointer text-gray-600">
              Debug Info (click to expand)
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
              {debugInfo}
            </pre>
            <p className="mt-2 text-gray-600">
              Token Hash: {tokenHash ? "✅ Found" : "❌ Missing"}
            </p>
          </details>
        )}

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}

        {error && (
          <div className="mb-4 text-center">
            <p className="text-red-600 mb-2">{error}</p>
            {(error.includes("expired") ||
              error.includes("invalid") ||
              error.includes("missing")) && (
              <button
                onClick={() => router.push("/super-admin/forgot-password")}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Request New Reset Link
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={!hasValidToken || isLoading}
            className="w-full px-4 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={!hasValidToken || isLoading}
            className="w-full px-4 py-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!hasValidToken || isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          <a
            href="/super-admin/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
