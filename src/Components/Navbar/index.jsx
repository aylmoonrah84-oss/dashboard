import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Store/Slices/AuthSlice'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <nav className="h-20 w-full border-b border-[#6C5CE7]/15 bg-[#0A0E1A]/95 px-6 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-4">

          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#6C5CE7]/30 bg-[#131826] shadow-[0_0_20px_rgba(108,92,231,0.12)]">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />

            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          </div>

          <div>
            <h2 className="text-base font-bold tracking-wide text-[#EDEFF7]">
              داشبورد ادمین
            </h2>

            <p className="mt-1 text-[11px] tracking-wider text-[#8A93AB]">
              ADMIN PANEL
            </p>
          </div>

        </div>


        {/* User Section */}
        <div className="flex items-center gap-5">

          <div className="text-right">

            <p className="text-sm text-[#8A93AB]">
              خوش اومدی{" "}
              <span className="font-semibold text-[#EDEFF7]">
                {user?.fullName || user?.phoneNumber}
              </span>
            </p>

            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#00D9FF]/15 bg-[#00D9FF]/5 px-2.5 py-1 text-[10px] font-medium text-[#00D9FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_7px_#00D9FF]" />
              {user?.role}
            </span>

          </div>


          {/* Divider */}
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#6C5CE7]/30 to-transparent" />


          {/* Logout */}
          <button
            onClick={() => dispatch(logout())}
            className="
              group flex items-center gap-2
              rounded-xl
              border border-[#6C5CE7]/20
              bg-[#131826]
              px-4 py-2.5
              text-sm text-[#8A93AB]
              shadow-[0_0_15px_rgba(108,92,231,0.05)]
              transition-all duration-300
              hover:border-[#00D9FF]/40
              hover:bg-[#6C5CE7]/10
              hover:text-[#00D9FF]
              hover:shadow-[0_0_20px_rgba(0,217,255,0.08)]
            "
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-0.5"
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

            <span>خروج</span>

          </button>

        </div>

      </div>
    </nav>
  )
}