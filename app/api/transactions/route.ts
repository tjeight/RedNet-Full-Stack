// /app/api/blood-bank-admins/transactions/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAdminFromToken } from "@/utils/getAdminFromToken";

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

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("blood_bank_id", blood_bank_id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ transactions });
  } catch (err) {
    console.error("Transaction fetch error:", err);
    return NextResponse.json(
      { error: "Unauthorized or failed to fetch" },
      { status: 401 }
    );
  }
}
