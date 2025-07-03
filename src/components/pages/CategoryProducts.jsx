import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost/api/products.php?category=${categoryId}`
        );
        if (!res.ok) throw new Error("Failed to fetch category products");
        const data = await res.json();
        console.log("Products data:", data); // 🟢 YAHAN CHECK KARO
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600">Loading products...</div>
    );
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const original = parseFloat(product.originalPrice);
          const discount = parseFloat(product.discountPrice);
          const hasDiscount = discount > 0 && discount < original;
          const discountPercent = hasDiscount
            ? Math.round(((original - discount) / original) * 100)
            : 0;

          return (
            <div
              key={product.id}
              className="relative border rounded-2xl overflow-hidden shadow hover:shadow-xl transition group bg-white flex flex-col h-full"
            >
              {/* Discount badge */}
              {hasDiscount && (
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                  -{discountPercent}%
                </div>
              )}

              {/* Out of stock badge */}
              {product.stock <= 0 && (
                <div className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                  Out of Stock
                </div>
              )}

              <img
                src={`http://localhost/${product.mainImage}`}
                alt={product.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-rose-600 font-bold text-lg">
                      PKR {hasDiscount ? discount : original}
                    </span>
                    {hasDiscount && (
                      <span className="text-gray-400 line-through text-sm">
                        PKR {original}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  key={product.id}
                  to={`/category/${categoryId}/product/${product.id}`}
                  className="inline-block bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium py-2 px-4 rounded transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryProducts;
