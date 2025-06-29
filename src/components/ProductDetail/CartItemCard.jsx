import React from "react";

const CartItemCard = ({ item, onQuantityChange, onRemove }) => (
  <div className="flex items-center justify-between border rounded-lg p-4 group hover:shadow transition">
    <img
      src={item.image}
      alt={item.title}
      className="w-20 h-20 rounded object-cover border"
    />
    <div className="flex-1 mx-4">
      <h3 className="font-semibold text-gray-800">{item.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <button onClick={() => onQuantityChange(-1)} className="px-2 border rounded hover:bg-gray-200">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(1)} className="px-2 border rounded hover:bg-gray-200">+</button>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <span className="font-bold text-rose-600">PKR {item.price * item.quantity}</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
);

export default CartItemCard;
