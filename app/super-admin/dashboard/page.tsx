// // app/super-admin/dashboard/page.tsx
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase"; // Your SSR client
// import React from "react";

// const SuperDashBoard = async () => {
//   const supabase = await createClient(); // server-side client

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/super-admin/login");
//   }

//   return <div>SuperDashBoard</div>;
// };

// export default SuperDashBoard;

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase";

const SuperDashBoard = async () => {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  // if (error || !user) {
  //   console.log("Dashboard: No user found or error:", error?.message);
  //   redirect("/super-admin/login");
  // }

  // console.log("Dashboard: User authenticated:", user.id);
  return <div>SuperDashBoard</div>;
};

export default SuperDashBoard;
