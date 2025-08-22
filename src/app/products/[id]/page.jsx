import Categories from "@/components/Categories";
import { categoriesData } from "@/lib/categoriesData";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductDetailsPage = () => {
  return (
    <div>
      <>
        <div className="max-w-5xl mx-auto px-6 py-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="w-full border border-gray-200 rounded-md">
              <Image
                src={"/assets/anime.png"}
                alt={"Anime Tshirt"}
                width={500}
                height={500}
                className=""
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                T-Shirt
              </h1>
              <p className="text-2xl text-primary-600 font-semibold mb-6">
                Rs. 250
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                This premium cotton t-shirt is designed for ultimate comfort and
                style. Lightweight fabric for everyday wear.
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-yellow-500 rounded-sm  text-gray-800 cursor-pointer  hover:bg-yellow-600 transition">
                  Add to Cart
                </button>
              </div>
              <div className="mt-8">
                <h3 className="lg:text-lg text-base">
                  Contact us more details
                </h3>
                <div className="mt-3 lg:text-sm text-xs text-gray-600">
                  <div className="flex gap-3">
                    <Phone size={16} />
                    <div className="flex gap-3">
                      <a href="+917448135379" className="">
                        +91 7448135379
                      </a>
                      <div>|</div>{" "}
                      <a href=" +917498881806" className="">
                        +91 7498881806
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
                        info@theclauch.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <MapPin size={16} />
                    <div className="">
                      <p className="">
                        Bhiwandi Dhamankar Naka Near Ammar Hotel Amina Compound
                        Clauch By Lastchoice&com 421302
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
            slug="anime"
            products={categoriesData.anime}
            isSlider={true}
          />
        </div>
      </>
    </div>
  );
};

export default ProductDetailsPage;
