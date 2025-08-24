// components/admin/UpdateProductForm.js
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpdateProductMutation } from "../../../redux/api/productApi";
import Image from "next/image";

// Zod schema
const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce
    .number()
    .refine((val) => val > 0, { message: "Enter valid price" }),
  stock: z.coerce
    .number()
    .refine((val) => val >= 0, { message: "Enter valid stock" }),
  category: z.string().min(2, "Category required"),
  subCategory: z.string().min(2, "Sub-category required"),
  photo: z.any().optional(),
});

export default function UpdateProductForm({ product, onClose }) {
  const [updateProduct] = useUpdateProductMutation();
  const [filePreview, setFilePreview] = useState(product?.photo || null);

  console.log(filePreview, "file preview...");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      stock: product?.stock,
      category: product?.category,
      subCategory: product?.subCategory,
      photo: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      await updateProduct({
        id: product?._id,
        formData,
        isAdmin: "68ab4eb97bc039b01d4e8d23",
      }).unwrap();
      toast.success("Product updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

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
        placeholder="Price"
        {...register("price")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.price && (
        <p className="text-red-500 text-sm">{errors.price.message}</p>
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
        >
          <option className=" hover:!bg-yellow-500" value="">
            Select Category
          </option>
          <option className=" hover:!bg-yellow-500" value="anime-prints">
            Anime Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="aesthetic-prints">
            Aesthetic Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="minimal-prints">
            Minimal Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="character-Prints">
            Character Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="quotes">
            Quotes
          </option>
          <option className=" hover:!bg-yellow-500" value="quirky-prints">
            Quirky Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="pop-culture">
            Pop Culture
          </option>
          <option className=" hover:!bg-yellow-500" value="movies-webseries">
            Movies & Webseries
          </option>
          <option className=" hover:!bg-yellow-500" value="funny-prints">
            Funny Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="wunderlust-prints">
            Wunderlust Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="jersey-prints">
            Jersey Prints
          </option>
          <option className=" hover:!bg-yellow-500" value="cartoon-prints">
            Cartoon Prints
          </option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

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
        {...register("photo")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
        onChange={(e) =>
          setFilePreview(URL.createObjectURL(e?.target?.files?.[0]))
        }
      />
      {filePreview && (
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER}/${filePreview}`}
          width={250}
          height={250}
          alt="Preview"
          className="w-24 h-24 object-cover mt-2"
        />
      )}

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
          Update
        </button>
      </div>
    </form>
  );
}
