import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAdminFromToken } from "@/utils/getAdminFromToken"; // Adjust the path if needed

export async function POST(req: Request) {
  try {
    const { buyerName, phone, bloodType, quantity, price, paymentMode } =
      await req.json();
    if (!buyerName || !bloodType || !quantity || !price || !paymentMode) {
      return NextResponse.json(
        { error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // ✅ Use reusable utility to get admin payload
    const payload = await getAdminFromToken();

    const bloodBankId = payload.blood_bank_id as string;

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: async () =>
            (await cookies())
              .getAll()
              .map(({ name, value }) => ({ name, value })),
          setAll: (all) => {
            all.forEach(async ({ name, value, options }) =>
              (await cookies()).set(name, value, options)
            );
          },
        },
      }
    );

    // 1. Insert into transactions
    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert({
        blood_bank_id: bloodBankId,
        type: "purchase",
        blood_type: bloodType,
        quantity,
        person_name: buyerName,
        phone,
      })
      .select()
      .single();

    if (txError) {
      console.error("Transaction error:", txError);
      return NextResponse.json(
        { error: "Failed to create transaction." },
        { status: 500 }
      );
    }

    // 2. Decrement stock using RPC
    const { error: rpcError } = await supabase.rpc("decrement_blood_stock", {
      bloodbank_id: bloodBankId,
      bloodtype: bloodType,
      qty: quantity,
    });

    if (rpcError) {
      console.error("Stock update failed:", rpcError);
      return NextResponse.json(
        { error: "Stock update failed." },
        { status: 500 }
      );
    }

    // 3. Create billing record
    const { error: billingError } = await supabase.from("billings").insert({
      blood_bank_id: bloodBankId,
      transaction_id: transaction.id,
      buyer_name: buyerName,
      blood_type: bloodType,
      quantity,
      price,
      payment_mode: paymentMode,
    });

    if (billingError) {
      console.error("Billing creation failed:", billingError);
      return NextResponse.json(
        { error: "Failed to create bill." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, transactionId: transaction.id });
  } catch (err) {
    console.error("Billing route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
