import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies(); // No await needed, cookies() is synchronous

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value, // Explicitly type 'name' as string
        set: (name: string, value: string, options: any) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name: string, options: any) => {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Sign out the user
  await supabase.auth.signOut();

  // Create response
  const response = NextResponse.json({ success: true });

  // Clear Supabase auth cookies
  response.cookies.set({
    name: "sb-access-token",
    value: "",
    path: "/",
    maxAge: 0, // Immediately expire the cookie
  });

  response.cookies.set({
    name: "sb-refresh-token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
