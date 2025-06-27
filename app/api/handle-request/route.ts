import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { id, action } = await req.json();

  // Fetch the request details including coordinates
  const { data: requestData, error: fetchError } = await supabase
    .from("requests")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !requestData) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (action === "approve") {
    // ✅ Step 1: Insert Blood Bank with coordinates from request
    const { data: bankData, error: bankError } = await supabase
      .from("blood_banks")
      .insert({
        name: requestData.blood_bank_name,
        address: requestData.address,
        phone: requestData.phone,
        slug: requestData.blood_bank_name.toLowerCase().replace(/\s+/g, "-"),
        latitude: requestData.latitude, // Use stored latitude
        longitude: requestData.longitude, // Use stored longitude
      })
      .select()
      .single();

    if (bankError) {
      return NextResponse.json(
        { error: "Failed to create blood bank" },
        { status: 500 }
      );
    }

    const blood_bank_id = bankData.id;

    // ✅ Step 2: Create Admin with Hashed Password
    const hashedPassword = await bcrypt.hash(requestData.password, 10);
    const { error: adminError } = await supabase.from("admins").insert({
      full_name: requestData.full_name,
      email: requestData.email,
      password: hashedPassword,
      blood_bank_id,
      role: "blood_bank_admin",
    });

    if (adminError) {
      return NextResponse.json(
        { error: "Failed to create admin" },
        { status: 500 }
      );
    }

    // ✅ Step 3: Create 8 blood groups
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    await supabase.from("blood_groups").insert(
      bloodTypes.map((type) => ({
        blood_bank_id,
        type,
        quantity: 0,
      }))
    );

    // ✅ Step 4: Update request status
    await supabase.from("requests").update({ status: "approved" }).eq("id", id);
  } else if (action === "reject") {
    await supabase.from("requests").update({ status: "rejected" }).eq("id", id);
  }

  return NextResponse.json({ success: true });
}
