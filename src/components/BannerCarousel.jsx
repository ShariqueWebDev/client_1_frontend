"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useGetAllBannerQuery } from "../redux/api/bannerApi";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { user, isAthenticated } = useSelector((state) => state.auth);

  useGetAllBannerQuery({
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
    page: 1,
    search: "",
  });

  const data = useSelector((state) => state.banner.banners);

  console.log(data.banners, "banner data .......");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data?.banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Banner Box */}
      <div className="relative w-full lg:h-screen h-[300px] max-sm:-mt-8 overflow-hidden ">
        {data?.banners?.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner?.photo}
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
