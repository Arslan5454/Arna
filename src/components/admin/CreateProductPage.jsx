import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    sku: "",
    brand: "",
    category: "",
    subCategory: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    currency: "PKR",
    stock: "",
    weight: "",
    mainImage: "",
    galleryImages: "",
    colors: "",
    sizes: "",
    fabric: "",
    season: "",
    shippingClass: "",
    shippingCharges: "",
    status: "active",
    visibility: "public",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost/api/categories.php");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all product text fields except mainImage/galleryImages
      Object.entries(product).forEach(([key, value]) => {
        if (
          key !== "mainImage" &&
          key !== "galleryImages" &&
          value !== undefined &&
          value !== null
        ) {
          formData.append(key, value);
        }
      });

      // Append mainImage file if selected
      if (product.mainImage && product.mainImage instanceof File) {
        formData.append("mainImage", product.mainImage);
      }

      // Append galleryImages files if selected
      if (product.galleryImages && Array.isArray(product.galleryImages)) {
        product.galleryImages.forEach((img) =>
          formData.append("galleryImages[]", img)
        );
      }

      const response = await fetch("http://localhost/api/products.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to create product");
      }

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error creating product: " + err.message);
    }
  };

  return (
    <motion.div
      className="p-8 max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <PlusCircle size={28} className="text-rose-600" />
        <h2 className="text-3xl font-bold text-rose-600">Add New Product</h2>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="border p-3 rounded w-full"
          />

          <input
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border p-3 rounded w-full"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.parent_name
                  ? `${cat.parent_name} > ${cat.name}`
                  : cat.name}
              </option>
            ))}
          </select>

          <input
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="border p-3 rounded w-full"
          />

          <input
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            type="number"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            placeholder="Discount Price"
            type="number"
            className="border p-3 rounded w-full"
          />

          <input
            name="currency"
            value={product.currency}
            onChange={handleChange}
            placeholder="Currency"
            className="border p-3 rounded w-full"
          />

          <input
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            type="number"
            className="border p-3 rounded w-full"
            required
          />

          <input
            name="weight"
            value={product.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            type="number"
            step="0.01"
            className="border p-3 rounded w-full"
          />

          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={(e) =>
              setProduct({ ...product, mainImage: e.target.files[0] })
            }
            className="border p-3 rounded w-full"
          />

          <input
            type="file"
            name="galleryImages"
            accept="image/*"
            multiple
            onChange={(e) =>
              setProduct({
                ...product,
                galleryImages: Array.from(e.target.files),
              })
            }
            className="border p-3 rounded w-full"
          />
          <input
            name="colors"
            value={product.colors}
            onChange={handleChange}
            placeholder="Colors (comma separated)"
            className="border p-3 rounded w-full"
          />

          <input
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            placeholder="Sizes (comma separated)"
            className="border p-3 rounded w-full"
          />

          <input
            name="fabric"
            value={product.fabric}
            onChange={handleChange}
            placeholder="Fabric Type"
            className="border p-3 rounded w-full"
          />

          <input
            name="season"
            value={product.season}
            onChange={handleChange}
            placeholder="Season"
            className="border p-3 rounded w-full"
          />

          <input
            name="shippingClass"
            value={product.shippingClass}
            onChange={handleChange}
            placeholder="Shipping Class"
            className="border p-3 rounded w-full"
          />

          <input
            name="shippingCharges"
            value={product.shippingCharges}
            onChange={handleChange}
            placeholder="Shipping Charges"
            type="number"
            className="border p-3 rounded w-full"
          />

          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            name="visibility"
            value={product.visibility}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <div className="flex items-center gap-3 col-span-2">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={(e) =>
                setProduct({ ...product, featured: e.target.checked })
              }
            />
            <label>Mark as Featured</label>
          </div>
        </div>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded w-full"
          rows={4}
          required
        />

        <input
          name="metaTitle"
          value={product.metaTitle}
          onChange={handleChange}
          placeholder="Meta Title"
          className="border p-3 rounded w-full"
        />

        <textarea
          name="metaDescription"
          value={product.metaDescription}
          onChange={handleChange}
          placeholder="Meta Description"
          className="border p-3 rounded w-full"
          rows={2}
        />

        <input
          name="metaKeywords"
          value={product.metaKeywords}
          onChange={handleChange}
          placeholder="Meta Keywords"
          className="border p-3 rounded w-full"
        />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="bg-rose-600 text-white py-3 px-6 rounded hover:bg-rose-700 transition"
        >
          Add Product
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProductPage;
