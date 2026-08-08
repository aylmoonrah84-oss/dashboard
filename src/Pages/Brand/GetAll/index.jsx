import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import fetchData from "../../../Utils/fetchData";
import { MdEdit } from "react-icons/md";

export default function GetAllBrand() {
  const { token } = useSelector((state) => state.auth);

  const [brands, setBrands] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await fetchData(
        `brands?page=${page}&limit=${limit}&sort=${sort}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setBrands(result.data);
      setTotalCount(result.count);
    })();
  }, [page, sort, limit]);

  if (!brands) return <Loading />;
const items=brands.map((brand, index) => (
              <tr
                key={brand._id}
                className="border-t border-gray-800 hover:bg-gray-800/60 transition"
              >
                <td className="px-4 py-3">
                  {(page - 1) * limit + index + 1}
                </td>

                <td className="px-4 py-3 font-medium">
                  {brand.title}
                </td>

                <td className="px-4 py-3">
                  {brand.image ? (
                    <img
                      src={import.meta.env.VITE_BASE_FILE + brand?.image}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                    />
                  ):'-'}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      brand.isPublished
                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                        : "bg-red-600/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {brand.isPublished ? "Yes" : "No"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/brand/update/${brand._id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-lg"
                  >
                    <MdEdit />
                  </Link>
                </td>
              </tr>
            ));
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <div>
      
    </div>
  )
}
