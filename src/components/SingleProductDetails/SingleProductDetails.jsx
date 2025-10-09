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
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { formatePrice, calculatePercentage } from "../../utils/features";
import { cartActions } from "@/redux/actions/cart-actions";
import { getGuestCart, setGuestCart } from "@/utils/addToCart";
import { setCart } from "@/redux/reducers/cart-reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";

const ProductDetailsPage = ({ slug }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // default 5 stars
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const id = user?._id;

  const { data, isLoading } = useGetSingleProductDetailsQuery({ slug });
  const { data: reviewData, isLoading: reviewLoading } =
    useGetReviewByIdQuery(slug);
  const { data: recommendedData } = useGetRecommendedProductsQuery({ id });
  const cartItem = useSelector((state) => state.cart.items);

  const productDetails = data?.product;

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
      console.log(product, "Guest cart....");
      const existProduct = guestCart?.some((item) => {
        console.log(item?.productId);

        return item?.productId === product?._id;
      });
      console.log(existProduct, "boolean value....");

      if (existProduct) {
        toast.error("Product already exist in cart!");
        return;
      }

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
      toast.success("Product added in cart");
      return;
    }

    if (product?._id) {
      const alreadyInCart = cartItem?.some((item) => {
        const itemId =
          item.productId?._id || item._id || item.id || item?.product?._id;
        return String(itemId) === String(product._id);
      });

      if (alreadyInCart) {
        toast.error("Product already exist in cart!");
        return; // yahi ensure karega ke neeche ka code tabhi chale jab item cart mein na ho
      }
      console.log(alreadyInCart, cartItem, "already exist..");
    }

    // agar product cart mein nahi hai to yeh chalega
    cartActions.handleAdd({ productId: product?._id });
    toast.success("Product added to cart");
  };

  const formateSize = String(productDetails?.subCategory).split("-").join(" ");

  console.log(reviewData, "reivewdata.....");

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
                        <a href="mailto:info@refilly.com" className="">
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
