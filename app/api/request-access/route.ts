// /app/api/request-bloodbank/route.ts
import { createClient } from "@/utils/supabase/index";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { full_name, email, password, blood_bank_name, address, phone } = body;

  const { error } = await supabase.from("requests").insert({
    full_name,
    email,
    password, // Hash if needed
    blood_bank_name,
    address,
    phone,
    status: "pending",
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
