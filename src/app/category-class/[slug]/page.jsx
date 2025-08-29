// app/category-class/[slug]/page.jsx
import CategoryClass from "../../../components/CategoryClass/CategoryClass";

export default async function CategoryPage({ params }) {
  const slugParam = await params?.slug; // ✅ await params before destructuring
  const slug = slugParam;

  return (
    <div className=" w-full flex justify-center items-center">
      <CategoryClass slug={slug} />
    </div>
  );
}
