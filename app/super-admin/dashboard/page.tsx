import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase";

const SuperDashBoard = async () => {
  return (
    <div className="flex justify-center text-center items-center h-screen bg-white">
      <div className="border rounded max-w-2xl p-4 shadow-2xl">
        <p>Requests</p>
      </div>
    </div>
  );
};

export default SuperDashBoard;
