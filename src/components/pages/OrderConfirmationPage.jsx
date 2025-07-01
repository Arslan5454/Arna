import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ReceiptText, MapPin, Truck } from "lucide-react";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost/api/orders.php?id=${orderId}`
        );
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="p-6">Loading order details...</p>;
  if (!order) return <p className="p-6 text-red-600">Order not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow animate-fade-in">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto text-green-600" size={60} />
        <h1 className="text-3xl font-bold mt-4 text-green-700">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mt-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Order ID: <span className="font-semibold">{order.id}</span> | Tracking
          Number:{" "}
          <span className="text-rose-600 font-bold">
            {order.tracking_number}
          </span>
        </p>
      </div>

      <div className="mb-8 border-t pt-4">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          {" "}
          <ReceiptText className="text-rose-600" size={18} />
          Order Summary
        </h3>
        {order && order.total_amount !== undefined ? (
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Total Amount:</strong>{" "}
              <span className="text-rose-600 font-bold">
                PKR {order.total_amount}
              </span>
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className="capitalize">{order.payment_status}</span>
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              <span className="capitalize">{order.status}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-600">Order details not available.</p>
        )}
      </div>

      <div className="mb-8 border-t pt-4">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          <MapPin className="text-rose-600" size={18} />
          Delivery Address
        </h3>
        <p className="border p-4 rounded bg-gray-50 mb-4">
          {order.shipping_address}
        </p>

        <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden">
          <iframe
            className="w-full h-full border-none"
            title="Delivery Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              order.shipping_address
            )}&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={`/track-order/${order.tracking_number}`}
          className="bg-rose-600 text-white py-3 px-6 rounded text-center hover:bg-rose-700"
        >
          Track Your Order
        </Link>
        <Link
          to="/"
          className="bg-gray-300 text-gray-800 py-3 px-6 rounded text-center hover:bg-gray-400"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
