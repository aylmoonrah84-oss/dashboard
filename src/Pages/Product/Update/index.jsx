import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";

export default function UpdateProduct() {
    const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const [brandsRes, categoriesRes, productRes] = await Promise.all([
        fetchData(`brands?limit=${1000}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
        fetchData(`categories?limit=${1000}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
        fetchData(`products/${id}`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);
       setBrands(brandsRes.data);
      setCategories(categoriesRes.data);

      const product = productRes.data[0];
      setTitle(product.title);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description || "");
      setIsPublished(product.isPublished);
      setBrandId(product.brandId?._id || "");
      setCategoryId(product.categoryId?._id || "");

      if (product.image) {
        setImg([
          {
            id: 1,
            remove: false,
            local: false,
            data: product.image,
          },
        ]);
      }
    })();
    }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image = "";

      for (let imgItem of img) {
        if (imgItem.local && imgItem.remove) continue;
         if (imgItem.local && !imgItem.remove) {
          const formData = new FormData();
          formData.append("file", imgItem.data);

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
          continue;
        }

        if (!imgItem.local && !imgItem.remove) {
          image = imgItem.data;
          continue;
        }
         if (!imgItem.local && imgItem.remove) {
          await fetchData("upload", {
            method: "DELETE",
            body: JSON.stringify({ filename: imgItem.data }),
            headers: { authorization: `Bearer ${token}` },
          });
        }
      }

      const result = await fetchData(`products/${id}`, {
        method: "PATCH",
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
  const handleChangeImage = (e) => {
    const activeImage = img?.find((item) => !item.remove);
    if (activeImage) {
      notify("error", "فقط یک تصویر مجاز است");
      return;
    }

    const newId = img?.at(-1)?.id ? img.at(-1).id + 1 : 1;

    setImg([
      ...img,
      {
        id: newId,
        remove: false,
        local: true,
        data: e.target.files[0],
      },
    ]);
  };

  const handleRemoveImg = (id) => {
    setImg((prev) =>
      prev.map((item) => (item.id === id ? { ...item, remove: true } : item))
    );
  };
   const imgItems = img
    ?.filter((item) => !item.remove)
    ?.map((imgM) => (
      <div key={imgM.id} className="relative w-40 h-40">
        <img
          src={
            imgM.local
              ? URL.createObjectURL(imgM.data)
              : import.meta.env.VITE_BASE_FILE + imgM.data
          }
          className="w-full h-full object-cover rounded-xl border border-white/10"
        />
        <button
          type="button"
          onClick={() => handleRemoveImg(imgM.id)}
          className="absolute top-2 left-2 bg-red-600/90 hover:bg-red-700 
          text-white p-1 rounded-full shadow transition"
        >
          <IoMdClose />
        </button>
      </div>
    ));
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
        <h1 className="text-2xl font-bold md:text-3xl">ویرایش محصول</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">اطلاعات محصول را ویرایش کنید</p>
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
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] outline-none transition 
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
                className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
                text-[#EDEFF7] outline-none transition 
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
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] outline-none transition resize-none
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>

          {/* تصویر محصول */}
           <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">تصویر محصول</label>

            {imgItems?.length > 0 ? (
              <div className="flex flex-wrap gap-4">{imgItems}</div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                className="block w-full cursor-pointer text-sm text-[#8A93AB] 
                file:ml-4 file:rounded-lg file:border-0 file:bg-[#6C5CE7] 
                file:px-4 file:py-2 file:text-sm file:font-medium file:text-white 
                hover:file:bg-[#5B4BD5]"
              />
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
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </form>
      </div>
       </div>
  );
}
