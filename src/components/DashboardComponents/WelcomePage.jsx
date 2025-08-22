"use client";
import React from "react";
import { BarChart3, Users, ShoppingBag } from "lucide-react";

import { useGetStaticQuery } from "@/redux/api/staticApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import CTA from "../../components/DashboardComponents/CTA/CTA";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const WelcomePage = () => {
  const { data, error, isLoading } = useGetStaticQuery();

  const overviewCounts = data?.stats?.counts;
  console.log(data?.stats, "Welcome comp data.......");

  if (isLoading)
    return <LoaderComponent status="Fetching Overview Business..." />;
  if (error) return toast.error("Failed to fetch static data");

  return (
    <div className="min-h-screen  p-6 pt-14">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back, Sharique
        </h1>
        <p className="text- text-gray-600 mt-2 ">
          Here’s an overview of what’s happening today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-md bg-gray-100">
          <div className="flex p-6">
            <div className="w-7 mr-4 mt-1">
              <Image
                src={"/assets/dashboard/product.png"}
                width={50}
                height={50}
                alt="Product"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{overviewCounts?.product}</h2>
              <p className="text-gray-600 text-sm">Products</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md bg-gray-100">
          <div className="flex p-6">
            <ShoppingBag className="w-6  mr-4 mt-1" />
            <div>
              <h2 className="text-2xl font-bold">{overviewCounts?.order}</h2>
              <p className="text-gray-600 text-sm">Orders</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md bg-gray-100">
          <div className="flex p-6">
            <BarChart3 className="w-6  mr-4 mt-1" />
            <div>
              <h2 className="text-2xl font-bold">{overviewCounts?.revenue}</h2>
              <p className="text-gray-600 text-sm">Revenue</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md bg-gray-100">
          <div className="flex p-6">
            <Users className="w-6  mr-4 mt-1" />
            <div>
              <h2 className="text-2xl font-bold">{overviewCounts?.user}</h2>
              <p className="text-gray-600 text-sm">Total Users</p>
            </div>
          </div>
        </div>
      </div>
      {/* add product button */}
      <div className="mt-16 h-10">
        <h3 className="text-center text-3xl font-semibold mb-7">
          Quick Action
        </h3>
        <div className="flex md:flex-row flex-col justify-center items-center gap-5">
          {/* Add product modal */}
          <CTA btnLable={"Add new product"} />
          <Link
            href={"/dashboard/order"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-5 py-2 rounded-sm cursor-pointer"
          >
            {" "}
            View orders
          </Link>
          <Link
            href={"/dashboard/customer"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-5 py-2 rounded-sm cursor-pointer"
          >
            Manage users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
