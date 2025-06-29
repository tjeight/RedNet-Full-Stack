// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
// import { getAdminFromToken } from "@/utils/getAdminFromToken"; // Adjust the path if needed

// export async function POST(req: Request) {
//   try {
//     const { buyerName, phone, bloodType, quantity, price, paymentMode } =
//       await req.json();
//     if (!buyerName || !bloodType || !quantity || !price || !paymentMode) {
//       return NextResponse.json(
//         { error: "All required fields must be provided." },
//         { status: 400 }
//       );
//     }

//     // ✅ Use reusable utility to get admin payload
//     const payload = await getAdminFromToken();

//     const bloodBankId = payload.blood_bank_id as string;

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll: async () =>
//             (await cookies())
//               .getAll()
//               .map(({ name, value }) => ({ name, value })),
//           setAll: (all) => {
//             all.forEach(async ({ name, value, options }) =>
//               (await cookies()).set(name, value, options)
//             );
//           },
//         },
//       }
//     );

//     // 1. Insert into transactions
//     const { data: transaction, error: txError } = await supabase
//       .from("transactions")
//       .insert({
//         blood_bank_id: bloodBankId,
//         type: "purchase",
//         blood_type: bloodType,
//         quantity,
//         person_name: buyerName,
//         phone,
//       })
//       .select()
//       .single();

//     if (txError) {
//       console.error("Transaction error:", txError);
//       return NextResponse.json(
//         { error: "Failed to create transaction." },
//         { status: 500 }
//       );
//     }

//     // 2. Decrement stock using RPC
//     const { error: rpcError } = await supabase.rpc("decrement_blood_stock", {
//       bloodbank_id: bloodBankId,
//       bloodtype: bloodType,
//       qty: quantity,
//     });

//     if (rpcError) {
//       console.error("Stock update failed:", rpcError);
//       return NextResponse.json(
//         { error: "Stock update failed." },
//         { status: 500 }
//       );
//     }

//     // 3. Create billing record
//     // Add payment mode validation
//     const allowedPaymentModes = [
//       "cash",
//       "online",
//       "card",
//       "upi",
//       "Bank Transfer",
//     ];
//     if (!allowedPaymentModes.includes(paymentMode)) {
//       return NextResponse.json(
//         { error: "Invalid payment mode." },
//         { status: 400 }
//       );
//     }
//     const { error: billingError } = await supabase.from("billings").insert({
//       blood_bank_id: bloodBankId,
//       transaction_id: transaction.id,
//       buyer_name: buyerName,
//       blood_type: bloodType,
//       quantity,
//       price,
//       payment_mode: paymentMode,
//     });

//     if (billingError) {
//       console.error("Billing creation failed:", billingError);
//       return NextResponse.json(
//         { error: "Failed to create bill." },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, transactionId: transaction.id });
//   } catch (err) {
//     console.error("Billing route error:", err);
//     return NextResponse.json(
//       { error: "Unexpected server error." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAdminFromToken } from "@/utils/getAdminFromToken";

export async function POST(req: Request) {
  try {
    const { buyerName, phone, bloodType, quantity, price, paymentMode } =
      await req.json();

    // Validate required fields
    if (
      !buyerName ||
      !bloodType ||
      !quantity ||
      price == null ||
      !paymentMode
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // Validate quantity
    if (quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0." },
        { status: 400 }
      );
    }

    // Validate price
    if (price < 0) {
      return NextResponse.json(
        { error: "Price cannot be negative." },
        { status: 400 }
      );
    }

    // Validate blood type
    const validBloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    if (!validBloodTypes.includes(bloodType)) {
      return NextResponse.json(
        { error: "Invalid blood type." },
        { status: 400 }
      );
    }

    // Validate payment mode
    const allowedPaymentModes = [
      "cash",
      "online",
      "card",
      "upi",
      "Bank Transfer",
    ];
    if (!allowedPaymentModes.includes(paymentMode)) {
      return NextResponse.json(
        { error: "Invalid payment mode." },
        { status: 400 }
      );
    }

    // Get admin info
    const payload = await getAdminFromToken();
    if (!payload?.blood_bank_id) {
      return NextResponse.json(
        { error: "Unauthorized - No blood bank associated with this account." },
        { status: 401 }
      );
    }
    const bloodBankId = payload.blood_bank_id;

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

    // Start transaction
    let transactionId = null;

    try {
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

      if (txError) throw txError;
      transactionId = transaction.id;

      // 2. Decrement stock using RPC
      const { error: rpcError } = await supabase.rpc("decrement_blood_stock", {
        bloodbank_id: bloodBankId,
        bloodtype: bloodType,
        qty: quantity,
      });

      if (rpcError) {
        // Check if error is due to insufficient stock
        if (rpcError.message.includes("insufficient")) {
          throw new Error("Insufficient blood stock available.");
        }
        throw rpcError;
      }

      // 3. Create billing record
      const { error: billingError } = await supabase.from("billings").insert({
        blood_bank_id: bloodBankId,
        transaction_id: transactionId,
        buyer_name: buyerName,
        blood_type: bloodType,
        quantity,
        price: price, // Price is already converted to integer in frontend
        payment_mode: paymentMode,
      });

      if (billingError) throw billingError;

      return NextResponse.json({
        success: true,
        transactionId: transactionId,
        message: "Billing record created successfully",
      });
    } catch (error) {
      // Rollback operations if error occurs
      if (transactionId) {
        await supabase.from("transactions").delete().eq("id", transactionId);
      }

      console.error("Transaction error:", error);
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Transaction failed",
          details: error instanceof Error ? error.message : undefined,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Billing route error:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
