import BannerCarousel from "@/components/BannerCarousel";
import Products from "@/components/Products";
import Service from "@/components/Service";

import Categories from "../components/Categories";

// ✅ Import categoriesData
import { categoriesData } from "../lib/categoriesData";

export default function Home() {
  return (
    <>
      <main className="pt-0">
        {/* 🖼 Banner Carousel */}
        <BannerCarousel />

        {/* ⭐ Featured Products */}
        <section className="lg:my-16 ">
          <Products />
        </section>

        {/* ===================== Categories ===================== */}
        <section className="space-y-20">
          {/* 1. Basic Tee */}
          <Categories
            tagLine="Essential Wear"
            mainTitle="Basic Tee Collection"
            mainDesc="Simple, comfortable, and versatile everyday tees designed to pair with anything. Your go-to wardrobe essential."
            slug="basic-tee"
            products={categoriesData.basic}
            isSlider={true}
          />

          {/* 2. Anime */}
          <Categories
            tagLine="Otaku Special"
            mainTitle="Anime Tees"
            mainDesc="Celebrate your favorite anime heroes and iconic scenes with bold, high-quality prints that bring your fandom to life."
            slug="anime"
            products={categoriesData.anime}
            isSlider={true}
          />

          {/* 3. Aesthetic */}
          <Categories
            tagLine="Trendy Fits"
            mainTitle="Aesthetic Tees"
            mainDesc="Minimal yet artsy designs that express personality and vibe. Perfect for fashion-forward creators and dreamers."
            slug="aesthetic"
            products={categoriesData.aesthetic}
            isSlider={true}
          />

          {/* 4. Minimal */}
          <Categories
            tagLine="Clean Style"
            mainTitle="Minimal Collection"
            mainDesc="Understated designs with a modern edge. For those who believe less is more, these tees redefine subtlety."
            slug="minimal"
            products={categoriesData.minimal}
            isSlider={true}
          />

          {/* 5. Quotes */}
          <Categories
            tagLine="Words Matter"
            mainTitle="Quote Tees"
            mainDesc="Make a statement without saying a word. Tees with powerful, witty, and motivational quotes to spark conversations."
            slug="quotes"
            products={categoriesData.quotes}
            isSlider={true}
          />

          {/* 6. Wanderlust */}
          <Categories
            tagLine="Travel Soul"
            mainTitle="Wanderlust Tees"
            mainDesc="For explorers at heart — tees inspired by travel, adventure, and the spirit of discovering the unknown."
            slug="wanderlust"
            products={categoriesData.wanderlust}
            isSlider={true}
          />

          {/* 7. Cartoon */}
          <Categories
            tagLine="Playful Prints"
            mainTitle="Cartoon Tees"
            mainDesc="Nostalgic, fun, and colorful designs inspired by your favorite cartoon characters and childhood memories."
            slug="cartoon"
            products={categoriesData.cartoon}
            isSlider={true}
          />

          {/* 8. Marvel */}
          <Categories
            tagLine="Superhero Vibes"
            mainTitle="Marvel Tees"
            mainDesc="Show off your love for Marvel superheroes — from Iron Man to Spider-Man — with tees made for true fans."
            slug="marvel"
            products={categoriesData.marvel}
            isSlider={true}
          />
        </section>

        {/* 🛠 Services Section */}
        <section className="my-20">
          <Service />
        </section>

        {/* 🔻 Footer */}
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
