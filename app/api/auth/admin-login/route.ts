import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

// Helper function to get JWT secret
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in .env");
  return new TextEncoder().encode(secret);
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  // Supabase instance to query admin table
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

  // Get admin from DB
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

  // Check password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  // ✅ Create JWT using `jose`
  const jwt = await new SignJWT({
    id: admin.id,
    email: admin.email,
    role: "blood-bank-admin",
    blood_bank_id: admin.blood_bank_id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("6h")
    .sign(getJwtSecret());

  // ✅ Set JWT cookie
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
    value: jwt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6, // 6 hours
  });

  return response;
}
