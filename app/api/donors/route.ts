// app/api/donors/route.ts
import { NextResponse } from "next/server";
import { getAdminFromToken } from "@/utils/getAdminFromToken";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { full_name, blood_type, phone, quantity } = await req.json();

  if (!full_name || !blood_type || !quantity) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const admin = await getAdminFromToken();
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map(({ name, value }) => ({ name, value })),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // Step 1: Create donor
  const { data: donor, error: donorError } = await supabase
    .from("donors")
    .insert({
      full_name,
      blood_type,
      phone,
      blood_bank_id: admin.blood_bank_id,
      last_donated: new Date().toISOString(),
    })
    .select()
    .single();

  if (donorError) {
    return NextResponse.json({ error: donorError.message }, { status: 500 });
  }

  // Step 2: Create transaction (removed unused transaction data destructuring)
  const { error: txError } = await supabase.from("transactions").insert({
    blood_bank_id: admin.blood_bank_id,
    type: "donation",
    blood_type,
    quantity,
    person_name: full_name,
    phone,
    donor_id: donor.id,
  });

  if (txError) {
    return NextResponse.json({ error: txError.message }, { status: 500 });
  }

  // Step 3: Update blood stock
  const { error: stockError } = await supabase.rpc("increment_blood_stock", {
    bloodbank_id: admin.blood_bank_id,
    bloodtype: blood_type,
    qty: quantity,
  });

  if (stockError) {
    return NextResponse.json({ error: stockError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, donor_id: donor.id });
}
