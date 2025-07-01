import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost/api/orders.php");
        if (!res.ok) throw new Error("Failed to load orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  //Delete Method
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`http://localhost/api/orders.php?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        alert("Order deleted successfully!");
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Failed to delete: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-xs text-gray-700 uppercase">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                {/* <td className="px-4 py-2 border">{index + 1}</td> */}
                <td className="p-3 border">{order.customer_name}</td>
                <td className="p-3 border">PKR {order.total_amount}</td>
                <td className="p-3 border capitalize">{order.status}</td>
                <td className="p-3 border capitalize">
                  {order.payment_status}
                </td>
                <td className="p-3 border">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Eye size={18} />{" "}
                      <span className="hidden sm:inline">View</span>
                    </NavLink>
                    <button
                      className="text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 size={18} />{" "}
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
