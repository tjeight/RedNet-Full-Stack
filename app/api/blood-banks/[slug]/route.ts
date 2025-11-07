// // import { createClient } from "@/utils/supabase";
// // import { NextResponse } from "next/server";
// // import { NextRequest } from "next/server";

// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { slug: string } }
// // ) {
// //   const supabase = await createClient();
// //   const { slug } = params;

// //   const { data, error } = await supabase
// //     .from("blood_banks")
// //     .select(
// //       `
// //       id, name, address, phone, latitude, longitude,
// //       blood_groups(type, quantity)
// //     `
// //     )
// //     .eq("slug", slug)
// //     .single();

// //   if (error || !data) {
// //     return NextResponse.json(
// //       { error: "Blood bank not found" },
// //       { status: 404 }
// //     );
// //   }

// //   return NextResponse.json(data);
// // }

// // app/api/blood-banks/[slug]/route.ts
// import { createClient } from "@/utils/supabase";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     const supabase = await createClient();
//     const slug = request.nextUrl.pathname.split("/").pop();

//     console.log(`Fetching blood bank with slug: ${slug}`);

//     const { data, error } = await supabase
//       .from("blood_banks")
//       .select(
//         `
//         id, name, address, phone, latitude, longitude,
//         blood_groups(type, quantity)
//       `
//       )
//       .eq("slug", slug)
//       .single();

//     if (error) {
//       console.error("Supabase error:", error);
//       throw error;
//     }

//     if (!data) {
//       console.error("No data found for slug:", slug);
//       return NextResponse.json(
//         { error: "Blood bank not found" },
//         { status: 404 }
//       );
//     }

//     console.log("Found blood bank:", data.name);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Database error" },
//       { status: 500 }
//     );
//   }
// }

import { createClient } from "@/utils/supabase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const slug = request.nextUrl.pathname.split("/").pop();

    console.log(`Fetching blood bank with slug: ${slug}`);

    // Fetch blood bank info
    const { data: bank, error: bankError } = await supabase
      .from("blood_banks")
      .select("id, name, address, phone, latitude, longitude")
      .eq("slug", slug)
      .single();

    if (bankError) {
      console.error("Supabase error fetching bank:", bankError);
      throw bankError;
    }

    if (!bank) {
      return NextResponse.json(
        { error: "Blood bank not found" },
        { status: 404 }
      );
    }

    // Fetch all blood units for this bank that are NOT expired
    const { data: units, error: unitsError } = await supabase
      .from("blood_groups")
      .select("id, type, added_at, expire_time")
      .eq("blood_bank_id", bank.id)
      .gt("expire_time", new Date().toISOString()); // only non-expired

    if (unitsError) {
      console.error("Supabase error fetching units:", unitsError);
      throw unitsError;
    }

    // Group by type to show count and earliest expiry
    const bloodGroups = units.reduce<Record<string, { count: number; earliestExpire: string }>>(
      (acc, unit) => {
        const expireTime = unit.expire_time;
        if (!acc[unit.type]) {
          acc[unit.type] = { count: 1, earliestExpire: expireTime };
        } else {
          acc[unit.type].count += 1;
          if (new Date(expireTime) < new Date(acc[unit.type].earliestExpire)) {
            acc[unit.type].earliestExpire = expireTime;
          }
        }
        return acc;
      },
      {}
    );

    // Convert grouped object to array
    const blood_groups = Object.entries(bloodGroups).map(([type, info]) => ({
      type,
      quantity: info.count,
      expire_time: info.earliestExpire,
    }));

    return NextResponse.json({
      ...bank,
      blood_groups,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Database error" },
      { status: 500 }
    );
  }
}
