// // CHECKOUT
// "use client";
// import React, { useEffect, useState } from "react";
// import { useGetCartQuery } from "../../redux/api/cartApi";
// import { useSelector } from "react-redux";
// import { formatePrice } from "../../utils/features";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import {
//   useCreateOrderMutation,
//   useCreateRazorpayOrderMutation,
//   useVerifyRazorpayPaymentMutation,
//   useValidatePincodeMutation,
// } from "../../redux/api/orderApi";
// import { cartActions } from "../../redux/actions/cart-actions";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { X } from "lucide-react";
// import LoaderComponent from "../LoaderComponent/LoaderComponent";
// import LoginWithCheckout from "../Checkout/LoginWithCheckout";
// import FirebaseOtp from "../Checkout/FirebaseOtp";

// import Image from "next/image";

// // Zod schema
// const orderSchema = z.object({
//   address: z.string().min(10, "Address is required"),
//   city: z.string().min(3, "City is required"),
//   state: z.string().min(3, "State is required"),
//   country: z.string().min(3, "Country is required"),
//   pinCode: z.string().regex(/^[0-9]{6}$/, "Pin Code should be 6 digits"),
//   phoneNo: z.string().regex(/^[7-9]\d{9}$/, "Enter a valid phone number"),
// });

// const Checkout = () => {
//   const [cartMobile, setCartMobile] = useState(false);
//   const [pin, setPin] = useState("");
//   const [localStorageData, setLocalStorageData] = useState(null);

//   const { user } = useSelector((state) => state.auth);
//   const { items: cart, isLoading } = useSelector((state) => state.cart);
//   const { data, isSuccess } = useGetCartQuery(undefined, { skip: !user });
//   const [validatePincode, { data: pinData, error, isLoading: pinLoading }] =
//     useValidatePincodeMutation();

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem("checkout");
//       if (!raw) {
//         setLocalStorageData(null);
//         return;
//       }
//       const parsed = JSON.parse(raw);
//       setLocalStorageData(parsed);
//     } catch (err) {
//       console.error("Invalid checkout data in localStorage", err);
//       setLocalStorageData(null);
//     }
//   }, []);

//   const subtotal = cart.reduce(
//     (acc, item) =>
//       acc + (user ? item?.productId?.price : item?.price) * item.quantity,
//     0
//   );
//   const shippingCharges = 40;
//   const gst = subtotal * 0.18; // 18% GST
//   const finalTotal = subtotal + gst + shippingCharges; // 40 = shipping

//   const buynowPrice = localStorageData?.price;

//   const buynowSubtotal = Number(localStorageData?.price ?? 0);
//   const buynowTax = buynowSubtotal * 0.18;
//   const buynowTotal = buynowSubtotal + buynowTax + shippingCharges;

//   const totalToUse = cart.length === 0 ? buynowTotal : finalTotal;
//   const subtotalToUse = cart.length === 0 ? buynowSubtotal : subtotal;
//   const taxToUse = cart.length === 0 ? buynowTax : gst;

//   console.log(localStorageData, "Parse Prouduct");

//   useEffect(() => {
//     if (!pin) return;

//     const timer = setTimeout(() => {
//       validatePincode({ pin });
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timer);
//   }, [pin]);

//   const router = useRouter();

//   console.log(cart, "Checkout Page......");

//   // React Hook Form
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(orderSchema),
//   });

//   const [paymentMethod, setPaymentMethod] = useState("Razorpay");

//   // Order creation mutations
//   const [createOrder, { isLoading: orderLoading, isSuccess: orderSucceed }] =
//     useCreateOrderMutation();
//   const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
//   const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

//   const isCartLoading = isLoading || (user && !isSuccess);

//   // Total calculation

//   // console.log(cart, "cart data..");

//   // Autofill City, District, State from DB
//   useEffect(() => {
//     if (pinData?.success) {
//       setValue("city", pinData.data.city || "");
//       setValue("state", pinData.data.state || "");
//       setValue("country", "India");
//     }
//   }, [pinData, setValue]);

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup to remove script on unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   console.log(localStorageData, "checout dataaa.....");

