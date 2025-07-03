import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/api/products.php`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === productId);
        if (found) setProduct(found);
        else alert("Product not found");
      })
      .catch(console.error);
  }, [productId]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) =>
    setProduct({ ...product, featured: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key] ?? "");
    });
    if (product.newMainImage) {
      formData.append("newMainImage", product.newMainImage);
    }
    if (product.newGalleryImages && product.newGalleryImages.length > 0) {
      product.newGalleryImages.forEach((file) =>
        formData.append("newGalleryImages[]", file)
      );
    }
    formData.append("_method", "PUT");

    try {
      const response = await fetch(
        `http://localhost/api/products.php?id=${productId}`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update");

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error updating product: " + err.message);
    }
  };

  if (!product)
    return (
      <div className="p-6 text-center text-gray-600 animate-pulse">
        Loading product...
      </div>
    );

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-rose-700 text-center">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {[
          // existing fields intact
          {
            name: "title",
            type: "text",
            placeholder: "Product Title",
            required: true,
          },
          {
            name: "description",
            type: "textarea",
            placeholder: "Description",
            required: true,
            rows: 4,
          },
          { name: "sku", type: "text", placeholder: "SKU" },
          { name: "brand", type: "text", placeholder: "Brand" },
          { name: "category", type: "text", placeholder: "Category" },
          { name: "subCategory", type: "text", placeholder: "Sub-category" },
          { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
          {
            name: "originalPrice",
            type: "number",
            placeholder: "Original Price",
            required: true,
          },
          {
            name: "discountPrice",
            type: "number",
            placeholder: "Discount Price",
          },
          { name: "currency", type: "text", placeholder: "Currency" },
          {
            name: "stock",
            type: "number",
            placeholder: "Stock Quantity",
            required: true,
          },
          {
            name: "weight",
            type: "number",
            placeholder: "Weight (kg)",
            step: "0.01",
          },
          {
            name: "colors",
            type: "text",
            placeholder: "Colors (comma separated)",
          },
          {
            name: "sizes",
            type: "text",
            placeholder: "Sizes (comma separated)",
          },
          { name: "fabric", type: "text", placeholder: "Fabric Type" },
          { name: "season", type: "text", placeholder: "Season" },
          {
            name: "shippingClass",
            type: "text",
            placeholder: "Shipping Class",
          },
          {
            name: "shippingCharges",
            type: "number",
            placeholder: "Shipping Charges",
          },
          { name: "metaTitle", type: "text", placeholder: "Meta Title" },
          {
            name: "metaDescription",
            type: "textarea",
            placeholder: "Meta Description",
            rows: 2,
          },
          { name: "metaKeywords", type: "text", placeholder: "Meta Keywords" },
        ].map((field, idx) =>
          field.type === "textarea" ? (
            <textarea
              key={idx}
              name={field.name}
              value={product[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              rows={field.rows || 3}
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-rose-500 transition"
            />
          ) : (
            <input
              key={idx}
              name={field.name}
              type={field.type}
              value={product[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              step={field.step}
              className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-rose-500 transition"
            />
          )
        )}

        {product.mainImage && (
          <motion.div
            className="flex flex-col gap-2 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="font-semibold text-gray-700">
              Current Main Image:
            </label>
            <img
              src={`http://localhost/uploads/products/${product.mainImage}`}
              alt="Main"
              className="w-44 h-44 object-cover rounded-2xl border shadow"
            />
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Change Main Image:
          </label>
          <input
            type="file"
            name="newMainImage"
            accept="image/*"
            className="w-full border p-4 rounded-xl file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition"
            onChange={(e) =>
              setProduct({ ...product, newMainImage: e.target.files[0] })
            }
          />
        </div>

        {product.galleryImages && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="font-semibold text-gray-700">
              Current Gallery Images:
            </label>
            <div className="flex flex-wrap gap-3">
              {product.galleryImages.split(",").map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost/${img}`}
                  alt={`Gallery ${i}`}
                  className="w-28 h-28 object-cover rounded-xl border"
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Change Gallery Images:
          </label>
          <input
            type="file"
            name="newGalleryImages"
            accept="image/*"
            multiple
            className="w-full border p-4 rounded-xl file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition"
            onChange={(e) =>
              setProduct({
                ...product,
                newGalleryImages: Array.from(e.target.files),
              })
            }
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="w-full sm:w-1/2 border p-4 rounded-xl focus:ring-2 focus:ring-rose-500 transition"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              name="visibility"
              value={product.visibility}
              onChange={handleChange}
              className="w-full sm:w-1/2 border p-4 rounded-xl focus:ring-2 focus:ring-rose-500 transition"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={handleCheckboxChange}
              className="h-6 w-6 text-rose-600 rounded focus:ring-2 focus:ring-rose-500"
            />
            <label className="font-medium text-gray-700">
              Mark as Featured
            </label>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-600 text-white py-4 px-8 rounded-2xl shadow hover:bg-rose-700 transition text-lg font-semibold"
        >
          Update Product
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditProductPage;
