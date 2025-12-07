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
import {
  useGetReviewByIdQuery,
  useAddCustomerReviewMutation,
} from "../../redux/api/reviewApi";
import { useClearCartItemMutation } from "../../redux/api/cartApi";
import { Clock, Mail, MapPin, Phone, X } from "lucide-react";
import Image from "next/image";
import { formatePrice, calculatePercentage } from "../../utils/features";
import { cartActions } from "@/redux/actions/cart-actions";
import { getGuestCart, setGuestCart } from "@/utils/addToCart";
import { setCart } from "@/redux/reducers/cart-reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageZoom from "../ImageMagnify";

const ProductDetailsPage = ({ slug }) => {
  const [reviewText, setReviewText] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // track user selected size
  const [showChart, setShowChart] = useState(false);

  const [rating, setRating] = useState(5); // default 5 stars
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const id = user?._id;

  const { data, isLoading } = useGetSingleProductDetailsQuery({ slug });
  const [clearCartItem] = useClearCartItemMutation();
  const { data: reviewData, isLoading: reviewLoading } =
    useGetReviewByIdQuery(slug);
  // const { data: recommendedData } = useGetRecommendedProductsQuery({ id });
  const cartItem = useSelector((state) => state.cart.items);

  const router = useRouter();

  const productDetails = data?.product;

  const sizeData = ["XS", "S", "M", "L", "XL", "XXL"];
  const specifySize =
    productDetails?.subCategory === "oversize-fit"
      ? sizeData?.filter((i) => i !== "XS")
      : sizeData;
  const [addReview, { isLoading: addReviewLoading }] =
    useAddCustomerReviewMutation();

  // Handle submit review
  const handleAddReview = async () => {
    if (!user) {
      toast.error("You must be logged in to add a review");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      await addReview({
        productId: slug,
        comment: reviewText,
        rating,
      }).unwrap();

      toast.success("Review added successfully!");
      setReviewText(""); // clear textarea
      setRating(5); // reset rating
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review");
    }
  };

  const handleCartItemData = () => {
    if (!selectedSize) return;
    clearCartItem();
  };
  //   console.log(data, "single product page data and slug...........");
  // console.log(relatedData, "Related product data...........");

  useEffect(() => {
    if (data?.product?.photos?.length > 0) {
      setSelectedImage(data.product.photos[0]); // default pehli image
    }
  }, [data]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // get from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // agar object stored hai
    }
  }, []);

  const handleClearData = () => {
    if (!selectedSize) return;
    localStorage.removeItem("checkout");
  };

  const handleAddToCart = (product) => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    if (!user) {
      let guestCart = getGuestCart();
      const existProduct = guestCart.find(
        (item) => item.productId === product._id
      );

      console.log(existProduct, "Exist product........");

      if (existProduct) {
        existProduct.size = selectedSize;
        setGuestCart(guestCart);
        dispatch(setCart(guestCart));

        toast.success("Product size updated in cart");
        return;
      }

      guestCart.push({
        name: product.name,
        productId: product._id,
        photos: product.photos?.length ? product.photos : [product.photo],
        size: selectedSize,
        price: product.price,
        quantity: 1,
        stock: product.stock,
      });

      setGuestCart(guestCart);
      dispatch(setCart(guestCart));
      console.log(guestCart, ".....Guest Cart.....");

      toast.success("Product added to cart");
      return;
    }

    // Logged in user cart logic
    const alreadyInCart = cartItem?.some(
      (item) =>
        String(item.productId) === String(product._id) &&
        item.size === selectedSize
    );

    if (alreadyInCart) {
      toast.error("Product with this size already in cart");
      return;
    }
    console.log(alreadyInCart, "Already card in cart");

    // Add to cart with size
    cartActions.handleAdd({ productId: product._id, size: selectedSize });
    toast.success("Product added to cart");
  };

  const formateSize = String(productDetails?.subCategory).split("-").join(" ");
  const formateCategory = String(productDetails?.category).split("-").join(" ");

  console.log(productDetails?.subCategory, "subCategory...");

  const handleDirectCheckout = async (product) => {
    console.log(selectedSize, "function DATA");

    if (selectedSize === "" || !selectedSize) {
      toast.error("Please select size");
      return;
    }

    const checkoutProductData = {
      name: product.name,
      description: product.description,
      color: product.color,
      photos: product.photos,
      photoPublicId: product.photoPublicId,
      mrpPrice: product.mrpPrice,
      price: product.price,
      stock: product.stock,
      subCategory: product.subCategory,
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };
    let storeProduct = await localStorage.setItem(
      "checkout",
      JSON.stringify(checkoutProductData)
    );
    router.push("/checkout");
    console.log(storeProduct, "Store Product....");
  };

  console.log(data?.product, "single product data.......");

  return (
    <div>
      {isLoading ? (
        <LoaderComponent status="Product Loading..." />
      ) : (
        <>
          <div className="max-w-5xl mx-auto px-4 lg:py-12  pt-12  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-8 items-center">
              {/* 🖼️ Left Section - Product Images */}
              <div className="w-full flex flex-col items-center">
                {/* Main image frame */}
                <div className="w-full lg:h-[600px] h-[500px] border border-gray-200 rounded-md overflow-hidden">
                  <ImageZoom imgPath={selectedImage || productDetails?.photo} />
                  {/* <Image
                    src={selectedImage || productDetails?.photo}
                    alt="Product Main Image"
                    width={700}
                    height={700}
                    className="object-cover w-full h-full transition-all duration-300"
                  /> */}
                </div>

                {/* Thumbnail images */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {productDetails?.photos?.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`cursor-pointer border rounded-md p-1 transition-all duration-200 ${
                        selectedImage === img
                          ? "border-yellow-500 scale-105"
                          : "border-gray-300 hover:border-yellow-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index}`}
                        width={80}
                        height={80}
                        className="object-cover w-16 h-16 rounded"
                      />
                    </div>
                  ))}
                </div>
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

                {productDetails?.stock > 0 && (
                  <p className="text-green-600 text- leading-relaxed mb-5">
                    {`${productDetails?.stock} ${
                      productDetails?.stock === 1 ? "piece" : "pieces"
                    } available in stock`}
                  </p>
                )}

                <div className="">
                  <p className="text-gray-600 text-sm leading-relaxed mb-2 capitalize">
                    Category: {formateSize}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed  mb-2 capitalize">
                    Sub Category: {formateCategory}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Color: {productDetails?.color}
                  </p>
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-5 border w-fit rounded-sm border-gray-300 px-5 py-1 cursor-pointer hover:shadow-md"
                    onClick={() => {
                      setShowChart(!showChart);
                    }}
                  >
                    View size chart
                  </div>
                  {showChart && (
                    <div className="relative">
                      <div className="flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black/70 backdrop-blur-sm">
                        <div className="lg:w-[50vw] w-[90vw] h-[80vh]">
                          <Image
                            src={
                              productDetails?.subCategory === "oversize-fit"
                                ? "/size-chart/oversize-fit.webp"
                                : "/size-chart/regular-fit.webp"
                            }
                            width={1600}
                            height={700}
                            alt="chart size"
                            className="w-full h-full object-center object-contain"
                          />
                        </div>
                        <div
                          className=" absolute lg:top-10 top-5 lg:right-10 right-5 cursor-pointer"
                          onClick={() => setShowChart(false)}
                        >
                          <X color="#fff" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {productDetails?.stock > 0 && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">
                      Select Size:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {specifySize?.map((size) => {
                        const isAvailable =
                          productDetails?.sizes?.includes(size);

                        return (
                          <button
                            key={size}
                            disabled={!isAvailable}
                            type="button"
                            onClick={() => isAvailable && setSelectedSize(size)}
                            className={` 
                            ${
                              !isAvailable
                                ? "line-through hover:cursor-not-allowed text-gray-300"
                                : ""
                            }
                            px-3 py-1 border rounded cursor-pointer
                            ${
                              selectedSize === size
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "border-gray-300 text-gray-700 hover:border-yellow-400"
                            }
                          `}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {productDetails?.stock === 0 && (
                  <p className=" text-red-500 mb-3 ">Out of stock</p>
                )}
                <div className="flex items-center gap-3">
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
                      onClick={handleClearData}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      handleDirectCheckout(productDetails);
                      handleCartItemData();
                    }}
                    disabled={productDetails?.stock === 0}
                    className={` ${
                      productDetails?.stock === 0
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600  cursor-pointer"
                    } px-6 py-2 text-white  rounded-sm text-sm   transition`}
                  >
                    Buy now
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 mt-7">
                  {productDetails?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-[1220px] w-full mx-auto max-sm:px-4">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>

            {reviewData?.reviews?.length === 0 ? (
              <div className="text-sm mt-5 text-gray-500">
                No customer reviews available
              </div>
            ) : (
              reviewData?.reviews?.map((rev) => (
                <div
                  key={rev._id}
                  className="border-b pb-3 mt-5 border-gray-200"
                >
                  <div className="font-semibold text-sm capitalize">
                    {rev?.name}
                  </div>
                  <div className="text-sm mt-1 text-gray-500">
                    {rev?.comment}
                  </div>
                  <div className="text-sm text-yellow-500 mt-1">
                    Rating: {rev?.rating} {"⭐".repeat(rev?.rating)}
                  </div>
                </div>
              ))
            )}
            {!user && (
              <div className="">
                <Link href={"/login"}>
                  <button className="bg-yellow-500 text-white mt-3 px-3 py-1.5 text-sm rounded hover:bg-yellow-600 cursor-pointer">
                    Add review
                  </button>
                </Link>
              </div>
            )}
            {/* Add Review Form */}
            {user && (
              <div className="mt-6">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
                  rows={4}
                />

                <div className="flex items-center gap-3 mb-3">
                  <label className="text-sm font-medium">Rating:</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border border-gray-300 rounded p-1 text-sm  cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="text-sm">
                        {num} {"⭐".repeat(num)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddReview}
                  disabled={reviewLoading}
                  className="bg-yellow-500 text-white mt-3 px-3 py-1.5 text-sm rounded hover:bg-yellow-600 cursor-pointer"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            )}
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