//   // Handle order success
//   useEffect(() => {
//     if (orderSucceed) {
//       cartActions.handleClear();
//       router.replace("/my-orders");
//     }
//   }, [orderSucceed, router]);

//   // Form submission
//   const onSubmit = async (formData) => {
//     console.log(formData, cart, "form data.............");

//     if (cart.length === 0 && localStorageData === null) {
//       toast.error("Cart is empty");
//       return;
//     }

//     if (!Number.isFinite(totalToUse) || totalToUse <= 0) {
//       toast.error("Invalid cart total");
//       return;
//     }

//     if (paymentMethod === "COD") {
//       try {
//         await createOrder({
//           shippingInfo: formData,
//           orderItems: cart.length === 0 ? localStorageData : cart,
//           subtotal: subtotalToUse,
//           tax: taxToUse,
//           shippingCharges: shippingCharges,
//           discount: 0,
//           total: totalToUse,
//           paymentInfo: {
//             id: "COD_" + Date.now(),
//             status: "Pending",
//             method: "Cash On Delivery",
//           },
//           user: user?._id,
//         }).unwrap();

//         toast.success("Order placed with COD!");
//         cartActions.handleClear();
//         router.replace("/my-orders");
//       } catch (err) {
//         toast.error("COD order failed");
//         console.error("COD order error:", err);
//       }
//       return; // ✅ ensure Razorpay block never runs
//     }

//     console.log("Creating razorpay order with amount (rupees):", totalToUse, {
//       subtotalToUse,
//       taxToUse,
//       totalToUse,
//     });

//     // ✅ Razorpay flow
//     try {
//       if (!Number.isFinite(totalToUse)) {
//         toast.error("Payment amount invalid: " + String(totalToUse));
//         console.error("Invalid payment amount", {
//           totalToUse,
//           buynowSubtotal,
//           localStorageData,
//         });
//         return;
//       }
//       const response = await createRazorpayOrder(totalToUse).unwrap();
//       const razorpayData = response.data;

//       if (!razorpayData?.id || !razorpayData?.amount) {
//         toast.error("Failed to create Razorpay order");
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//         amount: razorpayData.amount,
//         currency: "INR",
//         name: "Refilly",
//         description: "Order Payment",
//         order_id: razorpayData.id,
//         handler: async (response) => {
//           try {
//             await verifyRazorpayPayment({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderData: {
//                 shippingInfo: formData,
//                 orderItems: cart.length === 0 ? localStorageData : cart,
//                 subtotal: subtotalToUse,
//                 tax: taxToUse,
//                 shippingCharges,
//                 discount: 0,
//                 total: totalToUse,
//               },
//             }).unwrap();

//             toast.success("Payment successful!");
//             cartActions.handleClear();
//             router.replace("/my-orders");
//           } catch (err) {
//             toast.error("Payment verification failed");
//             console.error("Verification error:", err);
//           }
//         },
//         prefill: {
//           name: user?.name,
//           email: user?.email,
//           contact: formData.phoneNo,
//         },
//         theme: { color: "#F37254" },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (err) {
//       toast.error("Payment failed");
//       console.error("Razorpay order creation error:", err);
//     }
//   };

//   // Conditional rendering after Hooks
//   if (isCartLoading) {
//     return <LoaderComponent status="Loading cart..." />;
//   }

//   if (!user) {
//     return <LoginWithCheckout />;
//   }

//   console.log(cart.length, cart, "length of cart....");

//   return (
//     <div className="flex lg:flex-row flex-col min-h-screen">
//       {/* Left Side Form */}
//       <div className="lg:w-[55%] w-full max-sm:px-3 px-20 py-10">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex items-center gap-1 max-sm:hidden">
//             <Image
//               src={"/logo/refilly.webp"}
//               width={40}
//               height={200}
//               alt="Refilly"
//             />
//             <p className="text-2xl font-semibold text-gray-700">Refilly</p>
//           </div>
//           <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

