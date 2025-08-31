"use client";
import React from "react";
import { useGetAllCategoriesForHomeQuery } from "../redux/api/CategoryApi";
import Categories from "../components/Categories";
const HomepageCategories = () => {
  const { data } = useGetAllCategoriesForHomeQuery({
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
  });

  console.log(data, "categories data for home cat");

  return (
    <div>
      {data?.categories?.map?.((item, index) => {
        return (
          <Categories
            tagLine={item?.tag}
            mainTitle={item?.heading}
            mainDesc={item?.description}
            // slug="basic-tee"
            // products={categoriesData.basic}
            category={item?.link}
            isSlider={true}
            hrefLink={`/category-class/${item?.link}`}
          />
        );
      })}
    </div>
  );
};

export default HomepageCategories;
