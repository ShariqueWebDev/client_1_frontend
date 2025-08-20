import React from "react";
import { MoonLoader } from "react-spinners";
const LoaderComponent = ({ status = "status" }) => {
  return (
    <div className="fixed bg-white w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <MoonLoader size={35} />
        <div className="mt-3 text-gray-500">{status}...</div>
      </div>
    </div>
  );
};

export default LoaderComponent;
