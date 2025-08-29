"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const AosWrapper = () => {
  useEffect(() => {
    Aos.init({
      // delay: 200,
      // once: true,
      duration: 100,
      // offset: 150,
    });
  }, []);

  return null; // wrapper kuch render nahi karega
};

export default AosWrapper;
