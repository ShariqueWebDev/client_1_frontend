"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import ClientOnly from "./ClientWrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useCreateNewsletterMutation } from "@/redux/api/newsletterApi";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const getCurrentYear = () => {
  if (typeof window !== "undefined") {
    return new Date().getFullYear();
  }
  return "";
};

export default function Footer() {
  const [createNewsletter, { isLoading }] = useCreateNewsletterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createNewsletter({ formData: data }).unwrap();
      toast.success("Subscribed successfully!");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to subscribe");
    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 ">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Refilly</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your one-stop shop for premium fashion at unbeatable prices.
            Stylish, affordable, and delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            {/* <li>
              <Link href="/shop" className="hover:text-yellow-400">
                Shop
              </Link>
            </li> */}
            <li>
              <Link href="/about" className="hover:text-yellow-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-yellow-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/returns" className="hover:text-yellow-400">
                Returns Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-yellow-400">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-yellow-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Join Our Newsletter
          </h3>
          <p className="text-sm mb-4 text-gray-400">
            Get updates on new arrivals and exclusive offers.
          </p>
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full">
              <input
                type="email"
                placeholder="Your email"
                {...register("email")}
                className="p-2 rounded-l bg-gray-800 text-white text-sm focus:outline-none placeholder:pl-2 w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 text-sm rounded-r disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-xl mx-auto px-4">
        <ClientOnly>
          <p className="text-sm text-gray-400">
            © {getCurrentYear()} Refilly | All Rights Reserved
          </p>
          {/* <p className="text-sm text-gray-400">
            Designed By Affan and Sharique
          </p> */}
        </ClientOnly>
        <div className="flex gap-4 text-gray-400">
          <Link
            href="https://www.facebook.com/people/Refilly-Streetstyle/pfbid02gNTjZMc9XDRH7jwDrhZrirWonQcZJXwxC18qJfiQn7EzwhBUkGrEMjzkj3JZsnCJl/?rdid=5KTVOAkYrSUQvqD7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JjDwJX7RY%2F"
            target="_blank"
          >
            <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
          </Link>
          <Link
            href="https://x.com/Refilly_?t=9ipblt2ac5iIHQaXmbQOyw&s=08"
            target="_blank"
          >
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
          </Link>
          <Link
            href="https://www.instagram.com/refillyofficial/?utm_source=qr&igsh=MTVkdjYwbnF1dDF1eg%3D%3D#"
            target="_blank"
          >
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
          </Link>
          <Link href="https://www.youtube.com/@refillyofficial" target="_blank">
            <FaYoutube className="hover:text-yellow-400 cursor-pointer" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
