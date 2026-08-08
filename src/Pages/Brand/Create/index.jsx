import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";

export default function CreateBrand() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let image = "";

    try {
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
          notify("error", uploadRes.message);
          setLoading(false);
          return;
        }
      }

      const result = await fetchData("brands", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, image, isPublished }),
      });

      if (result.success) {
        notify("success", result.message);
        navigate("/dashboard/brand");
      } else {
        notify("error", result.message);
      }
    } catch (error) {
      notify("error", "خطایی رخ داد، لطفاً دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          <span className="text-xs font-medium text-[#00D9FF]">مدیریت برندها</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">ایجاد برند جدید</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">اطلاعات برند جدید را وارد کنید</p>
      </div>

      {/* فرم */}
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-[#131826]/70 p-6 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* نام برند */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">نام برند</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="نام برند را وارد کنید..."
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition 
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>

          {/* تصویر برند */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">تصویر برند</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="block w-full cursor-pointer text-sm text-[#8A93AB] 
              file:ml-4 file:rounded-lg file:border-0 file:bg-[#6C5CE7] 
              file:px-4 file:py-2 file:text-sm file:font-medium file:text-white 
              hover:file:bg-[#5B4BD5]"
            />
            {img && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(img)}
                  alt="پیش‌نمایش"
                  className="h-32 w-32 rounded-xl border border-white/10 object-cover"
                />
              </div>
            )}
          </div>

          {/* انتشار */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-5 w-5 cursor-pointer accent-[#6C5CE7]"
            />
            <label className="text-sm text-[#8A93AB]">انتشار برند</label>
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] py-3.5 
            text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition 
            hover:brightness-110 active:scale-[0.98] 
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "در حال ایجاد..." : "ایجاد برند"}
          </button>
        </form>
      </div>
    </div>
  );
}