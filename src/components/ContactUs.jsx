"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactEnquiry } from "@/utils/contactMailEnq";
import toast from "react-hot-toast";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

// ✅ Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  message: z.string().min(5, "Message cannot be empty"),
});

export default function ContactComponent() {
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // Submit function
  const onSubmit = async (data) => {
    console.log(data, "......Enquiry form data.....");

    setLoading(true);
    try {
      const res = await sendContactEnquiry(data);
      if (res) {
        reset();
        toast.success("Email has been sent successfully!");
      } else {
        toast.error("Email sent faild!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center text-gray-900"
        >
          Contact{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Us
          </span>
        </motion.h1>
        <div className="space-y-4 mt-10">
          <h2 className="text-2xl lg:text-3xl  font-medium tracking-wide">
            GET IN TOUCH
          </h2>
          <h1 className="tracking-wider leading-relaxed text-[0.9rem] lg:text-[0.95rem] font-light">
            Need to get in touch? We'd love to hear from you! Please fill out
            the form or email{" "}
            <a
              href="mailto:refillystreetstyle@gmail.com"
              className="text-blue-700"
            >
              refillystreetstyle@gmail.com
            </a>
          </h1>
          <div className="mt-5">
            <h3 className="lg:text-lg text-base">Contact us more details</h3>
            <div className="mt-3 lg:text-sm text-xs text-gray-600">
              <div className="flex gap-3">
                <Phone size={16} />
                <div className="flex gap-3">
                  <a href="tel:+917385346401" className="">
                    +91 7385346401
                  </a>
                  <div>|</div>{" "}
                  <a href="tel:+919527988214" className="">
                    +91 9527988214
                  </a>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <Clock size={16} />
                <div className="">
                  Timings - 10 am to 10 pm (Oprational all days)
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <Mail size={16} />
                <div className="">
                  <a href="mailto:shahfiroz677@gmail.com" className="">
                    refillystreetstyle@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <MapPin size={16} />
                <div className="">
                  <p className="">
                    Rafique hotel, Naigaon Road, batulsalam masjid opposite
                    akhtar Compound, bhiwandi, Thane Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              maxLength={10}
              inputMode="numeric"
              {...register("phone")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              {...register("message")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Write your message..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center ">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </motion.form>

        {/* Extra Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
        >
          <a
            href="/returns"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition shadow-md text-center"
          >
            Return Policy
          </a>

          <a
            href="/terms"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition shadow-md text-center"
          >
            Terms & Condition
          </a>
        </motion.div>
      </div>
    </section>
  );
}
