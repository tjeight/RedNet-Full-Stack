// app/api/blood-bank/stats/route.t
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAdminFromToken } from "@/utils/getAdminFromToken";
import { DashboardData } from "@/types"; // Adjust path as needed

export async function GET() {
  try {
    // Get admin and blood bank ID from token
    const payload = await getAdminFromToken();
    const bloodBankId = payload.blood_bank_id as string;
    const adminId = payload.id as string;

    if (!bloodBankId || !adminId) {
      return NextResponse.json(
        { error: "Blood bank ID or Admin ID not found" },
        { status: 400 }
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookies()).get(name)?.value;
          },
        },
      }
    );

    // 1. Fetch admin details
    const { data: admin } = await supabase
      .from("admins")
      .select("full_name")
      .eq("id", adminId)
      .single();

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // 2. Fetch blood bank basic info
    const { data: bloodBank } = await supabase
      .from("blood_banks")
      .select("*")
      .eq("id", bloodBankId)
      .single();

    if (!bloodBank) {
      return NextResponse.json(
        { error: "Blood bank not found" },
        { status: 404 }
      );
    }

    // 3. Fetch blood inventory
    const { data: bloodInventory } = await supabase
      .from("blood_groups")
      .select("type, quantity")
      .eq("blood_bank_id", bloodBankId);

    // 4. Fetch recent transactions with donor/person names
    const thirtyDaysAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: recentTransactions } = await supabase
      .from("transactions")
      .select(
        `
        id, 
        type, 
        blood_type, 
        quantity, 
        created_at,
        person_name,
        phone,
        donor_id,
        donors!donor_id (full_name, phone)
      `
      )
      .eq("blood_bank_id", bloodBankId)
      .gte("created_at", thirtyDaysAgo)
      .order("created_at", { ascending: false })
      .limit(10);

    // Process transactions to flatten the donor relationship
    // const processedTransactions = (recentTransactions || []).map((tx) => {
    //   // Type guard for the donor relationship
    //   const donor =
    //     Array.isArray(tx.donors) && tx.donors.length > 0
    //       ? tx.donors[0]
    //       : undefined;

    //   return {
    //     id: tx.id,
    //     type: tx.type,
    //     blood_type: tx.blood_type,
    //     quantity: tx.quantity,
    //     created_at: tx.created_at,
    //     person_name: tx.person_name,
    //     phone: tx.phone,
    //     donor_id: tx.donor_id,
    //     donor: donor
    //       ? {
    //           id: tx.donor_id,
    //           full_name: donor.full_name,
    //           phone: donor.phone,
    //         }
    //       : undefined,
    //   };
    // });

    // 5. Fetch recent donations for the chart (last 7 days)
    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: recentDonations } = await supabase
      .from("transactions")
      .select("created_at, quantity")
      .eq("blood_bank_id", bloodBankId)
      .eq("type", "donation")
      .gte("created_at", sevenDaysAgo);

    // Format donations data for the weekly chart
    const donationsByDay = formatDonationsByDay(recentDonations || []);

    // 6. Fetch statistics
    const { count: totalDonations } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("blood_bank_id", bloodBankId)
      .eq("type", "donation")
      .gte("created_at", thirtyDaysAgo);

    const { count: totalPurchases } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("blood_bank_id", bloodBankId)
      .eq("type", "purchase")
      .gte("created_at", thirtyDaysAgo);

    const { count: totalDonors } = await supabase
      .from("donors")
      .select("*", { count: "exact" })
      .eq("blood_bank_id", bloodBankId);

    // 7. Calculate total blood units
    const totalBloodUnits =
      bloodInventory?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const responseData: DashboardData = {
      admin: {
        full_name: admin.full_name,
      },
      bloodBank,
      stats: {
        totalBloodUnits,
        totalDonations: totalDonations || 0,
        totalPurchases: totalPurchases || 0,
        totalDonors: totalDonors || 0,
      },
      bloodInventory: bloodInventory || [],
      recentTransactions: (recentTransactions || []).map((tx) => ({
        ...tx,
        person_name:
          tx.type === "donation"
            ? (tx.donors as unknown as { full_name: string })?.full_name ||
            tx.person_name
            : tx.person_name,
        phone:
          tx.type === "donation"
            ? (tx.donors as { phone?: string })?.phone
            : tx.phone,
      })),
      recentDonations: donationsByDay,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching blood bank stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch blood bank data" },
      { status: 500 }
    );
  }
}

// Helper function to format donations by day
function formatDonationsByDay(
  donations: Array<{ created_at: string; quantity: number }>
) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = days.map((day) => ({ name: day, donations: 0 }));

  donations.forEach((donation) => {
    const date = new Date(donation.created_at);
    const dayName = days[date.getDay()];
    const dayIndex = days.indexOf(dayName);

    if (dayIndex !== -1) {
      result[dayIndex].donations += donation.quantity;
    }
  });

  return result;
}
