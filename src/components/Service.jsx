"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsTruck } from "react-icons/bs";
import { GoGift } from "react-icons/go";
import { PiPackage } from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    icon: <GoGift className="text-black font-thin text-5xl" />,
    title: "Premium Packaging",
    description:
      "Every piece is packed with care and attention. Our premium packaging ensures your order arrives neatly folded, elegantly wrapped, and ready to impress.",
  },
  {
    icon: <BsTruck className="text-black font-bold text-5xl" />,
    title: "Shipping & Return",
    description:
      "At Clauch, we ensure a smooth and reliable shopping experience from cart to closet. Enjoy fast, secure shipping and real-time tracking on every order.",
  },
  {
    icon: <PiPackage className="text-black font-thin text-5xl" />,
    title: "Serviceable Areas",
    description: "We ship PAN India / to selected international locations",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.set(cardsRef.current, { y: 150, opacity: 0 });

    gsap.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center my-20 px-6"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
        Our Services
      </h1>
      <p className="text-gray-500 mb-12 text-center">
        We’re committed to giving you the best shopping experience
      </p>

      <div className="flex flex-wrap gap-6 justify-center">
        {servicesData.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gray-100 p-8 rounded-lg  w-96 cursor-pointer text-center"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 flex rounded-full bg-white w-14 h-14 p-3 items-center justify-center">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold mt-3 text-black">
                {service.title}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
