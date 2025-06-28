import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@/utils/supabase";
import { SignJWT } from "jose";

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

  const supabase = await createClient();

  try {
    // Get admin from DB
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, password, full_name, blood_bank_id")
      .eq("email", email)
      .single();

    if (error || !admin) {
      console.log("Admin not found for email:", email);
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Debug: Log password comparison details
    console.log("Comparing passwords...");
    console.log("Input password:", password);
    console.log("Stored hash:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password comparison failed");
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Create JWT
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

    // Set cookie
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
      maxAge: 60 * 60 * 6,
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
