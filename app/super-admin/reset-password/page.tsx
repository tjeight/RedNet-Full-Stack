// app/super-admin/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

// Main page component (server component)
export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Reset Password</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
