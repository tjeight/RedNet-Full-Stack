// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { createClient } from "@/utils/supabase";
// import { SignJWT } from "jose";

// function getJwtSecret() {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) throw new Error("JWT_SECRET is not defined in .env");
//   return new TextEncoder().encode(secret);
// }

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required." },
//       { status: 400 }
//     );
//   }

//   const supabase = await createClient();

//   try {
//     // Get admin from DB
//     const { data: admin, error } = await supabase
//       .from("admins")
//       .select("id, email, password, full_name, blood_bank_id")
//       .eq("email", email)
//       .single();

//     if (error || !admin) {
//       console.log("Admin not found for email:", email);
//       return NextResponse.json(
//         { error: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Debug: Log password comparison details
//     console.log("Comparing passwords...");
//     console.log("Input password:", password);
//     console.log("Stored hash:", admin.password);

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       console.log("Password comparison failed");
//       return NextResponse.json(
//         { error: "Invalid credentials." },
//         { status: 401 }
//       );
//     }

//     // Create JWT
//     const jwt = await new SignJWT({
//       id: admin.id,
//       email: admin.email,
//       role: "blood-bank-admin",
//       blood_bank_id: admin.blood_bank_id,
//     })
//       .setProtectedHeader({ alg: "HS256" })
//       .setIssuedAt()
//       .setExpirationTime("6h")
//       .sign(getJwtSecret());

//     // Set cookie
//     const response = NextResponse.json({
//       success: true,
//       admin: {
//         id: admin.id,
//         name: admin.full_name,
//         email: admin.email,
//         blood_bank_id: admin.blood_bank_id,
//       },
//     });

//     response.cookies.set({
//       name: "bb_admin_token",
//       value: jwt,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 60 * 60 * 6,
//       sameSite: "strict",
//     });

//     return response;
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
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
  try {
    const { email, password } = await req.json();

    console.log("=== Login Attempt ===");
    console.log("Email:", email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get admin from the admins table
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, email, password, full_name, role, blood_bank_id")
      .eq("email", email)
      .single();

    console.log("Database query error:", error);
    console.log("Admin found:", admin ? "Yes" : "No");

    if (admin) {
      console.log("Admin details:", {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        blood_bank_id: admin.blood_bank_id,
        hasPassword: !!admin.password
      });
    }

    if (error || !admin) {
      console.log("Admin not found for email:", email);
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Verify password
    console.log("Comparing passwords...");
    console.log("Input password length:", password.length);
    console.log("Stored hash exists:", !!admin.password);
    console.log("Stored hash:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password comparison failed");
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Get role and additional data based on role
    const role = admin.role;
    console.log("User role:", role);

    const additionalData = role === "blood_bank_admin"
      ? { blood_bank_id: admin.blood_bank_id }
      : {};

    // Create JWT with role-specific data
    const jwtPayload = {
      id: admin.id,
      email: admin.email,
      role: role,
      ...additionalData
    };

    console.log("JWT Payload:", jwtPayload);

    const jwt = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("6h")
      .sign(getJwtSecret());

    console.log("JWT created successfully");

    // Set cookie with appropriate name based on role
    const cookieName = role === "super_admin" ? "super_admin_token" : "bb_admin_token";
    console.log("Cookie name:", cookieName);

    const response = NextResponse.json({
      success: true,
      role: role,
      admin: {
        id: admin.id,
        name: admin.full_name,
        email: admin.email,
        ...additionalData,
      },
    });

    response.cookies.set({
      name: cookieName,
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6,
      sameSite: "strict",
    });

    console.log("=== Login Successful ===");
    console.log("Response:", {
      success: true,
      role: role,
      cookieName: cookieName
    });

    return response;
  } catch (err) {
    console.error("=== Login Error ===");
    console.error("Error:", err);
    console.error("Stack:", err instanceof Error ? err.stack : "No stack trace");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}