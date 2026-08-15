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
    <div>
      
    </div>
  );
}
