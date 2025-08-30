import React from "react";
import SingleProductDetials from "../../../components/SingleProductDetails/SingleProductDetails";

const SingleProductDetailsPage = async ({ params }) => {
  const { slug } = await params;
  console.log(slug, "params.................");

  return (
    <div>
      <SingleProductDetials slug={slug} />
    </div>
  );
};

export default SingleProductDetailsPage;
