import React from "react";
import { useNavigate } from "react-router-dom";
import lawn from '../../assets/Women/1.png'
import printed from '../../assets/Women/2.webp'
import embroidered from '../../assets/Women/3.webp'

const UnstitchedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "LAWN",
      image: lawn, // replace with actual paths or URLs
      to: "/lawn",
    },
    {
      name: "PRINTED",
      image: printed,
      to: "/printed",
    },
    {
      name: "FEATURED",
      image: embroidered,
      to: "/featured",
    },
    
  ];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 font-playfair text-gray-800">
          UNSTITCHED
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => navigate(cat.to)}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-rose-600">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnstitchedCategories;
