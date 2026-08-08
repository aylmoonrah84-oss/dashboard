import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import fetchData from "../../../Utils/fetchData";
import { useSelector } from "react-redux";
import notify from "../../../Utils/notify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBrand() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchData(`brands/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const brand = result.data[0];
      setTitle(brand.title);
      setIsPublished(brand.isPublished);

      if (brand.image) {
        setImg([
          {
            id: 1,
            remove: false,
            local: false,
            data: brand.image,
          },
        ]);
      }
    })();
  }, [id]);

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

      const result = await fetchData(`brands/${id}`, {
        method: "PATCH",
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
    } finally {
      setLoading(false);
    }
  };



  const handleChangeImage = (e) => {
    const activeImage = img?.find((item) => !item.remove);
    if (activeImage) {
      notify("error", "Only one image allowed");
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
      prev.map((item) =>
        item.id === id ? { ...item, remove: true } : item
      )
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
          className="w-full h-full object-cover rounded-xl border border-gray-700"
        />
        <button
          type="button"
          onClick={() => handleRemoveImg(imgM.id)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 
          text-white p-1 rounded-full shadow transition"
        >
          <IoMdClose />
        </button>
      </div>
    ));

  return (
   <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          <span className="text-xs font-medium text-[#00D9FF]">مدیریت برندها</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">ویرایش برند</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">اطلاعات برند را ویرایش کنید</p>
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
            <label className="text-sm text-[#8A93AB]">انتشار برند</label>
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-l from-[#6C5CE7] to-[#00D9FF] py-3.5 
            text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition 
            hover:brightness-110 active:scale-[0.98]"
          >
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  )
}
