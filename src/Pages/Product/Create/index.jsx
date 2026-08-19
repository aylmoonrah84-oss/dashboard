import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const [brandsRes, categoriesRes] = await Promise.all([
        fetchData(`brands?limit=${1000}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
        fetchData(`categories?limit=${1000}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);

      setBrands(brandsRes.data);
      setCategories(categoriesRes.data);
    })();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image = "";

      if (img) {
        const formData = new FormData();
        formData.append("file", img);

        const uploadRes = await fetchData("upload", {
          method: "POST",
          body: formData,
          headers: { authorization: `Bearer ${token}` },
        });

        if (!uploadRes.success) {
          notify("error", uploadRes.message);
          return;
        }
        image = uploadRes.data;
      }

      const result = await fetchData("products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          stock: Number(stock),
          description,
          brandId,
          categoryId,
          image,
          isPublished,
        }),
      });

      if (result.success) {
        notify("success", result.message);
        navigate("/dashboard/product");
      } else {
        notify("error", result.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const brandItems = brands?.map((item) => (
    <option key={item._id} value={item._id}>
      {item.title}
    </option>
  ));

  const categoryItems = categories?.map((item) => (
    <option key={item._id} value={item._id}>
      {item.title}
    </option>
  ));

  return (
    <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          <span className="text-xs font-medium text-[#00D9FF]">مدیریت محصولات</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">ایجاد محصول جدید</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">اطلاعات محصول جدید را وارد کنید</p>
      </div>

      {/* فرم */}
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-[#131826]/70 p-6 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* نام محصول */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">نام محصول</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="نام محصول را وارد کنید..."
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition 
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>

          {/* قیمت و موجودی */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#8A93AB]">قیمت (تومان)</label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition 
                focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#8A93AB]">موجودی</label>
              <input
                type="number"
                required
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition 
                focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
              />
            </div>
          </div>

          {/* برند و دسته‌بندی */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#8A93AB]">برند</label>
              <select
                required
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] outline-none transition 
                focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
              >
                <option value="">یک برند انتخاب کنید</option>
                {brandItems}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#8A93AB]">دسته‌بندی</label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] outline-none transition 
                focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
              >
                <option value="">یک دسته‌بندی انتخاب کنید</option>
                {categoryItems}
              </select>
            </div>
          </div>

          {/* توضیحات */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">توضیحات</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات محصول را وارد کنید..."
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition resize-none
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>

          {/* تصویر محصول */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">تصویر محصول</label>
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
            <label className="text-sm text-[#8A93AB]">انتشار محصول</label>
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
            {loading ? "در حال ایجاد..." : "ایجاد محصول"}
          </button>
        </form>
      </div>
    </div>
  );
}