//           <input
//             disabled={cart.length === 0 && localStorageData === null}
//             {...register("address")}
//             placeholder="Full Address"
//             className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//           />
//           {errors.address && (
//             <p className="text-red-500 -mt-2 text-sm">
//               {errors.address.message}
//             </p>
//           )}

//           <div className="flex lg:flex-row flex-col gap-3 items-center">
//             <div className="w-full">
//               <input
//                 disabled={cart.length === 0 && localStorageData === null}
//                 {...register("city")}
//                 placeholder="City"
//                 className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//               />
//               {errors.city && (
//                 <p className="text-red-500 mt-2 text-sm">
//                   {errors.city.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-full">
//               <input
//                 disabled={cart.length === 0 && localStorageData === null}
//                 {...register("state")}
//                 placeholder="State"
//                 className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//               />
//               {errors.state && (
//                 <p className="text-red-500 mt-2 text-sm">
//                   {errors.state.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex lg:flex-row flex-col gap-3 items-center">
//             <div className="w-full">
//               <input
//                 disabled={cart.length === 0 && localStorageData === null}
//                 {...register("country")}
//                 placeholder="Country"
//                 className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//               />
//               {errors.country && (
//                 <p className="text-red-500 mt-2 text-sm">
//                   {errors.country.message}
//                 </p>
//               )}
//             </div>
//             <div className="w-full relative">
//               <input
//                 {...register("pinCode")}
//                 disabled={cart.length === 0 && localStorageData === null}
//                 type="number"
//                 value={pin}
//                 onChange={(e) => {
//                   setPin(e.target.value);
//                   setValue("pinCode", e.target.value); // 👈 important
//                 }}
//                 className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//                 placeholder="Pin Code"
//               />

//               {/* Loading */}
//               {pinLoading && (
//                 <p className="text-blue-500 absolute top-1.5 text-sm right-7 mt-1">
//                   Checking...
//                 </p>
//               )}

//               {/* Invalid */}
//               {error && !pinLoading && pin.length > 0 && (
//                 <p className="text-red-500 absolute top-1.5 text-sm right-7 mt-1">
//                   Invalid Pincode
//                 </p>
//               )}

//               {/* Valid */}
//               {/* {pinData?.success && !pinLoading && (
//                 <p className="text-green-600 absolute top-1.5 text-sm right-5 mt-1">
//                   Valid Pincode
//                 </p>
//               )} */}
//             </div>
//           </div>
//           <input
//             type="text"
//             maxLength={10}
//             {...register("phoneNo")}
//             disabled={cart.length === 0 && localStorageData === null}
//             placeholder="Phone Number"
//             className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
//             onInput={(e) => {
//               e.target.value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
//             }}
//           />

//           {errors.phoneNo && (
//             <p className="text-red-500 -mt-2 text-sm">
//               {errors.phoneNo.message}
//             </p>
//           )}

//           {/* Payment Method */}
//           <div className="flex gap-4 mt-4 mb-6 lg:text-sm text-xs">
//             <div className="flex gap-1.5 items-center">
//               <input
//                 disabled={cart.length === 0 && localStorageData === null}
//                 type="radio"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={() => setPaymentMethod("COD")}
//               />
//               <label>Cash on Delivery</label>
//             </div>
//             <div className="flex gap-1.5 items-center">
//               <input
//                 disabled={cart.length === 0 && localStorageData === null}
//                 type="radio"
//                 value="Razorpay"
//                 checked={paymentMethod === "Razorpay"}
//                 onChange={() => setPaymentMethod("Razorpay")}
//               />
//               <label>Razorpay</label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={cart.length === 0 && localStorageData === null}
//             className={`${
//               cart.length === 0 && localStorageData === null
//                 ? "cursor-not-allowed"
//                 : "cursor-pointer hover:bg-yellow-600"
//             } bg-yellow-500 text-white py-1.5 px-3 text-sm rounded`}
//           >
//             Place Order
//           </button>
//         </form>
//         {/* <FirebaseOtp /> */}
//       </div>

