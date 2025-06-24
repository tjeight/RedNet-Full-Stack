import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function POST(request: Request) {
  try {
    const { newPassword, tokenHash } = await request.json();

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "Valid password is required." },
        { status: 400 }
      );
    }

    if (!tokenHash) {
      return NextResponse.json(
        { error: "Reset token is required." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string): string | undefined {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions): void {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions): void {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    console.log("Verifying OTP with token_hash:", tokenHash);
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });

    if (verifyError || !data.session) {
      console.error("Verify OTP error:", {
        message: verifyError?.message,
        status: verifyError?.status,
        code: verifyError?.code,
      });
      return NextResponse.json(
        {
          error:
            "Invalid or expired reset token. Please request a new reset link.",
        },
        { status: 401 }
      );
    }

    console.log("Updating password for user:", data.session?.user.id);
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error("Password update error:", {
        message: updateError.message,
        status: updateError.status,
        code: updateError.code,
      });
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    await supabase.auth.signOut();

    return NextResponse.json(
      { message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Server error:", {
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
