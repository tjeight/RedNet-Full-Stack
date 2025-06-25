import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out." });
  response.cookies.set({
    name: "bb_admin_token",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
