import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost/api/products.php?category=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("Fetched category products:", data);
        setProducts(data);

        if (data.length > 0)
          setCategoryName(data[0].category_name || "Category");
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-gray-700">
        No products found for this category.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-8 text-rose-600">
        {categoryName} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.mainImage}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <div className="mt-2">
              <p className="text-rose-600 font-bold">
                PKR {product.originalPrice}
              </p>
              {product.discountPrice > 0 && (
                <p className="text-gray-500 line-through text-sm">
                  PKR {product.discountPrice}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
