import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function POST(request: Request) {
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

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Enhanced reset password with better configuration
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/super-admin/reset-password`,
      // Add captcha if needed for security
      // captchaToken: captchaToken
    });

    if (error) {
      console.error("Supabase error:", error);

      // Handle specific error cases
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          {
            error:
              "Too many requests. Please wait before requesting another reset.",
          },
          { status: 429 }
        );
      }

      if (error.message.includes("not found")) {
        // For security, don't reveal if email exists
        return NextResponse.json(
          {
            message:
              "If an account with that email exists, we've sent a password reset link.",
          },
          { status: 200 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "Password reset email sent! Please check your inbox and spam folder. The link will expire in 1 hour.",
        expiresIn: "1 hour",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Invalid request body or server error" },
      { status: 500 }
    );
  }
}
