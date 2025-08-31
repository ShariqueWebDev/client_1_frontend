import React from "react";
import SubCategoryComponent from "../../../components/SubCategory/SubCategoryComponent";

const SubCategory = async ({ params }) => {
  const { slug } = await params;
  return (
    <div>
      <SubCategoryComponent slug={slug} />
    </div>
  );
};

export default SubCategory;
