import React from "react";

const UnthorizedPage = () => {
  return (
    <div className="h-[500px] flex-col text-3xl text-red-500 flex justify-center items-center">
      Not Authorized!
      <div className="text-black text-sm mt-3">
        Note: Access restricted. Only admins are allowed to view author pages.{" "}
      </div>
    </div>
  );
};

export default UnthorizedPage;
