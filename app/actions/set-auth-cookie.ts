// app/actions/set-auth-cookie.ts
"use server";

import { createClient } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function setAuthCookie({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) {
  const supabase = await createClient();

  await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  // Cookie is now set on the server side using `@supabase/ssr`
}
