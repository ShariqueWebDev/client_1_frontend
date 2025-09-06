// components/admin/UpdateProductForm.js
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpdateCategoryMutation } from "../../../redux/api/CategoryApi";
import Image from "next/image";

const categorySchema = z.object({
  name: z.string().min(3, "Name is required"),
  link: z.string().optional(),
  photo: z.any().optional(), // ✅ photo optional on update
});

export default function UpdateCategoryForm({ product, onClose }) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [filePreview, setFilePreview] = useState(product?.photo || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: product?.name,

      link: product?.link,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      if (data?.link) formData.append("link", data?.link);
      if (data?.photo && data?.photo?.[0]) {
        formData.append("photo", data?.photo[0]); // only if new file
      }
      // console.log([...formData.entries()], "Form Data entries");

      await updateCategory({
        id: product?._id,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-sm max-w-[450px] w-full "
    >
      <h3 className="text-xl font-semibold">Update Category</h3>
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
        placeholder="Link"
        {...register("link")}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm  focus:outline-none placeholder:text-gray-300 "
      />
      {errors.link && (
        <p className="text-red-500 text-sm">{errors.link.message}</p>
      )}

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
          src={product.photo}
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
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
