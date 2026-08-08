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

        if (!uploadRes.success)
          return notify("error", uploadRes.message);

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
    <div>
      
    </div>
  )
}
