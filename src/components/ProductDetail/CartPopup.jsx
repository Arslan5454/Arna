import React, { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItemCard from "./CartItemCard";

const CartPopup = ({ isOpen, onClose, cartItems }) => {
  const navigate = useNavigate();
  const { updateQuantity, removeFromCart } = useContext(CartContext); // ✅ context

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            Your Shopping Bag
          </Dialog.Title>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center py-12">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={(delta) => updateQuantity(item.id, delta)} // ✅ global function
                  onRemove={() => removeFromCart(item.id)}                    // ✅ global function
                />
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <div className="mt-6 border-t pt-4 flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span className="text-rose-600 font-bold">PKR {totalPrice}</span>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded hover:bg-gray-100 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CartPopup;
