// "use client";
// import React, { createContext, useContext, useState } from "react";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {

//   const [toast, setToast] = useState({ message: "", visible: false });
//   const [cartOpen, setCartOpen] = useState(false); // ✅ Drawer state

//   return (
//     <ProductContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         cartOpen,
//         setCartOpen, // ✅ expose to Navbar & Drawer
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => useContext(ProductContext);
