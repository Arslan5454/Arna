import { Eye, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ title, videoSrc, products }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      {/* Video Section */}
      {videoSrc && (
        <div className="relative w-full h-96 overflow-hidden">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-playfair">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl overflow-hidden shadow group cursor-pointer hover:shadow-lg transition"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-rose-600">
                  {item.title}
                </h2>
                <p className="mt-2 text-rose-600 font-bold">{item.price}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    className="flex items-center gap-2 bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition"
                    onClick={() => alert(`Added ${item.title} to cart!`)}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>

                  <button
                    className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                    onClick={() =>
                      navigate(
                        `/${title.toLowerCase().split(" ")[0]}/${item.id}`
                      )
                    }
                  >
                    <Eye size={18} /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
