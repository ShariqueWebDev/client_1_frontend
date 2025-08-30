// app/category-class/[slug]/page.jsx
import CategoryClass from "../../../components/CategoryClass/CategoryClass";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  return (
    <div>
      <CategoryClass slug={slug} />
    </div>
  );
}
