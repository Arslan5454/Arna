import React from "react";

const ProductDescription = ({ product, quantity, onQuantityChange, onAddToCart }) => (
  <div className="md:w-1/4 space-y-6 text-left">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
    <p className="text-xl text-rose-600 font-bold">PKR {product.price}</p>

    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-semibold">Quantity</span>
      <div className="flex items-center border rounded">
        <button onClick={() => onQuantityChange(-1)} className="p-2 text-gray-700 hover:text-rose-600">-</button>
        <span className="px-4">{quantity}</span>
        <button onClick={() => onQuantityChange(1)} className="p-2 text-gray-700 hover:text-rose-600">+</button>
      </div>
    </div>

    <button onClick={onAddToCart} className="w-full bg-gray-900 text-white py-3 rounded shadow hover:bg-black transition">
      ADD TO CART
    </button>

    <div className="text-left text-gray-700 mt-6">
      <h3 className="text-lg font-bold underline mb-4">Description</h3>
      <div className="space-y-2 text-sm">
        {Object.entries(product.description).map(([k, v]) => (
          <p key={k}><strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {v}</p>
        ))}
      </div>
    </div>
  </div>
);

export default ProductDescription;
