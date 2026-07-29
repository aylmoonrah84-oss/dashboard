
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaTags,
  FaLayerGroup,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

export default function SideBar() {
  const linkClass =
    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#8A93AB] transition-all duration-300 hover:bg-[#6C5CE7]/10 hover:text-[#EDEFF7] hover:shadow-[0_0_20px_rgba(108,92,231,0.08)]";

  const activeClass =
    "border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 text-[#EDEFF7] shadow-[0_0_20px_rgba(108,92,231,0.10)]";

  return (
    <aside
      dir="rtl"
      className="min-h-[calc(100vh-80px)] w-64 shrink-0 border-l border-[#6C5CE7]/10 bg-[#0A0E1A] px-4 py-6"
    >
      {/* Sidebar Header */}
      <div className="mb-7 px-3">
        <h3 className="text-[11px] font-semibold tracking-[0.2em] text-[#8A93AB]">
          منو داشبورد        </h3>

        <div className="mt-3 h-px bg-gradient-to-l from-[#6C5CE7]/30 via-[#00D9FF]/10 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaHome
            className="shrink-0 text-base text-[#6C5CE7] transition-all duration-300 group-hover:text-[#00D9FF] group-hover:drop-shadow-[0_0_6px_#00D9FF]"
          />

          <span>خانه</span>
        </NavLink>

        <NavLink
          to="/dashboard/brand"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaTags
            className="shrink-0 text-base text-[#6C5CE7] transition-all duration-300 group-hover:text-[#00D9FF] group-hover:drop-shadow-[0_0_6px_#00D9FF]"
          />

          <span>برند ها</span>
        </NavLink>

        <NavLink
          to="/dashboard/category"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaLayerGroup
            className="shrink-0 text-base text-[#6C5CE7] transition-all duration-300 group-hover:text-[#00D9FF] group-hover:drop-shadow-[0_0_6px_#00D9FF]"
          />

          <span>دسته بندی ها</span>
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaBoxOpen
            className="shrink-0 text-base text-[#6C5CE7] transition-all duration-300 group-hover:text-[#00D9FF] group-hover:drop-shadow-[0_0_6px_#00D9FF]"
          />

          <span>محصولات</span>
        </NavLink>

        <NavLink
          to="/dashboard/user"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaUsers
            className="shrink-0 text-base text-[#6C5CE7] transition-all duration-300 group-hover:text-[#00D9FF] group-hover:drop-shadow-[0_0_6px_#00D9FF]"
          />

          <span>کاربران</span>
        </NavLink>

      </nav>
    </aside>
  );
}

