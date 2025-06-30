import React, { useEffect, useState } from "react";

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

  useEffect(() => { fetchCategories(); }, []);

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
      alert(editingId ? "Updated!" : "Created!");
      setName("");
      setParentId("");
      setEditingId(null);
      fetchCategories();
    } else {
      alert("Failed!");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setParentId(cat.parent_id || "");
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    const res = await fetch(`http://localhost/api/categories.php?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchCategories();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <select
          className="w-full border p-3 rounded"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">No Parent (Main Category)</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.parent_name ? `${cat.parent_name} > ${cat.name}` : cat.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {editingId ? "Update" : "Add Category"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Parent</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="border p-2">{cat.id}</td>
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2">{cat.parent_name || "-"}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoriesPage;
