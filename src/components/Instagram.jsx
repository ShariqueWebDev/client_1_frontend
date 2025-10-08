"use client";
import React, { useEffect, useRef } from "react";

const Instagram = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const speed = 2.0; // pixels per frame (~60fps) → adjust for faster/slower

    const scroll = () => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft += speed;

      // Reset to start when reaching end
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const instaImages = [
    "/assets/instagram-pic/insta1.avif",
    "/assets/instagram-pic/insta2.avif",
    "/assets/instagram-pic/insta3.avif",
    "/assets/instagram-pic/insta4.avif",
    "/assets/instagram-pic/insta5.avif",
    "/assets/instagram-pic/insta6.avif",
    "/assets/instagram-pic/insta7.avif",
    "/assets/instagram-pic/insta8.avif",
  ];

  const loopImages = [...instaImages, ...instaImages]; // for seamless loop

  return (
    <section className="relative py-16 bg-gradient-to-r from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our <span className="text-indigo-600">Social Media</span>
          </h2>
          <p className="text-gray-700 mt-4 text-sm md:text-lg max-w-2xl mx-auto">
            Join our vibrant community! Share your style with{" "}
            <span className="font-semibold text-indigo-600">#refilly</span> and
            get featured. Here are some awesome people rocking our T-shirts.
          </p>
        </div>

        {/* Continuous Scroll Section */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scrollbar-hide"
        >
          {loopImages.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 h-[420px] rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={img}
                alt="Customer wearing tshirt"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Instagram Follow Button */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/refillyofficial/?utm_source=qr&igsh=MTVkdjYwbnF1dDF1eg%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            {/* Instagram Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.5 2C4.462 2 2 4.462 2 7.5v9C2 19.538 4.462 22 7.5 22h9c3.038 0 5.5-2.462 5.5-5.5v-9C22 4.462 19.538 2 16.5 2h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-3a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