//       {/* Right Side Cart Summary */}
//       <div className={`lg:w-[45%] max-sm:hidden w-full lg:px-5`}>
//         <div className="overflow-y-auto h-screen hide-scrollbar p-4 w relative">
//           {cart.length === 0 && localStorageData === null ? (
//             <div className="h-full flex flex-col items-center justify-center">
//               <div className="w-[120px]">
//                 <Image
//                   src={"/assets/empty-cart.webp"}
//                   width={500}
//                   height={500}
//                   alt="empty cart image"
//                 />
//               </div>
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : cart.length === 0 ? (
//             <div className="relative">
//               <div className="flex items-center gap-3 mb-4 border-b border-b-gray-200 pb-2">
//                 <Image
//                   width={200}
//                   height={200}
//                   src={localStorageData?.photos?.[0]}
//                   alt={localStorageData?.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div className="px-2">
//                   <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2">
//                     {localStorageData?.name}
//                   </p>
//                   <div className="flex items-center gap-5">
//                     <p className="text-gray-600 text-sm font-semibold">
//                       {formatePrice(localStorageData?.price)}
//                     </p>
//                     <p className="text-gray-400 text-xs">
//                       Quantity: {localStorageData?.quantity}
//                     </p>
//                     <p className="text-gray-400 text-xs">
//                       Size: {localStorageData?.size}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             cart.map((item) => {
//               const prod = user ? item?.productId : item;
//               return (
//                 <div className="relative" key={prod?._id}>
//                   <div className="flex items-center gap-3 mb-4 border-b border-b-gray-200 pb-2">
//                     <Image
//                       width={200}
//                       height={200}
//                       src={prod?.photos?.[0]}
//                       alt={prod?.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div className="px-2">
//                       <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2">
//                         {prod?.name}
//                       </p>
//                       <div className="flex items-center gap-5">
//                         <p className="text-gray-600 text-sm font-semibold">
//                           {formatePrice(prod?.price)}
//                         </p>
//                         <p className="text-gray-400 text-xs">
//                           Quantity: {item?.quantity}
//                         </p>
//                         <p className="text-gray-400 text-xs">
//                           Size: {item?.size}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//           <div className="p-4 sticky -bottom-4 bg-white">
//             <div className="flex items-center justify-between font-semibold text-gray-800">
//               <span>Sub Total:</span>
//               <span>₹{cart.length === 0 ? buynowPrice : subtotal}</span>
//             </div>
//             <div className="flex items-center justify-between font-semibold text-gray-800">
//               <span>GST:</span>
//               <span>
//                 ₹
//                 {cart.length === 0
//                   ? (buynowPrice * 0.18).toFixed(2)
//                   : gst.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex items-center justify-between font-semibold text-gray-800">
//               <span>Shipping Charges:</span>
//               <span>₹40</span>
//             </div>
//             <hr className="text-gray-300 my-3" />
//             <div className="flex items-center justify-between font-semibold text-gray-800">
//               <span>Total:</span>
//               <span>
//                 ₹
//                 {cart.length === 0
//                   ? buynowPrice + (buynowPrice * 0.18 + shippingCharges)
//                   : finalTotal}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Cart Popup */}
//       <div
//         className={`fixed bottom-0 bg-white w-full z-10 transform transition-transform duration-300 ${
//           cartMobile ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         {/* Close Button */}
//         <div className="absolute top-0 z-10 flex justify-between items-center px-4 pb-3 pt-4 bg-white border-b border-gray-300 cursor-pointer w-full">
//           <div className="flex items-center gap-1">
//             <Image
//               src={"/logo/refilly.webp"}
//               width={40}
//               height={200}
//               alt="Refilly"
//             />
//             <p className="text-2xl font-semibold text-gray-700">Refilly</p>
//           </div>
//           <div onClick={() => setCartMobile(false)}>
//             <X size={17} />
//           </div>
//         </div>

//         {/* Cart Content */}
//         <div className="overflow-y-auto h-screen hide-scrollbar p-4 pt-24 pb-14 relative">
//           {cart.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center">
//               <div className="w-[120px]">
//                 <Image
//                   src={"/assets/empty-cart.webp"}
//                   width={500}
//                   height={500}
//                   alt="empty cart image"
//                 />
//               </div>
//               <p className="text-gray-500 text-sm">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => {
//               const prod = user ? item?.productId : item;
//               console.log(prod, "mobile checkout.....");

//               return (
//                 <div className="relative" key={prod?._id}>
//                   <div className="flex items-center gap-3 border-b border-b-gray-200 pb-2">
//                     <Image
//                       width={200}
//                       height={200}
//                       src={prod?.photos[0]}
//                       alt={prod?.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div className="px-2">
//                       <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2">
//                         {prod?.name}
//                       </p>
//                       <div className="flex items-center gap-5">
//                         <p className="text-gray-600 text-sm font-semibold">
//                           {formatePrice(prod?.price)}
//                         </p>
//                         <p className="text-gray-400 text-xs">
//                           Quantity: {item?.quantity}
//                         </p>
//                         <p className="text-gray-400 text-xs">
//                           Size: {item?.size}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//           <div className="p-4 sticky -bottom-4 bg-white">
//             <div className="p-4 sticky -bottom-4 bg-white">
//               <div className="flex items-center justify-between font-semibold text-gray-800">
//                 <span>Sub Total:</span>
//                 <span>₹{cart.length === 0 ? buynowPrice : subtotal}</span>
//               </div>
//               <div className="flex items-center justify-between font-semibold text-gray-800">
//                 <span>GST:</span>
//                 <span>₹{cart.length === 0 ? buynowPrice * 0.18 : gst}</span>
//               </div>
//               <div className="flex items-center justify-between font-semibold text-gray-800">
//                 <span>Total:</span>
//                 <span>
//                   ₹{cart.length === 0 ? buynowPrice * 0.18 : finalTotal}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Toggle Button */}
//       <div
//         className="fixed gap-2 md:hidden bottom-0 z-20 flex justify-center items-center w-full py-3 border bg-white border-t border-gray-300 rounded-tl-xl rounded-tr-xl cursor-pointer"
//         onClick={() => setCartMobile(!cartMobile)}
//       >
//         <Image
//           src={"/assets/order-summary.png"}
//           width={22}
//           height={22}
//           alt="order summary"
//         />
//         <p className="text-sm">Order summary</p>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// // SINGLE PRODUCT DETAILS
// "use client";
// import React, { useEffect, useState } from "react";
// import Categories from "../../components/Categories";
// import LoaderComponent from "../LoaderComponent/LoaderComponent";
// import { categoriesData } from "@/lib/categoriesData";
// import {
//   useGetRecommendedProductsQuery,
//   useGetRelatedProductQuery,
//   useGetSingleProductDetailsQuery,
// } from "../../redux/api/productApi";
// import {
//   useGetReviewByIdQuery,
//   useAddCustomerReviewMutation,
// } from "../../redux/api/reviewApi";
// import { useClearCartItemMutation } from "../../redux/api/cartApi";
// import { Clock, Mail, MapPin, Phone } from "lucide-react";
// import Image from "next/image";
// import { formatePrice, calculatePercentage } from "../../utils/features";
// import { cartActions } from "@/redux/actions/cart-actions";
// import { getGuestCart, setGuestCart } from "@/utils/addToCart";
// import { setCart } from "@/redux/reducers/cart-reducer";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const ProductDetailsPage = ({ slug }) => {
//   const [reviewText, setReviewText] = useState("");
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedSize, setSelectedSize] = useState(""); // track user selected size

