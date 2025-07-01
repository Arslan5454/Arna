import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const TrackOrderPage = () => {
  const { trackingNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost/api/orders.php?tracking=${trackingNumber}`
        );
        if (!res.ok) throw new Error("Failed to load order");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        data.items = data.items ? JSON.parse(data.items) : [];
        setOrder(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [trackingNumber]);

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!order) return <p className="p-6 text-red-600">Order not found.</p>;

  const timelineSteps = ["pending", "processing", "shipped", "delivered"];
  const currentStepIndex = timelineSteps.indexOf(order.status);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-rose-600">
        Track Your Order
      </h2>

      <p className="text-center text-gray-600 mb-10 text-sm">
        Tracking Number:{" "}
        <span className="font-semibold text-rose-600">
          {order.tracking_number}
        </span>
      </p>

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        {timelineSteps.map((step, idx) => {
          const completed = idx <= currentStepIndex;
          return (
            <motion.div
              key={step}
              className="flex flex-col items-center relative z-10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
                  completed
                    ? "bg-rose-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx + 1}
              </div>
              <p
                className={`mt-2 text-sm capitalize font-medium transition-colors duration-300 ${
                  completed ? "text-rose-600" : "text-gray-500"
                }`}
              >
                {step}
              </p>
              {idx < timelineSteps.length - 1 && (
                <div className="absolute top-5 left-full h-1 w-full hidden sm:block">
                  <div
                    className={`h-1 transition-all duration-500 ${
                      idx < currentStepIndex ? "bg-rose-600" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="border-t pt-6 space-y-3 text-gray-700 text-base">
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">{order.status}</span>
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span className="capitalize">{order.payment_status}</span>
        </p>
        <p>
          <strong>Total Amount:</strong>{" "}
          <span className="text-rose-600 font-bold">
            PKR {order.total_amount}
          </span>
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          Delivery Address
        </h3>
        <p className="border p-4 rounded bg-gray-50">
          {order.shipping_address}
        </p>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Need help? Contact{" "}
        <a
          href="mailto:support@yourstore.com"
          className="underline text-rose-600"
        >
          support@yourstore.com
        </a>
      </div>
    </div>
  );
};

export default TrackOrderPage;
