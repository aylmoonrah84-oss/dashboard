import React from "react";
import { Outlet ,useNavigate} from "react-router-dom";

export default function User() {
     const navigate = useNavigate();
  return (
    <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          <span className="text-xs font-medium text-[#00D9FF]">مدیریت کاربران</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">کاربران</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">مدیریت نقش و وضعیت کاربران فروشگاه</p>
      </div>

      {/* محتوا */}
      <div className="rounded-2xl border border-white/10 bg-[#131826]/70 p-6 backdrop-blur-xl">
        <div className="mb-6 border-b border-white/5 pb-5">
          <h2 className="font-semibold text-[#EDEFF7]">کاربران فروشگاه</h2>
          <p className="mt-1 text-xs text-[#8A93AB]">لیست کاربران، نقش و وضعیت آن‌ها را مدیریت کنید</p>
        </div>

        {/* صفحات فرزند */}
        <Outlet />
      </div>
    </div>
  );
}