//   const [rating, setRating] = useState(5); // default 5 stars
//   const [user, setUser] = useState(null);
//   const dispatch = useDispatch();
//   const id = user?._id;

//   const { data, isLoading } = useGetSingleProductDetailsQuery({ slug });
//   const [clearCartItem] = useClearCartItemMutation();
//   const { data: reviewData, isLoading: reviewLoading } =
//     useGetReviewByIdQuery(slug);
//   // const { data: recommendedData } = useGetRecommendedProductsQuery({ id });
//   const cartItem = useSelector((state) => state.cart.items);

//   const router = useRouter();

//   const productDetails = data?.product;

//   const [addReview, { isLoading: addReviewLoading }] =
//     useAddCustomerReviewMutation();

//   // Handle submit review
//   const handleAddReview = async () => {
//     if (!user) {
//       toast.error("You must be logged in to add a review");
//       return;
//     }
//     if (!reviewText.trim()) {
//       toast.error("Please write a review");
//       return;
//     }

//     try {
//       await addReview({
//         productId: slug,
//         comment: reviewText,
//         rating,
//       }).unwrap();

//       toast.success("Review added successfully!");
//       setReviewText(""); // clear textarea
//       setRating(5); // reset rating
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add review");
//     }
//   };

//   const handleCartItemData = () => {
//     if (!selectedSize) return;
//     clearCartItem();
//   };
//   //   console.log(data, "single product page data and slug...........");
//   // console.log(relatedData, "Related product data...........");

