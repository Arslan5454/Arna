import React from "react";
import { Dialog } from "@headlessui/react";

const AddToCartPopup = ({ isOpen, onClose, onViewCart, totalItems }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">Product Added</Dialog.Title>
        <Dialog.Description className="text-gray-700 mb-6">
          You have <strong>{totalItems}</strong> item{totalItems > 1 && "s"} in your cart.
        </Dialog.Description>
        <div className="flex flex-wrap justify-end gap-4">
          <button onClick={onViewCart} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">View Cart</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Add More</button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default AddToCartPopup;
