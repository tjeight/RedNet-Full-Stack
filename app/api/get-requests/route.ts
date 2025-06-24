// app/api/get-requests/route.ts

import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("requests").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data); // Just return data directly
}
