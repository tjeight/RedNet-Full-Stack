// import { createClient } from "@/utils/supabase";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   const supabase = await createClient();
//   const body = await req.json();

//   const {
//     full_name,
//     email,
//     password,
//     blood_bank_name,
//     address,
//     phone,
//     location, // This contains the coordinates from the form
//   } = body;

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const { error } = await supabase.from("requests").insert({
//     full_name,
//     email,
//     password: hashedPassword,
//     blood_bank_name,
//     address,
//     phone,
//     latitude: location.coordinates[1], // Store latitude
//     longitude: location.coordinates[0], // Store longitude
//     status: "pending",
//   });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }

//   return NextResponse.json({ success: true });
// }

import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const {
    full_name,
    email,
    password,
    blood_bank_name,
    address,
    phone,
    location,
  } = body;

  try {
    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("requests").insert({
      full_name,
      email,
      password: hashedPassword, // Store the hashed password
      blood_bank_name,
      address,
      phone,
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
      status: "pending",
    });

    if (error) {
      console.error("Request submission error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
