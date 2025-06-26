// /app/api/blood-bank-admins/dashboard/summary/route.ts
import { NextResponse } from "next/server";
import { getAdminFromToken } from "@/utils/getAdminFromToken";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const { blood_bank_id } = await getAdminFromToken();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: async () =>
            (await cookies())
              .getAll()
              .map(({ name, value }) => ({ name, value })),
        },
      }
    );

    // 1. Blood stock by group
    const { data: bloodGroups, error: bgError } = await supabase
      .from("blood_groups")
      .select("type, quantity")
      .eq("blood_bank_id", blood_bank_id);

    // 2. Donations count
    const { data: donations, error: dError } = await supabase
      .from("transactions")
      .select("id")
      .eq("blood_bank_id", blood_bank_id)
      .eq("type", "donation")
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      );

    // 3. Purchases count
    const { data: purchases, error: pError } = await supabase
      .from("transactions")
      .select("id")
      .eq("blood_bank_id", blood_bank_id)
      .eq("type", "purchase")
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      );

    if (bgError || dError || pError) {
      return NextResponse.json(
        { error: "Error fetching summary" },
        { status: 500 }
      );
    }

    const totalStock =
      bloodGroups?.reduce((acc, g) => acc + g.quantity, 0) || 0;

    return NextResponse.json({
      totalStock,
      donationCount: donations?.length || 0,
      purchaseCount: purchases?.length || 0,
      bloodGroupStats: bloodGroups,
    });
  } catch (err) {
    console.error("Summary API error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
