// import { createClient } from "@/utils/supabase";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { getCoordinatesFromAddress } from "@/utils/geocode";

// export async function POST(req: Request) {
//   const supabase = await createClient();
//   const { id, action } = await req.json();

//   // Fetch the request details
//   const { data: requestData, error: fetchError } = await supabase
//     .from("requests")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (fetchError || !requestData) {
//     return NextResponse.json({ error: "Request not found" }, { status: 404 });
//   }

//   if (action === "approve") {
//     // ✅ Step 1: Get coordinates using address
//     let coordinates = { latitude: null, longitude: null };
//     try {
//       coordinates = await getCoordinatesFromAddress(requestData.address);
//     } catch (error) {
//       console.warn(
//         "Geocoding failed or invalid address. Proceeding with null coordinates."
//       );
//       // We continue even if coords are not found
//     }

//     // ✅ Step 2: Insert Blood Bank (with coordinates)
//     const { data: bankData, error: bankError } = await supabase
//       .from("blood_banks")
//       .insert({
//         name: requestData.blood_bank_name,
//         address: requestData.address,
//         phone: requestData.phone,
//         slug: requestData.blood_bank_name.toLowerCase().replace(/\s+/g, "-"),
//         latitude: coordinates.latitude,
//         longitude: coordinates.longitude,
//       })
//       .select()
//       .single();

//     if (bankError) {
//       return NextResponse.json(
//         { error: "Failed to create blood bank" },
//         { status: 500 }
//       );
//     }

//     const blood_bank_id = bankData.id;

//     // ✅ Step 3: Create Admin with Hashed Password
//     const hashedPassword = await bcrypt.hash(requestData.password, 10);
//     const { error: adminError } = await supabase.from("admins").insert({
//       full_name: requestData.full_name,
//       email: requestData.email,
//       password: hashedPassword,
//       blood_bank_id,
//       role: "blood_bank_admin",
//     });

//     if (adminError) {
//       return NextResponse.json(
//         { error: "Failed to create admin" },
//         { status: 500 }
//       );
//     }

//     // ✅ Step 4: Create 8 blood groups
//     const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
//     await supabase.from("blood_groups").insert(
//       bloodTypes.map((type) => ({
//         blood_bank_id,
//         type,
//         quantity: 0,
//       }))
//     );

//     // ✅ Step 5: Update request status
//     await supabase.from("requests").update({ status: "approved" }).eq("id", id);
//   } else if (action === "reject") {
//     await supabase.from("requests").update({ status: "rejected" }).eq("id", id);
//   }

//   return NextResponse.json({ success: true });
// }

import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import { getCoordinatesFromAddress } from "@/utils/geocode";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { id, action } = await req.json();

  try {
    // Fetch the request details
    const { data: requestData, error: fetchError } = await supabase
      .from("requests")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !requestData) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Get coordinates (optional)
      let coordinates = { latitude: null, longitude: null };
      try {
        coordinates = await getCoordinatesFromAddress(requestData.address);
      } catch (geocodeError) {
        console.warn("Geocoding failed:", geocodeError);
        coordinates = {
          latitude: requestData.latitude,
          longitude: requestData.longitude,
        };
      }

      // Create Blood Bank
      const { data: bankData, error: bankError } = await supabase
        .from("blood_banks")
        .insert({
          name: requestData.blood_bank_name,
          address: requestData.address,
          phone: requestData.phone,
          slug: requestData.blood_bank_name.toLowerCase().replace(/\s+/g, "-"),
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        })
        .select()
        .single();

      if (bankError) throw bankError;

      // Create Admin - IMPORTANT: Use the already hashed password from request
      const { error: adminError } = await supabase.from("admins").insert({
        full_name: requestData.full_name,
        email: requestData.email,
        password: requestData.password, // Use the stored hashed password
        blood_bank_id: bankData.id,
        role: "blood_bank_admin",
      });

      if (adminError) throw adminError;

      // Create blood groups
      const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      await supabase.from("blood_groups").insert(
        bloodTypes.map((type) => ({
          blood_bank_id: bankData.id,
          type,
          quantity: 0,
        }))
      );

      // Update request status
      await supabase
        .from("requests")
        .update({ status: "approved" })
        .eq("id", id);
    } else if (action === "reject") {
      await supabase
        .from("requests")
        .update({ status: "rejected" })
        .eq("id", id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Request handling error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
