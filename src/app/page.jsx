import BannerCarousel from "@/components/BannerCarousel";
import Products from "@/components/Products";
import Service from "@/components/Service";
import CategoriesCarousel from "../components/CategoriesCarousel";
import HomePageCategories from "../components/HomepageCategories";

import Categories from "../components/Categories";
// import { categoriesData } from "../lib/categoriesData";

import Instagram from "../components/Instagram";

export default function Home() {
  return (
    <>
      <main className="pt-0">
        {/* 🖼 Banner Carousel */}
        <BannerCarousel />

        <CategoriesCarousel />
        {/* ⭐ Featured Products
        <section className="lg:my-16 ">
          <Products />
        </section> */}

        {/* ===================== Categories ===================== */}
        <section className="space-y-20">
          {/* 1. Basic Tee */}
          <HomePageCategories />
        </section>
        <Instagram />

        {/* 🛠 Services Section */}
        <section className="my-20">
          <Service />
        </section>
      </main>
    </>
  );
}

// import { useDispatch } from "react-redux";
// import { useLogoutUserMutation } from "@/lib/userAPI";
// import { logout } from "@/store/authSlice";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const [logoutUser] = useLogoutUserMutation();
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap(); // backend logout
//       dispatch(logout());           // redux + localStorage clear
//       router.push("/login");        // redirect login
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
//       Logout
//     </button>
//   );
// }
