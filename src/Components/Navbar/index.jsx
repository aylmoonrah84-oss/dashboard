import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slices/AuthSlice";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav
      dir="rtl"
      className="sticky top-0 z-50 h-[76px] w-full border-b border-white/[0.06] bg-[#0A0E1A]/90 px-4 backdrop-blur-2xl md:px-6"
    >
      <div className="flex h-full items-center justify-between">

        {/* ================= RIGHT : BRAND ================= */}
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#6C5CE7]/20 bg-[#131826] transition-all duration-300 hover:border-[#00D9FF]/40 hover:shadow-[0_0_25px_rgba(0,217,255,0.12)]">

            <img
              src={logo}
              alt="Pixion Tech"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Online Dot */}
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0A0E1A] bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          </div>

          {/* Brand */}
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold tracking-wide text-[#EDEFF7]">
              Pixion Tech
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-px w-4 bg-[#6C5CE7]" />

              <span className="text-[9px] tracking-[0.2em] text-[#8A93AB]">
                ADMIN PANEL
              </span>
            </div>
          </div>
        </div>


        {/* ================= LEFT : USER ================= */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* User Info */}
          <div className="flex items-center gap-3">

            {/* User Avatar */}
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#6C5CE7]/20 bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D9FF]/10 sm:flex">
              <span className="text-sm font-bold text-[#EDEFF7]">
                {(
                  user?.fullName ||
                  user?.phoneNumber ||
                  "A"
                ).charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="text-right">

              <p className="text-[10px] text-[#8A93AB]">
                خوش اومدی
              </p>

              <p className="mt-0.5 max-w-[130px] truncate text-xs font-semibold text-[#EDEFF7] md:max-w-none md:text-sm">
                {user?.fullName || user?.phoneNumber}
              </p>

            </div>

          </div>


          {/* Divider */}
          <div className="hidden h-9 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />


          {/* Role */}
          <div className="hidden items-center gap-2 rounded-xl border border-[#00D9FF]/10 bg-[#00D9FF]/5 px-3 py-2 sm:flex">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D9FF] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D9FF]" />
            </span>

            <span className="text-[10px] font-medium text-[#00D9FF]">
              {user?.role}
            </span>

          </div>


          {/* Logout */}
          <button
            onClick={() => dispatch(logout())}
            className="
              group flex items-center gap-2
              rounded-xl
              border border-white/[0.08]
              bg-[#131826]
              px-3 py-2.5
              text-xs font-medium
              text-[#8A93AB]
              transition-all duration-300

              hover:border-red-400/20
              hover:bg-red-400/5
              hover:text-red-400
              hover:shadow-[0_0_20px_rgba(248,113,113,0.08)]

              active:scale-95
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 12h9m0 0l-3-3m3 3l-3 3"
              />
            </svg>

            <span className="hidden sm:inline">
              خروج
            </span>

          </button>

        </div>
      </div>
    </nav>
  );
}