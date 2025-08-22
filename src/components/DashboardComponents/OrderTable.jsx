"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetAdminOrderQuery,
  useGetProcessOrderQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
} from "../../redux/api/orderApi";
import UpdateFormModal from "../DashboardComponents/CTA/UpdateFormModal";
import { useDispatch } from "react-redux";
import { staticApi } from "../../redux/api/staticApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import CTA from "./CTA/CTA";
import { formatDate } from "../../utils/features";

export default function AdminOrderTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAdminOrderQuery({
    isAdmin: "68a44c1328528a8fcc6ac845",
  });

  //   console.log(orderData, "admin Order data.......");

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (orderId) => {
    console.log(orderId, "order deleted handler");

    try {
      await deleteOrder({
        orderId,
        isAdmin: "68a44c1328528a8fcc6ac845",
      }).unwrap();
      toast.success("Product deleted successfully!");
      dispatch(staticApi.util.invalidateTags(["Statics"]));
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

  const orders = data?.all_Orders;
  console.log(orders);

  //   const totalPages = data?.totalPages;

  return (
    <div className="px-6 w-full">
      {/* Search */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 text-sm px-3 py-2 rounded-lg w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-gray-200 rounded-lg text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Product
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Order Id
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Date
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Phone No
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Status
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Payment Type
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Payment Status
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Total
              </th>
              <th className="px-2 max-sm:min-w-[150px] py-2 border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((p) => {
              console.log(p._id);

              return (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.orderItems?.map((pro) => pro?.name)}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p._id}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {formatDate(p.createdAt)}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.shippingInfo?.phoneNo}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.status}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.paymentInfo?.method}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.paymentInfo?.status}
                  </td>
                  <td className="px-2 max-sm:min-w-[150px]  py- border border-gray-300">
                    {p.total}
                  </td>
                  <td className=" py-2 px-1 max-sm:min-w-[135px] border border-gray-300 flex gap-2 justify-center md:flex-row flex-col">
                    {/* <div className="">
                    <CTA btnLable={"Add product"} table={true} />
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setIsModalOpen(true);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Edit
                  </button> */}
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    </div>
  );
}
