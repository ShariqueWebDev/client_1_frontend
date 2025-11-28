"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpdateProductMutation } from "../../../redux/api/productApi";
import { useGetAllCategoriesQuery } from "../../../redux/api/CategoryApi";
import axios from "axios";

import Image from "next/image";

// Zod schema
const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  price: z.coerce
    .number()
    .refine((val) => val > 0, { message: "Enter valid price" }),
  mrpPrice: z.coerce
    .number()
    .refine((val) => val > 0, { message: "Enter valid MRP price" }),
  stock: z.coerce
    .number()
    .refine((val) => val >= 0, { message: "Enter valid stock" }),
  category: z.string().min(2, "Category required"),
  subCategory: z.string().min(2, "Sub-category required"),
  photos: z.any().optional(),
  sizes: z.array(z.string()).min(1, "Select at least one size").default([]),
});

export default function UpdateProductForm({ product, onClose }) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [filePreview, setFilePreview] = useState(
    product?.photos?.length > 0 ? product.photos : []
  );
  const [photoPublicIds, setPhotoPublicIds] = useState(
    product?.photoPublicId?.length > 0 ? product.photoPublicId : []
  );

  const { data, isLoading: catIsLoading } = useGetAllCategoriesQuery({
    page: 1,
    search: "",
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID, // ya jo bhi adminId hai
  });

  console.log(updateProduct, "update query cheking......");

  const handleDeleteImage = async (publicId) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER}/api/v1/product/delete-image`,
        {
          productId: product?._id,
          publicId,
        }
      );

      // Update frontend state
      setFilePreview(data.photos);
      setPhotoPublicIds(data.photoPublicId);
      toast.success("Image deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete image");
      console.error(err);
    }
  };

  // console.log(product.photo);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      mrpPrice: product?.mrpPrice,
      stock: product?.stock,
      category: product?.category,
      subCategory: product?.subCategory,
      photo: null,
      sizes: Array.isArray(product?.sizes) ? product.sizes : [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("mrpPrice", data.mrpPrice);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("sizes", JSON.stringify(data.sizes));

      if (data.photos && data.photos.length > 0) {
        for (let i = 0; i < data.photos.length; i++) {
          formData.append("photos", data.photos[i]); // field name must match backend multer
        }
      }

      await updateProduct({
        id: product._id,
        formData,
        isAdmin: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
      }).unwrap();

      toast.success("Product updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

  console.log(product, "update product data.......");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-sm max-w-[450px] w-full "
    >
      <h3 className="text-xl font-semibold">Update Product</h3>
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
      <input
        type="text"
        placeholder="Description"
        {...register("description")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}
      <input
        type="text"
        placeholder="Price"
        {...register("price")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.price && (
        <p className="text-red-500 text-sm">{errors.price.message}</p>
      )}
      <input
        type="text"
        placeholder="MRP Price"
        {...register("mrpPrice")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.mrpPrice && (
        <p className="text-red-500 text-sm">{errors.mrpPrice.message}</p>
      )}
      <input
        type="text"
        placeholder="Stock"
        {...register("stock")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.stock && (
        <p className="text-red-500 text-sm">{errors.stock.message}</p>
      )}
      <div>
        <select
          {...register("category")}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
          disabled={catIsLoading}
        >
          <option value="">Select Category</option>

          {catIsLoading && <option disabled>Loading categories...</option>}

          {data?.categories?.length > 0 &&
            data.categories.map((cat) => (
              <option key={cat._id} value={cat.link}>
                {cat.name}
              </option>
            ))}
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="sizes"
        defaultValue={[]}
        render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"]?.map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={
                    Array.isArray(field.value) && field.value.includes(size)
                  }
                  onChange={(e) => {
                    const current = Array.isArray(field.value)
                      ? field.value
                      : [];
                    if (e.target.checked) {
                      field.onChange([...current, size]);
                    } else {
                      field.onChange(current.filter((v) => v !== size));
                    }
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        )}
      />

      {/* Sub Category */}
      <div>
        <select
          {...register("subCategory")}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option className=" hover:!bg-yellow-500" value="">
            Select Category
          </option>

          <option className=" hover:!bg-yellow-500" value="oversize-fit">
            Oversize Fit
          </option>
          <option className=" hover:!bg-yellow-500" value="regular-fit">
            Regular Fit
          </option>
        </select>
        {errors.subCategory && (
          <p className="text-red-500 text-sm">{errors.subCategory.message}</p>
        )}
      </div>
      <input
        type="file"
        {...register("photos")}
        multiple
        accept="image/*"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            const previews = Array.from(files).map((file) =>
              URL.createObjectURL(file)
            );
            setFilePreview(previews); // filePreview ko array me handle karenge
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        {filePreview?.map((src, index) => (
          <div key={index} className="relative w-16 h-16">
            <Image
              src={src}
              alt={`Preview ${index}`}
              width={100}
              height={100}
              className="w-16 h-16 object-cover rounded"
            />
            {photoPublicIds[index] && (
              <button
                type="button"
                onClick={() => handleDeleteImage(photoPublicIds[index])}
                className="absolute inset-0 m-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow-md cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
