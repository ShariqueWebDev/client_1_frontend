"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetAdminOrderQuery,
  useDeleteOrderMutation,
  useProcessOrderMutation,
} from "../../redux/api/orderApi";
import { useDispatch } from "react-redux";
import { staticApi } from "../../redux/api/staticApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { formatDate } from "../../utils/features";

// Custom hook for debounce
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function AdminOrderTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10); // fix limit per page
  const dispatch = useDispatch();

  // Apply debounce (300ms delay)
  const debouncedSearch = useDebounce(search, 500);

  // Backend call with pagination + debounced search
  const { data, isLoading, refetch, isError } = useGetAdminOrderQuery({
    isAdmin: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
    page,
    limit,
    search: debouncedSearch,
  });

  const [processOrder] = useProcessOrderMutation();

  const [deleteOrder] = useDeleteOrderMutation();

  const handleProcessOrder = async (orderId, errorStatus) => {
    try {
      await processOrder({
        orderId,
        isAdmin: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
      }).unwrap();
      toast.success("Order status updated!");
      refetch();
    } catch (error) {
      if (errorStatus === "Delivered") {
        toast.error("Order already delivered!");
      } else {
        toast.error("Order not proccessed!");
      }
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder({
        orderId,
        isAdmin: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
      }).unwrap();
      toast.success("Order deleted successfully!");
      dispatch(staticApi.util.invalidateTags(["Statics"]));
      refetch();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (isLoading)
    return (
      <div>
        <LoaderComponent status="Order list loading..." />
      </div>
    );

  const orders = data?.all_Orders || [];
  const totalPages = data?.totalPages || 1;
  console.log(orders, "order list");

  return (
    <div className="px-6 w-full mb-5">
      {/* Search with debounce */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="border focus:outline-none border-gray-300 text-xs px-3 py-2 rounded-lg w-64 "
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on new search
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        {isError ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full  text-xs">
                <thead className="bg-gray-100 w-full">
                  <tr>
                    <th className="px-2 py-2 border border-gray-300">
                      Product
                    </th>
                    <th className="px-2 py-2 border border-gray-300">
                      Order Id
                    </th>
                    <th className="px-2 py-2 border border-gray-300">Date</th>
                    <th className="px-2 py-2 border border-gray-300">
                      Phone No
                    </th>
                    <th className="px-2 py-2 border border-gray-300">
                      Address
                    </th>
                    <th className="px-2 py-2 border border-gray-300">Status</th>
                    <th className="px-2 py-2 border border-gray-300">
                      Payment Type
                    </th>
                    <th className="px-2 py-2 border border-gray-300">
                      Payment Status
                    </th>
                    <th className="px-2 py-2 border border-gray-300">Total</th>
                    <th className="px-2 py-2 border border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="lg:border border-gray-300 text-center text-sm py-20">
                order not found!
              </div>
            </div>
          </>
        ) : (
          <table className="min-w-full border-gray-200 rounded-lg text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 border border-gray-300">Product</th>
                <th className="px-2 py-2 border border-gray-300">Order Id</th>
                <th className="px-2 py-2 border border-gray-300">Date</th>
                <th className="px-2 py-2 border border-gray-300">Phone No</th>
                <th className="px-2 py-2 border border-gray-300">Address</th>
                <th className="px-2 py-2 border border-gray-300">Status</th>
                <th className="px-2 py-2 border border-gray-300">
                  Payment Type
                </th>
                <th className="px-2 py-2 border border-gray-300">
                  Payment Status
                </th>
                <th className="px-2 py-2 border border-gray-300">Total</th>
                <th className="px-2 py-2 border border-gray-300">
                  Refund Status
                </th>
                <th className="px-2 py-2 border border-gray-300">Actions</th>
                <th className="px-2 py-2 border border-gray-300">
                  Process Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    {search.trim() !== ""
                      ? "🔍 Search not found"
                      : "📦 No orders found"}
                  </td>
                </tr>
              ) : (
                orders.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 border border-gray-300">
                      {p.orderItems
                        ?.map((pro) => pro?.productId?.name)
                        .join(", ")}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p._id}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p.shippingInfo?.phoneNo}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p.shippingInfo?.address + " " + p.shippingInfo?.city}
                    </td>
                    <td
                      className={` ${
                        p.status === "Delivered"
                          ? "text-green-500"
                          : p.status === "Pending"
                          ? "text-red-500"
                          : p.status === "Processing"
                          ? "text-blue-600"
                          : p.status === "Shipped"
                          ? "text-indigo-600"
                          : "text-pink-700"
                      } px-2 py-2 border border-gray-300`}
                    >
                      {p.status}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p.paymentInfo?.method}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p.paymentInfo?.status}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      {p.total}
                    </td>
                    <td className="px-2 py-2 border text-center border-gray-300">
                      {p.refund?.status || "-"}
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-2 py-2 border border-gray-300">
                      <button
                        onClick={() => handleProcessOrder(p._id, p.status)}
                        className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
                      >
                        Process order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isError && (
        <div className="flex justify-center gap-2 mt-4 text-xs">
          {/* Previous */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded  ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded cursor-pointer ${
                page === i + 1
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-200"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded  ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 cursor-pointer text-white hover:bg-yellow-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
