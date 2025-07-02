import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit2, Trash2, PackagePlus } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost/api/products.php")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost/api/products.php?id=${productId}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete");

        setProducts((prev) => prev.filter((p) => p.id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h2
          className="text-3xl font-bold text-rose-600 flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <PackagePlus size={28} /> Products
        </motion.h2>
        <Link
          to="create"
          className="inline-flex items-center gap-2 bg-rose-600 text-white py-2 px-4 rounded-full hover:bg-rose-700 transition"
        >
          <PackagePlus size={18} /> Add Product
        </Link>
      </div>

      <motion.div
        className="overflow-x-auto rounded-xl shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, idx) => (
                <motion.tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="p-4 font-semibold text-gray-700">
                    {product.id}
                  </td>
                  <td className="p-4 text-gray-600">{product.title}</td>
                  <td className="p-4 text-gray-600">
                    PKR {product.originalPrice}
                  </td>
                  <td className="p-4 text-center flex justify-center gap-3">
                    <Link
                      to={`edit/${product.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit2 size={18} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ProductsPage;