//   useEffect(() => {
//     if (data?.product?.photos?.length > 0) {
//       setSelectedImage(data.product.photos[0]); // default pehli image
//     }
//   }, [data]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user"); // get from localStorage
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // agar object stored hai
//     }
//   }, []);

//   const handleClearData = () => {
//     if (!selectedSize) return;
//     localStorage.removeItem("checkout");
//   };

//   const handleAddToCart = (product) => {
//     if (!selectedSize) {
//       toast.error("Please select a size before adding to cart");
//       return;
//     }

//     if (!user) {
//       let guestCart = getGuestCart();
//       const existProduct = guestCart.find(
//         (item) => item.productId === product._id
//       );

//       console.log(existProduct, "Exist product........");

//       if (existProduct) {
//         existProduct.size = selectedSize;
//         setGuestCart(guestCart);
//         dispatch(setCart(guestCart));

//         toast.success("Product size updated in cart");
//         return;
//       }

//       guestCart.push({
//         name: product.name,
//         productId: product._id,
//         photos: product.photos?.length ? product.photos : [product.photo],
//         size: selectedSize,
//         price: product.price,
//         quantity: 1,
//         stock: product.stock,
//       });

//       setGuestCart(guestCart);
//       dispatch(setCart(guestCart));
//       console.log(guestCart, ".....Guest Cart.....");

//       toast.success("Product added to cart");
//       return;
//     }

//     // Logged in user cart logic
//     const alreadyInCart = cartItem?.some(
//       (item) =>
//         String(item.productId) === String(product._id) &&
//         item.size === selectedSize
//     );

//     if (alreadyInCart) {
//       toast.error("Product with this size already in cart");
//       return;
//     }
//     console.log(alreadyInCart, "Already card in cart");

//     // Add to cart with size
//     cartActions.handleAdd({ productId: product._id, size: selectedSize });
//     toast.success("Product added to cart");
//   };

//   const formateSize = String(productDetails?.subCategory).split("-").join(" ");

//   const handleDirectCheckout = async (product) => {
//     console.log(selectedSize, "function DATA");

//     if (selectedSize === "" || !selectedSize) {
//       toast.error("Please select size");
//       return;
//     }

//     const checkoutProductData = {
//       name: product.name,
//       description: product.description,
//       color: product.color,
//       photos: product.photos,
//       photoPublicId: product.photoPublicId,
//       mrpPrice: product.mrpPrice,
//       price: product.price,
//       stock: product.stock,
//       subCategory: product.subCategory,
//       productId: product._id,
//       size: selectedSize,
//     };
//     let storeProduct = await localStorage.setItem(
//       "checkout",
//       JSON.stringify(checkoutProductData)
//     );
//     router.push("/checkout");
//     console.log(storeProduct, "Store Product....");
//   };

//   console.log(data?.product, "single product data.......");

//   return (
//     <div>
//       {isLoading ? (
//         <LoaderComponent status="Product Loading..." />
//       ) : (
//         <>
//           <div className="max-w-5xl mx-auto px-4 lg:py-12  pt-12  ">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-8 items-center">
//               {/* 🖼️ Left Section - Product Images */}
//               <div className="w-full flex flex-col items-center">
//                 {/* Main image frame */}
//                 <div className="w-full border border-gray-200 rounded-md overflow-hidden">
//                   <Image
//                     src={selectedImage || productDetails?.photo}
//                     alt="Product Main Image"
//                     width={700}
//                     height={700}
//                     className="object-cover w-full h-[500px] transition-all duration-300"
//                   />
//                 </div>

