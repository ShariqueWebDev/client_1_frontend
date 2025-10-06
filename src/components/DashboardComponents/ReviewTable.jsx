"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetAllReviewsQuery,
  useDeleteReviewsMutation,
} from "../../redux/api/reviewApi";
import { useDispatch } from "react-redux";
import { staticApi } from "../../redux/api/staticApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { formatDate } from "../../utils/features";
import { useDebounce } from "./OrderTable";
import Alert from "../Alert";
import { userAPI } from "@/redux/api/userApi";

export default function AllReviewsTable() {
  const [page, setPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [limit] = useState(10); // fix limit per page
  const dispatch = useDispatch();

  // Apply debounce (300ms delay)
  const debouncedSearch = useDebounce(search, 500);

  // Backend call with pagination + debounced search
  const { data, isLoading, refetch, isError } = useGetAllReviewsQuery();

  const [deleteReviews] = useDeleteReviewsMutation();

  const handleDelete = async ({ reviewId, productId }) => {
    try {
      await deleteReviews({
        reviewId,
        productId,
      }).unwrap();

      toast.success("Review deleted successfully!");
      dispatch(staticApi.util.invalidateTags(["Reviews"]));
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (isLoading)
    return (
      <div>
        <LoaderComponent status=" Reviews loading..." />
      </div>
    );

  // const handleAlert = (role) => {

  //   if (role === "admin") {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000);
  //   }
  // };

  console.log(data, "reviews.....");

  return (
    <div className="px-6 w-full mb-5">
      {/* Search with debounce */}
      {/* <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search ..."
          className="border focus:outline-none border-gray-300 text-xs px-3 py-2 rounded-lg w-64 "
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on new search
          }}
        />
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto w-full mt-16">
        {isError ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full  text-xs">
                <thead className="bg-gray-100 w-full">
                  <tr>
                    <th className="px-2 py-2 border border-gray-300">
                      Product Name
                    </th>
                    <th className="px-2 py-2 border border-gray-300">
                      Reviews
                    </th>
                    <th className="px-2 py-2 border border-gray-300">Rating</th>
                    <th className="px-2 py-2 border border-gray-300">Action</th>
                  </tr>
                </thead>
              </table>
              <div className="lg:border border-gray-300 text-center text-sm py-20">
                Search not found!
              </div>
            </div>
          </>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 border border-gray-300">
                  Product Name
                </th>
                <th className="px-2 py-2 border border-gray-300">Reviews</th>
                <th className="px-2 py-2 border border-gray-300">Rating</th>

                <th className="px-2 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.reviews?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    {search.trim() !== ""
                      ? "🔍 Search not found"
                      : "📦 No reviews found"}
                  </td>
                </tr>
              ) : (
                data.reviews?.map((review) => (
                  <tr key={review?._id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 border border-gray-300">
                      {review?.productName}
                    </td>
                    <td className={` px-2 py-2 border border-gray-300`}>
                      {review?.comment}
                    </td>
                    <td className={` px-2 py-2 border border-gray-300`}>
                      {review?.rating}
                    </td>

                    <td className="px-2 py-2 border border-gray-300">
                      <button
                        onClick={() => {
                          console.log("Deleting Review:", {
                            reviewId: review?._id,
                            productId: review?.productId,
                            productName: review?.productName,
                          });

                          handleDelete({
                            productId: review?.productId,
                            reviewId: review?._id,
                          });
                        }}
                        className="px-3 py-1 text-white bg-red-500 rounded"
                      >
                        Delete
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
      {/* {!isError && (
        <div className="flex justify-center gap-2 mt-4 text-xs">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-white"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-yellow-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => {
              setPage((prev) => Math.min(prev + 1, data?.totalPages || 1));
            }}
            disabled={page === data?.totalPages}
            className={`px-3 py-1 rounded ${
              page === data?.totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )} */}
      {showAlert && (
        <Alert
          message={" Admin cannot be deleted! Please use Database directly."}
          statusCode={403}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  );
}
