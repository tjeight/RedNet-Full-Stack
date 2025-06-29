import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = await createClient();
  const { slug } = params; // Removed 'await' since params is not a promise

  const { data, error } = await supabase
    .from("blood_banks")
    .select(
      `
      id, name, address, phone, latitude, longitude,
      blood_groups(type, quantity)
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Blood bank not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data); // Removed wrapping object
}
