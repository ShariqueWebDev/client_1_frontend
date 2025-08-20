// "use client";

// import dynamic from "next/dynamic";
// // import ReduxWrapper from "../ReduxWrapper/ReduxWrapper";
// import Footer from "../Footer";
// // import Navbar from "../Navbar"

// import { Toaster } from "react-hot-toast";

// // client-only components
// const Navbar = dynamic(() => import("../Navbar"), { ssr: false });
// const CartDrawer = dynamic(() => import("../CartDrawer"), {
//   ssr: false,
// });
// const ProtectedRoutes = dynamic(
//   () => import("../ProtectedRoutes/ProtectedRoutes"),
//   { ssr: false }
// );

// export default function ClientLayout({ children }) {
//   return (
//     // <ReduxWrapper>
//     <>
//       <Navbar />
//       {children}
//       <Footer />
//       <CartDrawer />
//       <ProtectedRoutes />
//       <Toaster position="bottom-right" />
//     </>
//     // </ReduxWrapper>
//   );
// }
