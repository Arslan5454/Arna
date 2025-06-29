import { useParams, useLocation } from "react-router-dom";
import React, { useState } from "react";
import lawnItems from "../../data/lawnData";
import printedItems from "../../data/printedData";
import featuredItems from "../../data/featuredData";
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";
import AddToCartPopup from "./AddToCartPopup";
import CartPopup from "./CartPopup";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  // ✅ Infer collection from current path:
  let collection;
  if (location.pathname.startsWith("/printed")) collection = "printed";
  else if (location.pathname.startsWith("/lawn")) collection = "lawn";
  else if (location.pathname.startsWith("/featured")) collection = "featured";

  // ✅ Select correct data array:
  let data;
  if (collection === "printed") data = printedItems;
  else if (collection === "lawn") data = lawnItems;
  else if (collection === "featured") data = featuredItems;

  const product = data?.find((p) => p.id === Number(id));

  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  if (!product)
    return <div className="py-20 text-center">Product not found!</div>;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    const existingIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );
    let updatedCart;
    const cartItem = {
      ...product,
      image: Array.isArray(product.images) ? product.images[0] : product.images,
      quantity,
    };
    if (existingIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cartItems, cartItem];
    }
    setCartItems(updatedCart);
    setQuantity(1);
    setIsAddToCartOpen(true);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  console.log("collection:", collection, "id:", id, "product:", product);

  return (
    <>
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8 flex flex-col md:flex-row gap-8 bg-white">
        <ProductGallery images={product.images} />
        <ProductDescription
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
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
        setCartItems={setCartItems}
      />
    </>
  );
};

export default ProductDetail;
