
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function Brand() {
  const navigate = useNavigate();

  return (
    
 <div dir="rtl" className=" min-h-screen bg-[#0A0E1A] text-[#EDEFF7] p-6 space-y-6">
      
      <div className="flex items-center justify-between">
        <h2
          role="button"
          tabIndex={0}
          onClick={() => navigate("/dashboard/brand")}
          className="text-2xl font-bold tracking-wide cursor-pointer text-[#EDEFF7] 
          hover:text-[#00D9FF] transition-colors"
        >
          برند ها
        </h2>

        <button
          onClick={() => navigate("/dashboard/brand/create")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-[#6C5CE7] hover:bg-[#6C5CE7]/90
          shadow-lg shadow-[#6C5CE7]/30 hover:shadow-[#00D9FF]/40
          transition-all duration-200 active:scale-95
          text-[#EDEFF7] font-medium"
        >
          <FaPlus size={14} />
          ایجاد برند
        </button>
      </div>

      <div className="bg-[#131826]/80 backdrop-blur-xl border border-[#8A93AB]/10 
      rounded-2xl p-6 shadow-2xl shadow-black/40">
        <Outlet />
      </div>
    </div>
  );
}