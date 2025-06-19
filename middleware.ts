import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL("/super-admin/login", request.url));
  }

  return response; // Let the request continue
}

export const config = {
  matcher: ["/super-admin/dashboard/:path*"],
};