//                 {/* Thumbnail images */}
//                 <div className="flex flex-wrap justify-center gap-2 mt-4">
//                   {productDetails?.photos?.map((img, index) => (
//                     <div
//                       key={index}
//                       onClick={() => setSelectedImage(img)}
//                       className={`cursor-pointer border rounded-md p-1 transition-all duration-200 ${
//                         selectedImage === img
//                           ? "border-yellow-500 scale-105"
//                           : "border-gray-300 hover:border-yellow-400"
//                       }`}
//                     >
//                       <Image
//                         src={img}
//                         alt={`Thumbnail ${index}`}
//                         width={80}
//                         height={80}
//                         className="object-cover w-16 h-16 rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h1 className="text-2xl md:text-4xl font-bold  text-gray-800 mb-4">
//                   {productDetails?.name}
//                 </h1>
//                 <div className="flex items-baseline gap-5">
//                   <p className="text-2xl text-primary-600 font-semibold mb-6">
//                     {formatePrice(productDetails?.price)}
//                   </p>

//                   <p className="text-xl text-primary-600 font-normal mb-6 line-through text-gray-400">
//                     {formatePrice(productDetails?.mrpPrice)}
//                   </p>
//                   <p className="text-xl text-primary-600 font-normal mb-6 text-green-500">
//                     {calculatePercentage(
//                       productDetails?.mrpPrice,
//                       productDetails?.price
//                     )}
//                     % <span className="font-normal">off</span>
//                   </p>
//                 </div>
//                 <p className="text-gray-600 text-sm leading-relaxed mb-8">
//                   {productDetails?.description}
//                 </p>

