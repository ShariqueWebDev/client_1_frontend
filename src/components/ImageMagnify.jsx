"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ImageZoom({ imgPath }) {
  const containerRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "0% 0%",
    opacity: 0,
  });

  const handleMove = (e) => {
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      opacity: 1,
    });
  };

  return (
    <div className="flex gap-6">
      {/* ORIGINAL IMAGE */}
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setZoomStyle({ ...zoomStyle, opacity: 0 })}
        className="relative w-full lg:h-[600px] h-[500px] overflow-hidden  rounded-lg"
      >
        <Image
          width={1600}
          height={700}
          src={imgPath}
          alt="Fabric"
          className="object-cover w-full h-full"
          draggable={false}
        />

        {/* ZOOM LAYER */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-150"
          style={{
            backgroundImage: `url(${imgPath})`,
            backgroundSize: "400%", // zoom level
            backgroundPosition: zoomStyle.backgroundPosition,
            opacity: zoomStyle.opacity,
          }}
        ></div>
      </div>

      {/* SIDE DETAIL PREVIEW */}
      {/* <div className="w-[400px] h-[400px] border rounded-lg overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${imgPath})`,
            backgroundSize: "600%",
            backgroundPosition: zoomStyle.backgroundPosition,
            width: "100%",
            height: "100%",
            transition: "background-position 0.1s",
          }}
        />
      </div> */}
    </div>
  );
}
