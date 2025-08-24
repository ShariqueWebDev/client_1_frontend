"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetAdminProductsQuery,
  useDeleteProductMutation,
  useGetLowStockProductsQuery,
  productApi,
} from "../../redux/api/productApi";
import UpdateFormModal from "../DashboardComponents/CTA/UpdateFormModal";
import { useDispatch } from "react-redux";
import { staticApi } from "../../redux/api/staticApi";
import { useGetAdminOrderQuery } from "../../redux/api/orderApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import CTA from "./CTA/CTA";
import { useDebounce } from "./OrderTable";

export default function LowStockTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useGetLowStockProductsQuery({
    isAdmin: "68ab4eb97bc039b01d4e8d23",
    threshold: 5,
    page, // 👈 yaha state ka value dena hai
    limit: 10,
    search: debounceSearch,
  });

  console.log(data, "low stock product......");
  console.log(search, debounceSearch, isError, "search vlaue product......");

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct({ id, isAdmin: "68ab4eb97bc039b01d4e8d23" }).unwrap();
      toast.success("Product deleted successfully!");
      dispatch(staticApi.util.invalidateTags(["Statics"]));
      dispatch(productApi.util.invalidateTags(["Product"]));
      dispatch(productApi.util.invalidateTags(["Products"]));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (isLoading)
    return (
      <div>
        <LoaderComponent status="Product list loading..." />
      </div>
    );

  const products = data?.products;
  const totalPages = data?.totalPages;

  return (
    <div className="p-6">
      {/* Search */}
      <div className="flex justify-between mb-4 gap-5">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 focus:outline-none text-xs px-3 py-2 rounded-lg max-w-64 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-w-[150px] w-full">
          <CTA btnLable={"Add New Product"} table={true} />
        </div>
      </div>

      {/* Table */}
      {/* Table */}
      <div className="overflow-x-auto w-full">
        {isError ? (
          <div className="text-center py-20 text-sm">Something went wrong!</div>
        ) : products?.length === 0 && debounceSearch ? (
          // 🔹 Search ke liye
          <>
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Name
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Category
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Price
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Stock
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            <div className="lg:border border-gray-300 text-center text-sm py-20">
              Search not found!
            </div>
          </>
        ) : products?.length === 0 ? (
          // 🔹 Normal empty state
          <>
            <table className="w-full text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Name
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Category
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Price
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Stock
                  </th>
                  <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            <div className="lg:border border-gray-300 text-center text-sm py-20">
              No Product Available
            </div>
          </>
        ) : (
          // 🔹 Products table
          <table className="min-w-full border-gray-200 rounded-lg text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                  Name
                </th>
                <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                  Category
                </th>
                <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                  Price
                </th>
                <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                  Stock
                </th>
                <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-2 max-sm:min-w-[150px] py- border border-gray-300">
                    {p.name}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px] py- border border-gray-300">
                    {p.category}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px] py- border border-gray-300">
                    ₹{p.price}
                  </td>
                  <td
                    className={`${
                      p.stock <= 5 ? "text-red-500 font-semibold" : "text-black"
                    } px-2 max-sm:min-w-[150px] py- border border-gray-300`}
                  >
                    {p.stock} {p.stock <= 5 ? "(Low Stock)" : ""}
                  </td>
                  <td className="py-2 px-3 max-sm:min-w-[135px] border border-gray-300 flex gap-2 justify-center md:flex-row flex-col">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p?._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isError && (
        <div className="flex justify-center gap-2 mt-4 text-xs">
          {/* Previous Button */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer "
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded cursor-pointer  ${
                page === i + 1
                  ? "bg-yellow-500 text-white hover:bg-yellow-600 "
                  : "bg-gray-200"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed "
                : "bg-yellow-500 cursor-pointer text-white hover:bg-yellow-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 max-sm:px-3">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[3px]"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-md animate-zoom-in">
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 cursor-pointer text-gray-600 hover:text-black text-sm"
            >
              ✖
            </div>

            <div className="">
              <UpdateFormModal
                product={editingProduct}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
