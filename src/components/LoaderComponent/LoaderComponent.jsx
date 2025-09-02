import React from "react";
import { MoonLoader } from "react-spinners";
const LoaderComponent = ({
  status = "status",
  className,
  textClass,
  size,
  color,
}) => {
  return (
    <div
      className={`fixed bg-white w-full h-full top-0 left-0 flex justify-center items-center ${className}`}
    >
      <div className="flex flex-col items-center justify-center">
        <MoonLoader size={size || 35} color={color || "black"} />
        <div className={`mt-3 text-gray-500 ${textClass}`}>{status}...</div>
      </div>
    </div>
  );
};

export default LoaderComponent;
