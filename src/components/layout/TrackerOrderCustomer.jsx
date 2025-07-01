import React, { useState } from "react";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

const TrackerOrderCustomer = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter your tracking number.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(
        `http://localhost/api/orders.php?tracking=${trackingNumber}`
      );
      const data = await res.json();

      if (res.ok && data.id) {
        setOrder(data);
      } else {
        setError("No order found with this tracking number.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to track order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Track Your Order
      </h2>

      <form
        onSubmit={handleTrack}
        className="space-y-4 animate-slide-in duration-700"
      >
        <input
          type="text"
          className="w-full border-2 border-gray-200 rounded p-3 focus:border-rose-500 focus:outline-none transition"
          placeholder="Enter your tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-rose-600 text-white py-3 rounded hover:bg-rose-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} /> Tracking...
            </>
          ) : (
            "Track Order"
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 mt-6 p-4 rounded animate-pulse">
          <AlertTriangle size={24} className="flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {order && (
        <div className="mt-8 border-t pt-6 space-y-3 text-gray-700 animate-slide-up duration-700">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle size={28} />
            <h3 className="text-xl font-bold">Order Found!</h3>
          </div>
          <p className="text-gray-700">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className="capitalize font-semibold text-rose-600">
              {order.status}
            </span>
          </p>
          <p className="text-gray-700">
            <strong>Payment Status:</strong>{" "}
            <span className="capitalize">{order.payment_status}</span>
          </p>
          <p className="text-gray-700">
            <strong>Total:</strong>{" "}
            <span className="font-bold">PKR {order.total_amount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackerOrderCustomer;
