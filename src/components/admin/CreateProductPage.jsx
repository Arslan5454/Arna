import React, { useState } from "react";

const CreateProductPage = () => {
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

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/api/products.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to create");

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC DETAILS */}
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border p-3 rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded"
          required
          rows={4}
        />
        <input
          name="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="SKU"
          className="w-full border p-3 rounded"
        />
        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border p-3 rounded"
        />
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />
        <input
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          placeholder="Sub-category"
          className="w-full border p-3 rounded"
        />
        <input
          name="tags"
          value={product.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full border p-3 rounded"
        />

        {/* PRICING */}
        <input
          name="originalPrice"
          value={product.originalPrice}
          onChange={handleChange}
          placeholder="Original Price"
          type="number"
          className="w-full border p-3 rounded"
          required
        />
        <input
          name="discountPrice"
          value={product.discountPrice}
          onChange={handleChange}
          placeholder="Discount Price"
          type="number"
          className="w-full border p-3 rounded"
        />
        <input
          name="currency"
          value={product.currency}
          onChange={handleChange}
          placeholder="Currency"
          className="w-full border p-3 rounded"
        />
        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          type="number"
          className="w-full border p-3 rounded"
          required
        />
        <input
          name="weight"
          value={product.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          type="number"
          step="0.01"
          className="w-full border p-3 rounded"
        />

        {/* IMAGES */}
        <input
          name="mainImage"
          value={product.mainImage}
          onChange={handleChange}
          placeholder="Main Image URL"
          className="w-full border p-3 rounded"
        />
        <input
          name="galleryImages"
          value={product.galleryImages}
          onChange={handleChange}
          placeholder="Gallery Images URLs (comma separated)"
          className="w-full border p-3 rounded"
        />

        {/* ATTRIBUTES */}
        <input
          name="colors"
          value={product.colors}
          onChange={handleChange}
          placeholder="Colors (comma separated)"
          className="w-full border p-3 rounded"
        />
        <input
          name="sizes"
          value={product.sizes}
          onChange={handleChange}
          placeholder="Sizes (comma separated)"
          className="w-full border p-3 rounded"
        />
        <input
          name="fabric"
          value={product.fabric}
          onChange={handleChange}
          placeholder="Fabric Type"
          className="w-full border p-3 rounded"
        />
        <input
          name="season"
          value={product.season}
          onChange={handleChange}
          placeholder="Season"
          className="w-full border p-3 rounded"
        />

        {/* SHIPPING */}
        <input
          name="shippingClass"
          value={product.shippingClass}
          onChange={handleChange}
          placeholder="Shipping Class"
          className="w-full border p-3 rounded"
        />
        <input
          name="shippingCharges"
          value={product.shippingCharges}
          onChange={handleChange}
          placeholder="Shipping Charges"
          type="number"
          className="w-full border p-3 rounded"
        />

        {/* STATUS */}
        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          name="visibility"
          value={product.visibility}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <div className="flex items-center gap-2">
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

        {/* SEO */}
        <input
          name="metaTitle"
          value={product.metaTitle}
          onChange={handleChange}
          placeholder="Meta Title"
          className="w-full border p-3 rounded"
        />
        <textarea
          name="metaDescription"
          value={product.metaDescription}
          onChange={handleChange}
          placeholder="Meta Description"
          className="w-full border p-3 rounded"
          rows={2}
        />
        <input
          name="metaKeywords"
          value={product.metaKeywords}
          onChange={handleChange}
          placeholder="Meta Keywords"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-rose-600 text-white py-3 px-6 rounded hover:bg-rose-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
