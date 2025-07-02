import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CalendarDays, BadgeCheck } from "lucide-react";

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // User not logged in — redirect or show error
      setOrders([]);
      setLoading(false);
      return;
    }

    fetch("http://localhost/api/customer_orders.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("[MyOrders] Error:", err);
        setOrders([]);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center mb-8 space-x-4">
        <ShoppingCart className="text-rose-600 w-8 h-8" />
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="border rounded-2xl p-6 hover:shadow-md transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-gray-700">
                  <BadgeCheck className="w-5 h-5 text-rose-500 mr-2" />
                  <span className="font-medium">Order ID:</span>
                  <span className="ml-1">{order.id}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarDays className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{order.date}</span>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    statusColors[order.status] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrders;
