// utils/getAdminFromToken.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getAdminFromToken() {
  const token = (await cookies()).get("bb_admin_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);

  return payload; // includes: id, email, role, blood_bank_id
}
