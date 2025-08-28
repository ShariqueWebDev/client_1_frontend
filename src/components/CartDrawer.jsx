// "use client";

// // import { useProducts } from "@/context/ProductContext";
// import { useState } from "react";

// export default function CartDrawer() {
//   const [cartOpen, setCartOpen] = useState(false); // ✅ Drawer state
//   const [cart, setCart] = useState([]);
//   const addToCart = (product) => {
//     // ensure price is stored as number only
//     const cleanPrice =
//       typeof product.price === "string"
//         ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
//         : product.price;

//     setCart((prev) => [...prev, { ...product, price: cleanPrice }]);

//     // simple alert
//     alert(`${product.name} added to cart!`);

//     // toast fallback
//     setToast({ message: `${product.name} added to cart!`, visible: true });
//     setTimeout(() => setToast({ message: "", visible: false }), 2000);
//   };

//   const removeFromCart = (index) => {
//     setCart((prev) => prev.filter((_, i) => i !== index));
//   };

//   // total amount
//   const total = cart.reduce((acc, item) => acc + item.price, 0);

//   return (
//     <div
//       className={`fixed inset-0 z-40 transition ${
//         cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/20 backdrop-blur-sm"
//         onClick={() => setCartOpen(false)}
//       ></div>

//       {/* Drawer */}
//       <div
//         className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
//           cartOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <button
//             onClick={() => setCartOpen(false)}
//             className="p-2 rounded hover:bg-gray-100"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             cart.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between mb-4 border-b border-b-gray-200 pb-2"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//                 <div className="flex-1 px-2">
//                   <p className="font-medium text-sm">{item.name}</p>
//                   <p className="text-gray-600 text-sm">₹{item.price}</p>
//                 </div>
//                 <button
//                   // onClick={() => removeFromCart(index)}
//                   className="text-red-500 text-sm hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-t-gray-200 space-y-3">
//           {/* ✅ Total Price */}
//           <div className="flex items-center justify-between font-semibold text-gray-800">
//             <span>Total:</span>
//             <span>₹{total}</span>
//           </div>

//           <button
//             className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 cursor-pointer transition"
//             onClick={() => alert("Checkout Coming Soon 🚀")}
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
