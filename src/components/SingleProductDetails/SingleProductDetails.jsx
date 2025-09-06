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
import { cartActions } from "@/redux/actions/cart-actions";
import { getGuestCart, setGuestCart } from "@/utils/addToCart";
import { setCart } from "@/redux/reducers/cart-reducer";
import { useDispatch } from "react-redux";

const ProductDetailsPage = ({ slug }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const id = user?._id;

  const { data, isLoading } = useGetSingleProductDetailsQuery({ slug });
  const { data: recommendedData } = useGetRecommendedProductsQuery({ id });

  const productDetails = data?.product;

  //   console.log(data, "single product page data and slug...........");
  // console.log(relatedData, "Related product data...........");

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // get from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // agar object stored hai
    }
  }, []);

  const handleAddToCart = (product) => {
    // console.log(product, "add to cart.......");

    if (!user) {
      let guestCart = getGuestCart();
      const existing = guestCart.find((i) => i.productId === product?._id);
      // console.log(guestCart, "existing product....");

      if (existing) existing.quantity += 1;
      else
        guestCart.push({
          name: product?.name,
          productId: product?._id,
          photo: product?.photo,
          price: product?.price,
          quantity: 1,
          stock: product?.stock,
        });
      setGuestCart(guestCart);
      dispatch(setCart(guestCart));
      return;
    }

    // Logged-in user
    cartActions.handleAdd({ productId: product?._id });
  };

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
                {productDetails?.stock === 0 && (
                  <p className=" text-red-500 mb-3 ">Out of stock</p>
                )}
                <div
                  className="flex gap-4"
                  onClick={() => {
                    // cartActions.handleAdd({ productId: productDetails?._id });
                    handleAddToCart(productDetails);
                  }}
                >
                  <button
                    disabled={productDetails?.stock === 0}
                    className={` ${
                      productDetails?.stock === 0
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600  cursor-pointer"
                    } px-6 py-2 text-white  rounded-sm text-sm   transition`}
                  >
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
              relatedCarousel={true}
              mainTitle="Related Products"
              // slug={slug}
              // products={relatedData?.products}
              isSlider={true}
              category={data?.product?.category}
              productId={productDetails?._id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
