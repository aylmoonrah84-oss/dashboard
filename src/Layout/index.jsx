import React from "react";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/Slices/AuthSlice";

export default function Layout() {
  const { token, user } = useSelector((state) => state.auth);

   const dispatch = useDispatch();

  if (!token || !["superAdmin", "admin"].includes(user?.role)) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0A0E1A] text-[#EDEFF7]">
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)]">

        <SideBar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-6">
          <div className="min-h-full rounded-2xl border border-[#6C5CE7]/10 bg-[#131826]/50 p-6 backdrop-blur-xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}