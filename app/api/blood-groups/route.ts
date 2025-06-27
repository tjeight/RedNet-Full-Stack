import { NextResponse } from "next/server";
import { getAdminFromToken } from "@/utils/getAdminFromToken";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const admin = await getAdminFromToken();
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value;
          },
          async set(name: string, value: string, options: any) {
            (await cookieStore).set({ name, value, ...options });
          },
          async remove(name: string, options: any) {
            (await cookieStore).set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("blood_groups")
      .select("*")
      .eq("blood_bank_id", admin.blood_bank_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ bloodGroups: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAdminFromToken();
    const { bloodType, quantity } = await req.json();
    const cookieStore = cookies();

    if (!bloodType || quantity === undefined) {
      return NextResponse.json(
        { error: "Blood type and quantity are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value;
          },
          async set(name: string, value: string, options: any) {
            (await cookieStore).set({ name, value, ...options });
          },
          async remove(name: string, options: any) {
            (await cookieStore).set({ name, value: "", ...options });
          },
        },
      }
    );

    // Update the specific blood group
    const { data, error } = await supabase
      .from("blood_groups")
      .update({ quantity })
      .eq("blood_bank_id", admin.blood_bank_id)
      .eq("type", bloodType)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ updatedGroup: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
