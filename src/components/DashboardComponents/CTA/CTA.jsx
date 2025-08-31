"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productApi,
  useAddNewProductMutation,
} from "../../../redux/api/productApi";
import { useGetAllCategoriesQuery } from "../../../redux/api/CategoryApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { staticApi } from "@/redux/api/staticApi";

// Zod schema
const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(2, "Description is required"),
  price: z
    .string()
    .refine((val) => !isNaN(val) && Number(val) > 0, "Enter valid price"),
  mrpPrice: z
    .string()
    .refine((val) => !isNaN(val) && Number(val) > 0, "Enter valid MRP price"),
  stock: z
    .string()
    .refine((val) => !isNaN(val) && Number(val) >= 0, "Enter valid stock"),
  category: z.string().min(2, "Category required"),
  subCategory: z.string().min(2, "Sub-category required"),
  color: z.string().min(2, "Color required"),
  photo: z.any().refine((file) => file?.length === 1, "Photo is required"),
});

const AddProductModal = ({ btnLable, table }) => {
  const [open, setOpen] = useState(false);
  const [addNewProduct, { isLoading, isError, isSuccess }] =
    useAddNewProductMutation();

  const { data, isLoading: catIsLoading } = useGetAllCategoriesQuery({
    page: 1,
    search: "",
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID, // ya jo bhi adminId hai
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      formData.append("price", data?.price);
      formData.append("mrpPrice", data?.mrpPrice);
      formData.append("stock", data?.stock);
      formData.append("category", data?.category);
      formData.append("subCategory", data?.subCategory);
      formData.append("color", data?.color);
      formData.append("photo", data?.photo[0]);

      const res = await addNewProduct({
        formData,
        adminId: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
      }).unwrap();

      dispatch(staticApi.util.invalidateTags(["Statics"]));
      dispatch(productApi.util.invalidateTags(["AdminProducts"]));

      if (res) {
        toast.success("Product created successfully!");
        reset();
        setOpen(false);
      } else {
        toast.error("Data is null!");
      }
    } catch (error) {
      console.error("Product create failed", error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={() => setOpen(true)}
        className={`bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-5 py-2 rounded-sm cursor-pointer text-center ${
          table ? "text-xs" : " max-sm:w-full text-sm"
        }`}
      >
        {btnLable}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal Box with Zoom Effect */}
          <div className="bg-white w-full max-w-[450px] p-6 rounded-lg shadow-lg relative z-10 transform scale-95 animate-zoom-in">
            <div
              onClick={() => setOpen(false)}
              className="absolute top-3.5 right-3.5 text-gray-600 hover:text-black cursor-pointer text-sm"
            >
              ✖
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  {...register("name")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Product Description"
                  {...register("description")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  {...register("price")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/* {mrpPrice} */}
              <div>
                <input
                  type="number"
                  placeholder="Mrp Price"
                  {...register("mrpPrice")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.mrpPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.mrpPrice.message}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  {...register("stock")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>

              {/* Category */}
              {/* Category Dropdown */}
              <div>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
                  disabled={catIsLoading}
                >
                  <option value="">Select Category</option>

                  {catIsLoading && (
                    <option disabled>Loading categories...</option>
                  )}

                  {data?.categories?.length > 0 &&
                    data.categories.map((cat) => (
                      <option key={cat._id} value={cat.link}>
                        {cat.name}
                      </option>
                    ))}
                </select>

                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Sub Category */}
              <div>
                <select
                  {...register("subCategory")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
                >
                  <option className=" hover:!bg-yellow-500" value="">
                    Select Sub Category
                  </option>

                  <option
                    className=" hover:!bg-yellow-500"
                    value="oversize-fit"
                  >
                    Oversize Fit
                  </option>
                  <option className=" hover:!bg-yellow-500" value="regular-fit">
                    Regular Fit
                  </option>
                </select>
                {errors.subCategory && (
                  <p className="text-red-500 text-sm">
                    {errors.subCategory.message}
                  </p>
                )}
              </div>

              {/* Color */}
              <div>
                <input
                  type="text"
                  placeholder="Color"
                  {...register("color")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color.message}</p>
                )}
              </div>

              {/* Photo */}
              <div>
                <input
                  type="file"
                  {...register("photo")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm">{errors.photo.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded text-sm cursor-pointer"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
