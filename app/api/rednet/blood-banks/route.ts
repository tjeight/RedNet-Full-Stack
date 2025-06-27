import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () =>
          (await cookies())
            .getAll()
            .map(({ name, value }) => ({ name, value })),
        setAll: () => {},
      },
    }
  );

  const { data, error } = await supabase
    .from("blood_banks")
    .select(
      `
      id, 
      name, 
      address, 
      phone, 
      slug,
      blood_groups:blood_groups(type, quantity)
    `
    )
    .not("blood_groups.quantity", "is", null)
    .gt("blood_groups.quantity", 0);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch blood banks" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    bloodBanks: data.map((bank) => ({
      ...bank,
      blood_groups:
        bank.blood_groups?.filter((group) => group.quantity > 0) || [],
    })),
  });
}
