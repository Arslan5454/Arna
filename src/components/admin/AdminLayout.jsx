import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/account");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link to="/admin" className="block hover:text-rose-500">
              Dashboard
            </Link>
            <Link to="/admin/orders" className="block hover:text-rose-500">
              Orders
            </Link>
            <Link to="/admin/products" className="block hover:text-rose-500">
              Products
            </Link>
            <Link to="/admin/customers" className="block hover:text-rose-500">
              Customers
            </Link>
            <Link to="/admin/categories" className="block hover:text-rose-500">
              Categories
            </Link>
          </nav>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-2 bg-rose-600 rounded hover:bg-rose-700 transition text-white font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <Outlet /> {/* Nested admin routes render here */}
      </main>
    </div>
  );
};

export default AdminLayout;
