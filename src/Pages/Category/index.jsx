import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
export default function Category() {
    const navigate = useNavigate();
  return (
  <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
     {/* Header */} <div className="mb-6"> 
      <div className="mb-2 flex items-center gap-2"> 
        <span className="h-2 w-2 rounded-full bg-[#00D9FF]
         shadow-[0_0_10px_#00D9FF]" /> 
         <span className="text-xs font-medium text-[#00D9FF]"> 
          مدیریت دسته‌بندی‌ها </span> 
          </div> <h1 className="text-2xl font-bold md:text-3xl">
             دسته‌بندی‌ها </h1> 
             <p className="mt-2 text-sm text-[#8A93AB]">
               مدیریت و ایجاد دسته‌بندی‌های فروشگاه </p>
                </div> {/* Content */}
                 <div className="rounded-2xl border
                  border-white/10 bg-[#131826]/70 p-6
                   backdrop-blur-xl"> 
                   <div className="mb-6 flex items-center
                    justify-between border-b border-white/5 pb-5"> 
                    <div> <h2 className="font-semibold text-[#EDEFF7]"> 
                      دسته‌بندی‌های فروشگاه </h2> 
                      <p className="mt-1 text-xs text-[#8A93AB]"> 
                        دسته‌بندی‌های محصولات را مدیریت کنید </p>
                        
                         </div> <button type="button" 
                         onClick={() => navigate("/dashboard/category/create")} 
                         className="rounded-xl bg-gradient-to-l from-[#6C5CE7]
                          to-[#00D9FF] px-5 py-2.5 text-sm font-semibold
                           text-white shadow-lg shadow-[#6C5CE7]/20 transition 
                           hover:brightness-110 active:scale-95" > 
                           ایجاد دسته‌بندی </button> </div> {/* Child Pages */}
                            <Outlet /> 
                            </div>
                             </div> 
                             
                            );

}
