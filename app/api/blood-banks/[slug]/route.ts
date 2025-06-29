// import { createClient } from "@/utils/supabase";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   const supabase = await createClient();
//   const { slug } = params;

//   const { data, error } = await supabase
//     .from("blood_banks")
//     .select(
//       `
//       id, name, address, phone, latitude, longitude,
//       blood_groups(type, quantity)
//     `
//     )
//     .eq("slug", slug)
//     .single();

//   if (error || !data) {
//     return NextResponse.json(
//       { error: "Blood bank not found" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json(data);
// }

import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Extract slug from pathname (e.g. /api/blood-banks/[slug])
  const segments = request.nextUrl.pathname.split("/");
  const slug = segments[segments.length - 1];

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

  return NextResponse.json(data);
}
