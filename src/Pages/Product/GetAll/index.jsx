import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { MdEdit, MdDeleteForever } from "react-icons/md";

export default function GetAllProduct() {
    const { token } = useSelector((state) => state.auth);

  const [products, setProducts] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `products?page=${page}&limit=${limit}&sort=${sort}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setProducts(result.data);
      setTotalCount(result.count);
    })();
  }, [page, sort, limit]);

  if (!products) return <Loading />;
const handleRemove = async (id) => {
    const result = await fetchData(`products/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (result.success) {
      const newProducts = products?.filter((item) => item._id != id);
      setProducts(newProducts);
      notify("success", result.message);
    } else {
      notify("error", result.message);
    }
  };

  const items = products.map((product, index) => (
    <tr
      key={product._id}
      className="border-t border-white/5 hover:bg-[#131826]/60 transition"
    >
      <td className="px-4 py-3 text-[#8A93AB]">
        {(page - 1) * limit + index + 1}
      </td>
      <td className="px-4 py-3 font-medium text-[#EDEFF7]">{product.title}</td>

      <td className="px-4 py-3">
        {product.image ? (
          <img
            src={import.meta.env.VITE_BASE_FILE + product.image}
            alt={product.title}
            className="w-12 h-12 object-cover rounded-lg border border-white/10"
          />
        ) : (
          "-"
        )}
      </td>

      <td className="px-4 py-3 text-[#8A93AB]">
        {product.price ? `${product.price.toLocaleString()} تومان` : "-"}
      </td>

      <td className="px-4 py-3 text-[#8A93AB]">{product.stock ?? "-"}</td>
      <td className="px-4 py-3 font-medium text-[#8A93AB]">
        {product?.brandId ? product.brandId.title : "-"}
      </td>

      <td className="px-4 py-3 font-medium text-[#8A93AB]">
        {product?.categoryId ? product.categoryId.title : "-"}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            product.isPublished
              ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30"
              : "bg-[#8A93AB]/10 text-[#8A93AB] border-[#8A93AB]/30"
          }`}
        >
             {product.isPublished ? "بله" : "خیر"}
        </span>
      </td>

      <td className="px-4 py-3 flex gap-4 items-center">
        <Link
          to={`/dashboard/product/update/${product._id}`}
          className="text-[#6C5CE7] hover:text-[#00D9FF] text-lg transition-colors"
        >
          <MdEdit />
        </Link>
        <button
          type="button"
          onClick={() => handleRemove(product._id)}
          className="text-[#6C5CE7] hover:text-red-400 text-lg transition-colors"
        >
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  ));
    const totalPages = Math.ceil(totalCount / limit);
  return (
    <div>
      
    </div>
  );
}
