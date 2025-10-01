// import { NextResponse, type NextRequest } from "next/server";
// import { createClient } from "./utils/supabase/middleware";
// import { jwtVerify } from "jose";

// // Function to get secret key
// const getJwtSecret = () => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) throw new Error("JWT_SECRET is not defined in .env");
//   return new TextEncoder().encode(secret); // encode for jose
// };

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // ✅ Skip middleware for login pages
//   if (
//     path.startsWith("/super-admin/login") ||
//     path.startsWith("/blood-bank-admins/login")
//   ) {
//     return NextResponse.next();
//   }

//   // ✅ Protect Super Admin Routes (No changes here)
//   if (path.startsWith("/super-admin/dashboard")) {
//     const { supabase, response } = createClient(request);
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       return NextResponse.redirect(new URL("/super-admin/login", request.url));
//     }

//     return response;
//   }

//   // ✅ Protect Blood Bank Admin Routes (JWT via jose)
//   if (path.startsWith("/blood-bank-admins/dashboard")) {
//     const token = request.cookies.get("bb_admin_token")?.value;

//     if (!token) {
//       return NextResponse.redirect(
//         new URL("/blood-bank-admins/login", request.url)
//       );
//     }

//     try {
//       await jwtVerify(token, getJwtSecret());
//       return NextResponse.next(); // token is valid
//     } catch (err) {
//       console.error("JWT verification failed:", err);
//       return NextResponse.redirect(
//         new URL("/blood-bank-admins/login", request.url)
//       );
//     }
//   }

//   return NextResponse.next(); // allow all other routes
// }

// // ✅ Matcher config
// export const config = {
//   matcher: [
//     "/super-admin/dashboard/:path*",
//     "/blood-bank-admins/dashboard/:path*",
//     "/super-admin/login",
//     "/blood-bank-admins/login",
//   ],
// };

import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in .env");
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow login pages to be accessed without auth
  if (
    path.startsWith("/super-admin/login") ||
    path.startsWith("/blood-bank-admins/login")
  ) {
    return NextResponse.next();
  }

  // Protect Super Admin Dashboard
  if (path.startsWith("/super-admin/dashboard")) {
    const token = request.cookies.get("super_admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/super-admin/login", request.url));
    }
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch (err) {
      console.error("Super Admin JWT verification failed:", err);
      return NextResponse.redirect(new URL("/super-admin/login", request.url));
    }
  }

  // Protect Blood Bank Admin Dashboard
  if (path.startsWith("/blood-bank-admins/dashboard")) {
    const token = request.cookies.get("bb_admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/blood-bank-admins/login", request.url));
    }
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch (err) {
      console.error("Blood Bank Admin JWT verification failed:", err);
      return NextResponse.redirect(new URL("/blood-bank-admins/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/super-admin/dashboard/:path*",
    "/blood-bank-admins/dashboard/:path*",
    "/super-admin/login",
    "/blood-bank-admins/login",
  ],
};
