import React from 'react';

export default function UpdateCategory() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [img, setImg] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const resultCn = await fetchData(`categories?limit=${1000}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setCategories(resultCn.data);
      const result = await fetchData(`Categories/${id}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const category = result.data[0];
      setTitle(category.title);
      setIsPublished(category.isPublished);
      setSubCategoryId(category.supCategoryId._id);

      if (category.image) {
        setImg([
          {
            id: 1,
            remove: false,
            local: false,
            data: category.image,
          },
        ]);
      }
    })();
  }, [id]);
 const handleSubmit = async (e) => {
    e.preventDefault();

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

        if (!uploadRes.success) return notify("error", uploadRes.message);

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

    const result = await fetchData(`categories/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, image, isPublished, supCategoryId: subCategoryId }),
    });
if (result.success) {
      notify("success", result.message);
      navigate("/dashboard/category");
    } else {
      notify("error", result.message);
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
  return (
    <div dir="rtl" className="w-full min-w-0 text-[#EDEFF7]">
      
      {/* هدر */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
          <span className="text-xs font-medium text-[#00D9FF]">مدیریت دسته‌بندی‌ها</span>
        </div>
        <h1 className="text-2xl font-bold md:text-3xl">ویرایش دسته‌بندی</h1>
        <p className="mt-2 text-sm text-[#8A93AB]">اطلاعات دسته‌بندی را ویرایش کنید</p>
      </div>

      {/* فرم */}
        <div className="max-w-3xl rounded-2xl border border-white/10 bg-[#131826]/70 p-6 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* نام دسته‌بندی */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">نام دسته‌بندی</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="نام دسته‌بندی را وارد کنید..."
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] placeholder-[#8A93AB]/60 outline-none transition 
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            />
          </div>
           {/* دسته‌بندی والد */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">دسته‌بندی والد</label>
            <select
              name="subCategoryId"
              onChange={(e) => setSubCategoryId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm 
              text-[#EDEFF7] outline-none transition 
              focus:border-[#6C5CE7]/50 focus:ring-2 focus:ring-[#6C5CE7]/10"
            >
              <option value="">یک دسته‌بندی انتخاب کنید</option>
              {categoryItems}
            </select>
          </div>
  {/* تصویر دسته‌بندی */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#8A93AB]">تصویر دسته‌بندی</label>

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
            <label className="text-sm text-[#8A93AB]">انتشار دسته‌بندی</label>
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
  );
}
