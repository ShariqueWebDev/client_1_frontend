"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const banners = [
  "/banners/banner1.png",
  "/banners/banner2.png",
  "/banners/banner3.png",
]; // only 2 images

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, isAthenticated } = useSelector((state) => state.auth);
  console.log(user, "redux store user..........", isAthenticated);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Banner Box */}
      <div className="relative w-full lg:h-screen h-[300px] max-sm:-mt-8 overflow-hidden ">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              // fill
              width={1600}
              height={700}
              className="lg:object-cover object-contain w-full h-full object-center"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
