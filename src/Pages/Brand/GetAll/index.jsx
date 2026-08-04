import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import fetchData from "../../../Utils/fetchData";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

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

  return (
    <div
      dir="rtl"
      className="min-h-full w-full text-[#EDEFF7]"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />

            <span className="text-xs text-[#8A93AB]">
              مدیریت فروشگاه
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#EDEFF7]">
            مدیریت برندها
          </h1>

          <p className="mt-2 text-sm text-[#8A93AB]">
            مشاهده و مدیریت برندهای فروشگاه
          </p>
        </div>

        <Link
          to="/dashboard/brand/create"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition-all duration-300 hover:brightness-110"
        >
          <FaPlus className="text-xs" />
          افزودن برند
        </Link>
      </div>

      {/* Content Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 backdrop-blur-xl">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7]">
              <FaSearch className="text-sm" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#EDEFF7]">
                لیست برندها
              </p>

              <p className="mt-1 text-xs text-[#8A93AB]">
                {totalCount} برند ثبت شده
              </p>
            </div>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-2.5 text-sm text-[#EDEFF7] outline-none transition focus:border-[#6C5CE7]/50"
          >
            <option value="-createdAt">جدیدترین</option>
            <option value="createdAt">قدیمی‌ترین</option>
            <option value="title">نام برند A-Z</option>
            <option value="-title">نام برند Z-A</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-right">

            <thead className="bg-[#0A0E1A]/50">
              <tr className="border-b border-white/[0.06]">
                <th className="px-6 py-4 text-xs font-medium text-[#8A93AB]">
                  #
                </th>

                <th className="px-6 py-4 text-xs font-medium text-[#8A93AB]">
                  برند
                </th>

                <th className="px-6 py-4 text-xs font-medium text-[#8A93AB]">
                  وضعیت
                </th>

                <th className="px-6 py-4 text-xs font-medium text-[#8A93AB]">
                  تاریخ ایجاد
                </th>

                <th className="px-6 py-4 text-xs font-medium text-[#8A93AB]">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {brands?.map((brand, index) => (
                <tr
                  key={brand._id}
                  className="border-b border-white/[0.04] transition hover:bg-[#6C5CE7]/5"
                >
                  <td className="px-6 py-4 text-sm text-[#8A93AB]">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#6C5CE7]/20 bg-[#0A0E1A]">
                        {brand.image ? (
                          <img
                            src={brand.image}
                            alt={brand.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-[#6C5CE7]">
                            {brand.title?.charAt(0)}
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-medium text-[#EDEFF7]">
                        {brand.title}
                      </span>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] ${
                        brand.isPublished
                          ? "border-[#00D9FF]/20 bg-[#00D9FF]/5 text-[#00D9FF]"
                          : "border-[#8A93AB]/20 bg-[#8A93AB]/5 text-[#8A93AB]"
                      }`}
                    >
                      {brand.isPublished ? "منتشر شده" : "غیرفعال"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-[#8A93AB]">
                    {brand.createdAt
                      ? new Date(brand.createdAt).toLocaleDateString("fa-IR")
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      <Link
                        to={`/dashboard/brand/update/${brand._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 text-[#6C5CE7] transition hover:bg-[#6C5CE7]/15"
                      >
                        <FaEdit className="text-xs" />
                      </Link>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/10 bg-red-400/5 text-red-300 transition hover:bg-red-400/10"
                      >
                        <FaTrash className="text-xs" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {brands?.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-[#8A93AB]">
              هنوز هیچ برندی ثبت نشده است.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
