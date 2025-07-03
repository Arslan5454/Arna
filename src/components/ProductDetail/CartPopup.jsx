import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItemCard from "./CartItemCard";

const CartPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0">
          {/* Backdrop manually handled */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black backdrop-blur-sm" />
          </Transition.Child>

          {/* Cart sliding panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-md h-full bg-white shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <Dialog.Title className="text-xl font-bold text-gray-900">
                    Your Shopping Cart
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition text-2xl leading-none"
                    aria-label="Close cart"
                  >
                    &times;
                  </button>
                </div>

                {/* Cart content */}
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
                    <img
                      src="/empty-cart.svg"
                      alt="Empty cart"
                      className="w-40 h-40 mb-4 opacity-80"
                    />
                    <p className="text-gray-600 text-lg mb-4">
                      Your cart is empty.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        navigate("/");
                      }}
                      className="bg-rose-600 text-white px-5 py-3 rounded hover:bg-rose-700 transition"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {cartItems.map((item) => (
                        <CartItemCard
                          key={item.id}
                          item={item}
                          onQuantityChange={(delta) =>
                            updateQuantity(item.id, delta)
                          }
                          onRemove={() => removeFromCart(item.id)}
                        />
                      ))}
                    </div>

                    <div className="border-t p-6">
                      <div className="flex justify-between mb-4 text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-rose-600 font-bold">
                          PKR {totalPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          navigate("/checkout");
                        }}
                        className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition mb-4"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded hover:bg-gray-100 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartPopup;
