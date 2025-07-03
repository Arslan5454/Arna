import React from "react";
import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const AddToCartPopup = ({
  isOpen,
  onClose,
  onViewCart,
  totalItems,
  cartItems,
}) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      aria-hidden="true"
    />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="relative bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
          <Dialog.Title className="text-xl font-bold text-gray-900">
            Product Added
          </Dialog.Title>
        </div>
        <Dialog.Description className="text-gray-700 mb-6">
          You now have <strong>{totalItems}</strong> item
          {totalItems !== 1 && "s"} in your cart.
        </Dialog.Description>

        <div className="flex flex-wrap justify-end gap-4">
          <button
            onClick={onViewCart}
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition font-medium"
          >
            View Cart
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default AddToCartPopup;
