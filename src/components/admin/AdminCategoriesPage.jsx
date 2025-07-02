import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Folder } from "lucide-react";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost/api/categories.php");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost/api/categories.php?id=${editingId}`
      : "http://localhost/api/categories.php";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parent_id: parentId || null }),
    });
    if (res.ok) {
      alert(editingId ? "Category updated!" : "Category created!");
      setName("");
      setParentId("");
      setEditingId(null);
      fetchCategories();
    } else {
      alert("Operation failed!");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setParentId(cat.parent_id || "");
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    const res = await fetch(`http://localhost/api/categories.php?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchCategories();
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-rose-600 flex items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <Folder size={28} /> Manage Categories
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow mb-10 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 border border-gray-300 p-3 rounded focus:outline-none focus:border-rose-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            required
          />
          <select
            className="flex-1 border border-gray-300 p-3 rounded focus:outline-none focus:border-rose-500 transition"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="">No Parent (Main Category)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.parent_name
                  ? `${cat.parent_name} > ${cat.name}`
                  : cat.name}
              </option>
            ))}
          </select>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-full md:w-fit bg-rose-600 text-white py-3 px-6 rounded-full hover:bg-rose-700 transition"
          type="submit"
        >
          <Plus size={20} /> {editingId ? "Update Category" : "Add Category"}
        </motion.button>
      </motion.form>

      <motion.table
        className="w-full border rounded-xl overflow-hidden shadow text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Category</th>
            <th className="p-3">Parent</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <motion.tr
                key={cat.id}
                className="border-t hover:bg-gray-50 transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="p-3 font-semibold text-gray-700">{cat.id}</td>
                <td className="p-3 text-gray-600">{cat.name}</td>
                <td className="p-3 text-gray-500">{cat.parent_name || "-"}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    className="inline-flex items-center gap-1 bg-yellow-500 text-white py-1.5 px-3 rounded hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(cat)}
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    className="inline-flex items-center gap-1 bg-red-600 text-white py-1.5 px-3 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(cat.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default AdminCategoriesPage;
