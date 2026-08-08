import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
      const [title, setTitle] = useState("");
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const result = await fetchData(`categories?limit=${1000}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCategories(result.data);
    })();
  }, []);
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

    const result = await fetchData("categories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        image,
        isPublished,
        supCategoryId:subCategoryId
      }),
    });

    if (result.success) {
      notify("success", result.message);
      navigate("/dashboard/category");
    } else {
      notify("error", result.message);
    }
    setLoading(false);
  };
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
