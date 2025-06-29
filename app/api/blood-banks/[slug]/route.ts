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

// app/api/blood-banks/[slug]/route.ts
import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const slug = request.nextUrl.pathname.split("/").pop();

    console.log(`Fetching blood bank with slug: ${slug}`);

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

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!data) {
      console.error("No data found for slug:", slug);
      return NextResponse.json(
        { error: "Blood bank not found" },
        { status: 404 }
      );
    }

    console.log("Found blood bank:", data.name);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database error" },
      { status: 500 }
    );
  }
}
