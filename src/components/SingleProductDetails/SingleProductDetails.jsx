"use client";
import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { categoriesData } from "@/lib/categoriesData";
import {
  useGetRecommendedProductsQuery,
  useGetRelatedProductQuery,
  useGetSingleProductDetailsQuery,
} from "../../redux/api/productApi";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { formatePrice, calculatePercentage } from "../../utils/features";

const ProductDetailsPage = ({ slug }) => {
  const [user, setUser] = useState(null);
  const id = user?._id;

  const { data, isLoading } = useGetSingleProductDetailsQuery({ slug });
  const { data: recommendedData } = useGetRecommendedProductsQuery({ id });
  const { data: relatedData } = useGetRelatedProductQuery({
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
    userQuery: data?.product?.category,
    filterQuery: "category",
  });

  const productDetails = data?.product;

  //   console.log(data, "single product page data and slug...........");
  console.log(data, "Recommended product data...........");
  console.log(relatedData, "Related product data...........");

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // get from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // agar object stored hai
    }
  }, []);

  const formateSize = String(productDetails?.subCategory).split("-").join(" ");

  return (
    <div>
      {isLoading ? (
        <LoaderComponent status="Product Loading..." />
      ) : (
        <>
          <div className="max-w-5xl mx-auto px-4 lg:py-12  pt-12  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-8 items-center">
              <div className="w-full border border-gray-200 rounded-md">
                <Image
                  src={productDetails?.photo}
                  alt={"Anime Tshirt"}
                  width={700}
                  height={1000}
                  className=""
                />
              </div>

              <div>
                <h1 className="text-2xl md:text-4xl font-bold  text-gray-800 mb-4">
                  {productDetails?.name}
                </h1>
                <div className="flex items-baseline gap-5">
                  <p className="text-2xl text-primary-600 font-semibold mb-6">
                    {formatePrice(productDetails?.price)}
                  </p>

                  <p className="text-xl text-primary-600 font-normal mb-6 line-through text-gray-400">
                    {formatePrice(productDetails?.mrpPrice)}
                  </p>
                  <p className="text-xl text-primary-600 font-normal mb-6 text-green-500">
                    {calculatePercentage(
                      productDetails?.mrpPrice,
                      productDetails?.price
                    )}
                    % <span className="font-normal">off</span>
                  </p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {productDetails?.description}
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 text-white bg-yellow-500 rounded-sm text-sm cursor-pointer  hover:bg-yellow-600 transition">
                    Add to Cart
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-5 mb-3 capitalize">
                  Size: {formateSize}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Color: {productDetails?.color}
                </p>
                <div className="mt-5">
                  <h3 className="lg:text-lg text-base">
                    Contact us more details
                  </h3>
                  <div className="mt-3 lg:text-sm text-xs text-gray-600">
                    <div className="flex gap-3">
                      <Phone size={16} />
                      <div className="flex gap-3">
                        <a href="+917448135379" className="">
                          +91 9999999999
                        </a>
                        <div>|</div>{" "}
                        <a href=" +917498881806" className="">
                          +91 9999999999
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
                        <a href="mailto:info@theclauch.com" className="">
                          info@refilly.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <MapPin size={16} />
                      <div className="">
                        <p className="">
                          Bhiwandi Gaibi nagar, star hotel, Refilly 421302
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Categories
              // tagLine=""
              mainTitle="Related Products"
              mainDesc="Celebrate your favorite anime heroes and iconic scenes with bold, high-quality prints that bring your fandom to life."
              slug={slug}
              products={relatedData?.products}
              isSlider={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
