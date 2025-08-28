"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAddNewBannerMutation } from "../../../redux/api/bannerApi";

// Zod schema
const bannerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  priority: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val ? Number(val) : 0)), // string ko number me convert
  link: z.string().optional(),
  photo: z.any().refine((file) => file?.length === 1, "photo is required"),
});

const AddBannerModal = ({ btnLable, table }) => {
  const [open, setOpen] = useState(false);
  const [addNewBanner, { isLoading }] = useAddNewBannerMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bannerSchema), // ✅ fixed
  });

  console.log(process.env.NEXT_PUBLIC_ADMIN_ID, "admin id............");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      if (data?.link) formData.append("link", data?.link);
      if (data?.priority) formData.append("priority", data?.priority);

      // ✅ Backend ke multer field ke hisaab se change karo:
      formData.append("photo", data?.photo[0]);

      const res = await addNewBanner({
        formData,
        isAdmin: `${process.env.NEXT_PUBLIC_ADMIN_ID}`,
      });

      if (res) {
        toast.success("Banner created successfully!");
        reset();
        setOpen(false);
      } else {
        toast.error("Data is null!");
      }
    } catch (error) {
      console.error("Banner create failed", error);
      toast.error("Something went wrong!");
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

          {/* Modal Box */}
          <div className="bg-white w-full max-w-[450px] p-6 rounded-lg shadow-lg relative z-10 transform scale-95 animate-zoom-in">
            <div
              onClick={() => setOpen(false)}
              className="absolute top-3.5 right-3.5 text-gray-600 hover:text-black cursor-pointer text-sm"
            >
              ✖
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Banner
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Banner Name"
                  {...register("name")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Link */}
              <div>
                <input
                  type="text"
                  placeholder="Optional Link"
                  {...register("link")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Priority */}
              <div>
                <input
                  type="number"
                  placeholder="Priority (0 by default)"
                  {...register("priority")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Image */}
              <div>
                <input
                  type="file"
                  {...register("photo")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none"
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

export default AddBannerModal;
