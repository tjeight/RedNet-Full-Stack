import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map(({ name, value }) => ({ name, value })),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: admin, error } = await supabase
    .from("admins")
    .select("id, email, password, full_name, blood_bank_id")
    .eq("email", email)
    .single();

  if (!admin || error) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  // Create JWT
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: "blood-bank-admin" },
    process.env.JWT_SECRET!,
    {
      expiresIn: "6h",
    }
  );

  const response = NextResponse.json({
    success: true,
    admin: {
      id: admin.id,
      name: admin.full_name,
      email: admin.email,
      blood_bank_id: admin.blood_bank_id,
    },
  });

  response.cookies.set({
    name: "bb_admin_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return response;
}
