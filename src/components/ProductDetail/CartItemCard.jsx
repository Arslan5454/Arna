import React from "react";

const CartItemCard = ({ item, onQuantityChange, onRemove }) => (
  <div className="flex items-center justify-between border rounded-lg p-4 group hover:shadow transition">
    {/* Image */}
    <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden border">
      <img
        src={item.image || "/placeholder.png"}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Details */}
    <div className="flex-1 mx-4 min-w-0">
      <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center border rounded overflow-hidden">
          <button
            onClick={() => onQuantityChange(-1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            -
          </button>
          <span className="px-3 text-sm font-medium text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Price & Remove */}
    <div className="flex flex-col items-end gap-2">
      <span className="font-semibold text-rose-600 whitespace-nowrap">
        PKR {Number(item.price * item.quantity).toFixed(2)}
      </span>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default CartItemCard;
