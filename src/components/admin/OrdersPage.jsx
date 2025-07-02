import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye, Trash2, List } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      className="p-8 max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <List size={28} className="text-rose-600" />
        <h2 className="text-3xl font-bold text-rose-600">Orders</h2>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold">Error: {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-700 uppercase">
                <th className="p-4 border">#</th>
                <th className="p-4 border">Customer</th>
                <th className="p-4 border">Amount</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Payment</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="p-4 border font-medium">{index + 1}</td>
                  <td className="p-4 border">{order.customer_name}</td>
                  <td className="p-4 border font-semibold text-rose-600">
                    PKR {order.total_amount}
                  </td>

                  {/* Order Status */}
                  <td className="p-4 border capitalize">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full animate-pulse ${
                          order.status === "delivered"
                            ? "bg-green-500"
                            : order.status === "processing"
                            ? "bg-yellow-500"
                            : order.status === "pending"
                            ? "bg-orange-500"
                            : order.status === "cancelled" ||
                              order.status === "failed"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {order.status}
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="p-4 border capitalize">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full animate-pulse ${
                          order.payment_status === "paid"
                            ? "bg-green-500"
                            : order.payment_status === "unpaid"
                            ? "bg-red-500"
                            : order.payment_status === "refunded"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {order.payment_status}
                    </div>
                  </td>

                  <td className="p-4 border">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 border">
                    <div className="flex gap-3">
                      <NavLink
                        to={`/admin/orders/${order.id}`}
                        className="text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Eye size={18} />
                        <span className="hidden sm:inline">View</span>
                      </NavLink>
                      <button
                        className="text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
                        onClick={() => handleDelete(order.id)}
                      >
                        <Trash2 size={18} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default OrdersPage;
