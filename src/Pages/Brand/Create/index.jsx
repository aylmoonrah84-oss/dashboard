import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import fetchData from "../../../Utils/fetchData"
 import notify from "../../../Utils/notify"
 import { FaArrowRight, FaImage, FaPlus } from "react-icons/fa";
 
export default function CreateBrand() {
const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let image = "";

    if (img) {
      const formData = new FormData();
      formData.append("file", img);

      const uploadRes = await fetchData("upload", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (uploadRes.success) {
        image = uploadRes.data;
      } else {
        setLoading(false);
        return notify("error", uploadRes.message);
      }
    }

    const result = await fetchData("brands", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        image,
        isPublished,
      }),
    });

    if (result.success) {
      notify("success", result.message);
      navigate("/dashboard/brand");
    } else {
      notify("error", result.message);
    }
    setLoading(false);
  };
console.log("CreateBrand rendered");
console.log("token:", token);
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
              مدیریت برندها
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#EDEFF7]">
            افزودن برند
          </h1>

          <p className="mt-2 text-sm text-[#8A93AB]">
            یک برند جدید به فروشگاه اضافه کنید
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/brand")}
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-[#131826] px-4 py-2.5 text-sm text-[#8A93AB] transition-all duration-300 hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/10 hover:text-[#EDEFF7]"
        >
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />

          بازگشت
        </button>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#131826]/70 backdrop-blur-xl">

        {/* Card Header */}
        <div className="border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-[#6C5CE7]">
              <FaPlus />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#EDEFF7]">
                اطلاعات برند
              </h2>

              <p className="mt-1 text-xs text-[#8A93AB]">
                اطلاعات مورد نیاز را وارد کنید
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-xs font-medium text-[#8A93AB]"
            >
              نام برند
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً Nike"
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-sm text-[#EDEFF7] outline-none transition-all duration-300 placeholder:text-[#8A93AB]/40 focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-xs font-medium text-[#8A93AB]"
            >
              تصویر برند
            </label>

            <label
              htmlFor="image"
              className="group flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#6C5CE7]/30 bg-[#0A0E1A]/70 px-5 py-6 transition-all duration-300 hover:border-[#00D9FF]/40 hover:bg-[#6C5CE7]/5"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C5CE7]/10 text-[#6C5CE7] transition-all duration-300 group-hover:bg-[#00D9FF]/10 group-hover:text-[#00D9FF]">
                <FaImage />
              </div>

              {img ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-[#EDEFF7]">
                    {img.name}
                  </p>

                  <p className="mt-1 text-xs text-[#8A93AB]">
                    تصویر انتخاب شد
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-[#EDEFF7]">
                    تصویر برند را انتخاب کنید
                  </p>

                  <p className="mt-1 text-xs text-[#8A93AB]">
                    برای انتخاب تصویر کلیک کنید
                  </p>
                </div>
              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setImg(e.target.files?.[0] || null);
                }}
              />
            </label>
          </div>

          {/* Published */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0A0E1A]/50 p-4">
            <div>
              <p className="text-sm font-medium text-[#EDEFF7]">
                انتشار برند
              </p>

              <p className="mt-1 text-xs text-[#8A93AB]">
                برند در فروشگاه نمایش داده شود
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                isPublished
                  ? "bg-[#6C5CE7] shadow-[0_0_15px_rgba(108,92,231,0.25)]"
                  : "bg-[#8A93AB]/20"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                  isPublished
                    ? "right-1"
                    : "right-6"
                }`}
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/dashboard/brand")}
              className="rounded-xl border border-white/10 bg-[#0A0E1A] px-6 py-3 text-sm font-medium text-[#8A93AB] transition-all duration-300 hover:border-white/20 hover:text-[#EDEFF7]"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  <FaPlus className="text-xs" />
                  افزودن برند
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