//                 <div className="mb-4">
//                   <label className="text-sm font-medium mb-1 block">
//                     Select Size:
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => {
//                       const isAvailable = productDetails?.sizes?.includes(size);

//                       return (
//                         <button
//                           key={size}
//                           disabled={!isAvailable}
//                           type="button"
//                           onClick={() => isAvailable && setSelectedSize(size)}
//                           className={`
//                             ${
//                               !isAvailable
//                                 ? "line-through hover:cursor-not-allowed text-gray-300"
//                                 : ""
//                             }
//                             px-3 py-1 border rounded cursor-pointer
//                             ${
//                               selectedSize === size
//                                 ? "bg-yellow-500 text-white border-yellow-500"
//                                 : "border-gray-300 text-gray-700 hover:border-yellow-400"
//                             }
//                           `}
//                         >
//                           {size}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {productDetails?.stock === 0 && (
//                   <p className=" text-red-500 mb-3 ">Out of stock</p>
//                 )}
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="flex gap-4"
//                     onClick={() => {
//                       // cartActions.handleAdd({ productId: productDetails?._id });
//                       handleAddToCart(productDetails);
//                     }}
//                   >
//                     <button
//                       disabled={productDetails?.stock === 0}
//                       className={` ${
//                         productDetails?.stock === 0
//                           ? "bg-yellow-300 cursor-not-allowed"
//                           : "bg-yellow-500 hover:bg-yellow-600  cursor-pointer"
//                       } px-6 py-2 text-white  rounded-sm text-sm   transition`}
//                       onClick={handleClearData}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleDirectCheckout(productDetails);
//                       handleCartItemData();
//                     }}
//                     disabled={productDetails?.stock === 0}
//                     className={` ${
//                       productDetails?.stock === 0
//                         ? "bg-yellow-300 cursor-not-allowed"
//                         : "bg-yellow-500 hover:bg-yellow-600  cursor-pointer"
//                     } px-6 py-2 text-white  rounded-sm text-sm   transition`}
//                   >
//                     Buy now
//                   </button>
//                 </div>
//                 <p className="text-gray-600 text-sm leading-relaxed mt-5 mb-3 capitalize">
//                   Size: {formateSize}
//                 </p>
//                 <p className="text-gray-600 text-sm leading-relaxed mb-5">
//                   Color: {productDetails?.color}
//                 </p>
//                 <div className="mt-5">
//                   <h3 className="lg:text-lg text-base">
//                     Contact us more details
//                   </h3>
//                   <div className="mt-3 lg:text-sm text-xs text-gray-600">
//                     <div className="flex gap-3">
//                       <Phone size={16} />
//                       <div className="flex gap-3">
//                         <a href="tel:+917385346401" className="">
//                           +91 7385346401
//                         </a>
//                         <div>|</div>{" "}
//                         <a href="tel:+919527988214" className="">
//                           +91 9527988214
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-3">
//                       <Clock size={16} />
//                       <div className="">
//                         Timings - 10 am to 10 pm (Oprational all days)
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-3">
//                       <Mail size={16} />
//                       <div className="">
//                         <a href="mailto:shahfiroz677@gmail.com" className="">
//                           shahfiroz677@gmail.com
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-3">
//                       <Mail size={16} />
//                       <div className="">
//                         <a href="mailto:shahfiroz677@gmail.com" className="">
//                           ansaritauheed003@gmail.com
//                         </a>
//                       </div>
//                     </div>
//                     <div className="flex gap-3 mt-3">
//                       <MapPin size={16} />
//                       <div className="">
//                         <p className="">
//                           Rafique hotel, Naigaon Road, batulsalam masjid
//                           opposite akhtar Compound, bhiwandi, Thane Maharashtra
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-16 max-w-[1220px] w-full mx-auto max-sm:px-4">
//             <h3 className="text-xl font-semibold">Customer Reviews</h3>

//             {reviewData?.reviews?.length === 0 ? (
//               <div className="text-sm mt-5 text-gray-500">
//                 No customer reviews available
//               </div>
//             ) : (
//               reviewData?.reviews?.map((rev) => (
//                 <div
//                   key={rev._id}
//                   className="border-b pb-3 mt-5 border-gray-200"
//                 >
//                   <div className="font-semibold text-sm capitalize">
//                     {rev?.name}
//                   </div>
//                   <div className="text-sm mt-1 text-gray-500">
//                     {rev?.comment}
//                   </div>
//                   <div className="text-sm text-yellow-500 mt-1">
//                     Rating: {rev?.rating} {"⭐".repeat(rev?.rating)}
//                   </div>
//                 </div>
//               ))
//             )}
//             {!user && (
//               <div className="">
//                 <Link href={"/login"}>
//                   <button className="bg-yellow-500 text-white mt-3 px-3 py-1.5 text-sm rounded hover:bg-yellow-600 cursor-pointer">
//                     Add review
//                   </button>
//                 </Link>
//               </div>
//             )}
//             {/* Add Review Form */}
//             {user && (
//               <div className="mt-6">
//                 <textarea
//                   value={reviewText}
//                   onChange={(e) => setReviewText(e.target.value)}
//                   placeholder="Write your review here..."
//                   className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
//                   rows={4}
//                 />

//                 <div className="flex items-center gap-3 mb-3">
//                   <label className="text-sm font-medium">Rating:</label>
//                   <select
//                     value={rating}
//                     onChange={(e) => setRating(Number(e.target.value))}
//                     className="border border-gray-300 rounded p-1 text-sm  cursor-pointer"
//                   >
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <option key={num} value={num} className="text-sm">
//                         {num} {"⭐".repeat(num)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   onClick={handleAddReview}
//                   disabled={reviewLoading}
//                   className="bg-yellow-500 text-white mt-3 px-3 py-1.5 text-sm rounded hover:bg-yellow-600 cursor-pointer"
//                 >
//                   {reviewLoading ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="mt-10">
//             <Categories
//               // tagLine=""
//               relatedCarousel={true}
//               mainTitle="Related Products"
//               // slug={slug}
//               // products={relatedData?.products}
//               isSlider={true}
//               category={data?.product?.category}
//               productId={productDetails?._id}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductDetailsPage;
