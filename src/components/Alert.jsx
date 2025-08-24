import React, { useState } from "react";

const Alert = ({ message, statusCode, setShowAlert }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-[1px] flex justify-center items-center"
        onClick={() => setShowAlert(false)}
      >
        <div className="max-w-[400px] w-full h-[200px] bg-white flex justify-center items-center flex-col rounded-sm text-center px-5 text-sm mx-4">
          <p className="text-red-500 !text-3xl mb-3">{statusCode}</p>
          {message}
        </div>
      </div>
    </>
  );
};

export default Alert;
