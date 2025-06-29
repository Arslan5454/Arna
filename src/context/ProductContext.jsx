import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const createProduct = async (newProduct) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const created = await res.json();
    setProducts((prev) => [...prev, created]);
  };

  const updateProduct = async (id, updatedProduct) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, fetchProducts, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
