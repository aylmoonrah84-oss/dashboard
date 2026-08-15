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
    <div>
      
    </div>
  );
}
