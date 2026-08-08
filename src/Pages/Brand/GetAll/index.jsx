import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import fetchData from "../../../Utils/fetchData";
import { MdEdit } from "react-icons/md";

export default function GetAllBrand() {
  const { token } = useSelector((state) => state.auth);

  const [brands, setBrands] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `brands?page=${page}&limit=${limit}&sort=${sort}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setBrands(result.data);
      setTotalCount(result.count);
    })();
  }, [page, sort, limit]);

  if (!brands) return <Loading />;
const items=brands.map((brand, index) => (
              <tr
                key={brand._id}
                className="border-t border-gray-800 hover:bg-gray-800/60 transition"
              >
                <td className="px-4 py-3">
                  {(page - 1) * limit + index + 1}
                </td>

                <td className="px-4 py-3 font-medium">
                  {brand.title}
                </td>

                <td className="px-4 py-3">
                  {brand.image ? (
                    <img
                      src={import.meta.env.VITE_BASE_FILE + brand?.image}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                    />
                  ):'-'}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      brand.isPublished
                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                        : "bg-red-600/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {brand.isPublished ? "بله" :"خیر"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/brand/update/${brand._id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-lg"
                  >
                    <MdEdit />
                  </Link>
                </td>
              </tr>
            ));
  const totalPages = Math.ceil(totalCount / limit);
  return (
  <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
            <span className="text-xs font-medium text-[#00D9FF]">مدیریت برندها</span>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">لیست برندها</h1>
        </div>

        {/* کنترل تعداد نمایش */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#8A93AB]">تعداد در صفحه:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-1.5 text-sm 
            text-[#EDEFF7] outline-none focus:border-[#6C5CE7]/50"
          >
            <option value={10}>۱۰</option>
            <option value={20}>۲۰</option>
            <option value={50}>۵۰</option>
          </select>
        </div>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#131826]/70 backdrop-blur-xl">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="border-b border-white/10 text-[#8A93AB]">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">نام برند</th>
              <th className="px-4 py-3 font-medium">تصویر</th>
              <th className="px-4 py-3 font-medium">انتشار</th>
              <th className="px-4 py-3 font-medium">ویرایش</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              items
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#8A93AB]">
                  برندی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#8A93AB]">
            صفحه {page} از {totalPages} — مجموع {totalCount} برند
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-1.5 text-sm 
              text-[#EDEFF7] transition hover:border-[#6C5CE7]/50 
              disabled:cursor-not-allowed disabled:opacity-40"
            >
              قبلی
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-1.5 text-sm 
              text-[#EDEFF7] transition hover:border-[#6C5CE7]/50 
              disabled:cursor-not-allowed disabled:opacity-40"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
