import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Components/Loading";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function GetAllUser() {
     const { token } = useSelector((state) => state.auth);

  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `users?page=${page}&limit=${limit}&search=${search}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setUsers(result.data);
      setTotalCount(result.count);
    })();
  }, [page, limit, search]);
  if (!users) return <Loading />;

  const handleRoleChange = async (id, role) => {
    const result = await fetchData(`users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    if (result.success) {
      setUsers((prev) =>
        prev.map((item) => (item._id === id ? { ...item, role } : item))
      );
      notify("success", result.message);
    } else {
      notify("error", result.message);
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    const result = await fetchData(`users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive: !currentStatus }),
    });

    if (result.success) {
      setUsers((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isActive: !currentStatus } : item
        )
      );
      notify("success", result.message);
    } else {
      notify("error", result.message);
    }
  };
const items = users.map((user, index) => (
    <tr
      key={user._id}
      className="border-t border-white/5 hover:bg-[#131826]/60 transition"
    >
      <td className="px-4 py-3 text-[#8A93AB]">
        {(page - 1) * limit + index + 1}
      </td>

      <td className="px-4 py-3 font-medium text-[#EDEFF7]">
        {user.fullName || "-"}
      </td>

      <td className="px-4 py-3 text-[#8A93AB]" dir="ltr">
        {user.phoneNumber}
      </td>

      <td className="px-4 py-3">
        <select
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          className="rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-1.5 text-sm 
          text-[#EDEFF7] outline-none focus:border-[#6C5CE7]/50"
        >
          <option value="user">کاربر</option>
          <option value="admin">ادمین</option>
          <option value="superAdmin">مدیر کل</option>
        </select>
      </td>

     
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => handleToggleStatus(user._id, user.isActive)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
            user.isActive
              ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30 hover:bg-[#00D9FF]/20"
              : "bg-[#8A93AB]/10 text-[#8A93AB] border-[#8A93AB]/30 hover:bg-[#8A93AB]/20"
          }`}
        >
          {user.isActive ? "فعال" : "غیرفعال"}
        </button>
      </td>
    </tr>
  ));

  const totalPages = Math.ceil(totalCount / limit);
  return (
     <div dir="rtl" className="space-y-6 text-[#EDEFF7]">
      
      {/* کنترل‌ها */}
      <div className="flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="جستجوی کاربر..."
          className="w-64 rounded-lg border border-white/10 bg-[#0A0E1A]/70 px-3 py-2 text-sm 
          text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none focus:border-[#6C5CE7]/50"
        />
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
              <th className="px-4 py-3 font-medium">شماره موبایل</th>
              <th className="px-4 py-3 font-medium">نقش</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
            </tr>
          </thead>
           <tbody>
            {users.length > 0 ? (
              items
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#8A93AB]">
                  کاربری یافت نشد
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
