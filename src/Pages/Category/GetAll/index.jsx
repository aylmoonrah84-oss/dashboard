import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fetchData from '../../../Utils/fetchData';
import Loading from '../../../Components/Loading';
import notify from '../../../Utils/notify';
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function GetAllCategory() {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  useEffect(()=>{
    (async()=>{
      const result=await fetchData(`categories?page=${page}&limit=${limit}&sort=${sort}`,
        {
          method:"GET",
          headers:{
            authorization:`Bearer ${token}`
          },
        }
      );
      setCategories(result.data);
      setTotalCount(result.count);
    })();
  },[page,sort,limit]);
  if(!categories)return <Loading/>;

  const handleRemove=async(id)=>{
    const result=await fetchData(`categories/${id}`,{
      method:"DELETE",
      headers:{
        authorization:`Bearer ${token}`,
      },
    });
    if(result.success){
      const newCat=categories?.filter((item)=>item._id !=id);
      setCategories(newCat);
      notify("success",result.message);

    }else{
      notify("error",result.message);
    }
  };
const items=categories.map((category,index)=>(
  <tr key={category._id} className='border-t border-white/5 hover:bg-[#131826]/60 transition'>
 <td className="px-4 py-3 text-[#8A93AB]">
        {(page - 1) * limit + index + 1}
      </td>

      <td className="px-4 py-3 font-medium text-[#EDEFF7]">{category.title}</td>

      <td className="px-4 py-3">
        {category.image ? (
          <img
            src={import.meta.env.VITE_BASE_FILE + category.image}
            alt={category.title}
            className="w-12 h-12 object-cover rounded-lg border border-white/10"
          />
        ) : (
          "-"
        )}
      </td>
      <td className="px-4 py-3 font-medium text-[#8A93AB]">
        {category?.supCategoryId ? category.supCategoryId.title : "-"}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            category.isPublished
              ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30"
              : "bg-[#8A93AB]/10 text-[#8A93AB] border-[#8A93AB]/30"
          }`}
        >
          {category.isPublished ? "بله" : "خیر"}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-4 items-center">
        <Link
          to={`/dashboard/category/update/${category._id}`}
          className="text-[#6C5CE7] hover:text-[#00D9FF] text-lg transition-colors"
        >
          <MdEdit />
        </Link>
        <button
          type="button"
          onClick={() => handleRemove(category._id)}
          className="text-[#6C5CE7] hover:text-red-400 text-lg transition-colors"
        >
          <MdDeleteForever />
        </button>
      </td>
  </tr>
));
const totalPages = Math.ceil(totalCount / limit);

  return (
   <div dir="rtl" className="space-y-6 text-[#EDEFF7]">
      
      {/* کنترل‌ها */}
      <div className="flex gap-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-2 text-sm 
          text-[#EDEFF7] outline-none focus:border-[#6C5CE7]/50"
        >
          <option value="-createdAt">جدیدترین</option>
          <option value="createdAt">قدیمی‌ترین</option>
          <option value="title">الف تا ی</option>
          <option value="-title">ی تا الف</option>
        </select>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-2 text-sm 
          text-[#EDEFF7] outline-none focus:border-[#6C5CE7]/50"
        >
          <option value={10}>۱۰</option>
          <option value={20}>۲۰</option>
          <option value={50}>۵۰</option>
        </select>
      </div>
 {/* جدول */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#131826]/70 backdrop-blur-xl">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="border-b border-white/10 text-[#8A93AB]">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">نام</th>
              <th className="px-4 py-3 font-medium">تصویر</th>
              <th className="px-4 py-3 font-medium">دسته‌بندی والد</th>
              <th className="px-4 py-3 font-medium">انتشار</th>
              <th className="px-4 py-3 font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              items
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#8A93AB]">
                  دسته‌بندی‌ای یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 
            bg-[#0A0E1A]/70 text-sm text-[#EDEFF7] transition 
            hover:border-[#6C5CE7]/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaChevronRight />
            قبلی
          </button>
           <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-2 rounded-lg text-sm transition ${
                  page === num
                    ? "bg-[#6C5CE7] text-white"
                    : "border border-white/10 bg-[#0A0E1A]/70 text-[#EDEFF7] hover:border-[#6C5CE7]/50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
<button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 
            bg-[#0A0E1A]/70 text-sm text-[#EDEFF7] transition 
            hover:border-[#6C5CE7]/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            بعدی
            <FaChevronLeft />
          </button>
        </div>
      )}
    </div>
  );
}
