import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Tab } from "@headlessui/react";
import ProductGallery from "./ProductGallery";
import AddToCartPopup from "./AddToCartPopup";
import CartPopup from "./CartPopup";

const ProductDetail = () => {
  const { categoryId, id } = useParams();
  const { cartItems, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setLoading(true); // taake naya product load hone pe loader dikh sake
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost/api/products.php?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // 👈 id must be in dependency array

  const handleQuantityChange = (delta) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: Number(product.discountPrice || product.originalPrice || 0), // ✅ Always a number
      image: product.mainImage
        ? `http://localhost/${product.mainImage}`
        : "/placeholder.png", // fallback if image missing
    };

    addToCart(cartItem, quantity);
    setQuantity(1);
    setIsAddToCartOpen(true);
  };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading)
    return <div className="py-20 text-center">Loading product...</div>;
  if (!product)
    return (
      <div className="py-20 text-center text-rose-600">Product not found!</div>
    );

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link to={`/category/${categoryId}`} className="hover:underline">
            Category
          </Link>{" "}
          / <span className="text-gray-800 font-semibold">{product.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow">
          {/* Gallery */}
          <div className="md:w-1/2">
            <ProductGallery
              images={[`http://localhost/${product.mainImage}`]}
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill={i < 4 ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.57L24 9.423l-6 5.848 1.416 8.257L12 18.897 4.584 23.528 6 15.271 0 9.423l8.332-1.266L12 .587z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(23 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <p className="text-rose-600 text-2xl font-bold">
                  PKR{" "}
                  {product.discountPrice > 0
                    ? product.discountPrice
                    : product.originalPrice}
                </p>
                {product.discountPrice > 0 && (
                  <p className="line-through text-gray-400 text-lg">
                    PKR {product.originalPrice}
                  </p>
                )}
                {product.discountPrice > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    On Sale
                  </span>
                )}
              </div>

              {/* Colors */}
              {product.colors && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Color</h4>
                  <div className="flex gap-3">
                    {product.colors.split(",").map((color) => (
                      <button
                        key={color.trim()}
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.trim().toLowerCase() }}
                        title={color.trim()}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Size</h4>
                  <div className="flex gap-3">
                    {product.sizes.split(",").map((size) => (
                      <button
                        key={size.trim()}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        {size.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex border rounded overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded shadow transition font-medium"
                >
                  Add to Cart
                </button>
              </div>

              {/* Social Share & Wishlist */}
              <div className="mt-8 flex items-center gap-4">
                <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-gray-700 transition">
                  <i className="fa fa-heart" /> Wishlist
                </button>
                <div className="flex gap-3">
                  <i className="fa fa-facebook-square text-blue-600 cursor-pointer text-2xl"></i>
                  <i className="fa fa-twitter text-sky-500 cursor-pointer text-2xl"></i>
                  <i className="fa fa-instagram text-pink-500 cursor-pointer text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tab.Group>
            <Tab.List className="flex border-b mb-6">
              {["Description", "Reviews", "Shipping"].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `py-2 px-4 font-medium ${
                      selected
                        ? "border-b-2 border-rose-600 text-rose-600"
                        : "text-gray-600 hover:text-rose-600"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <p className="text-gray-600">
                  No reviews yet. Be the first to write one!
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <p className="text-gray-600">
                  Fast delivery in 3-5 working days. Easy returns within 14
                  days.
                </p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Related Products Placeholder */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 text-center">
                <div className="h-40 bg-gray-100 rounded mb-2"></div>
                <p className="text-gray-700">Sample Product {i + 1}</p>
                <p className="text-rose-600 font-semibold mt-1">PKR 9999</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AddToCartPopup
        isOpen={isAddToCartOpen}
        onClose={() => setIsAddToCartOpen(false)}
        onViewCart={() => {
          setIsAddToCartOpen(false);
          setIsCartOpen(true);
        }}
        totalItems={totalItems}
      />
      <CartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
};

export default ProductDetail;
