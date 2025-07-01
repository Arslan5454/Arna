import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await fetch(
        `http://localhost/api/orders.php?id=${order.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.error)
        throw new Error(result.error || "Failed to update status");
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert(err.message || "Error updating status");
    }
  };

  const handlePaymentStatusChange = async (e) => {
    const newPaymentStatus = e.target.value;
    try {
      const res = await fetch(
        `http://localhost/api/orders.php?id=${order.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_status: newPaymentStatus }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.error)
        throw new Error(result.error || "Failed to update payment status");
      setOrder((prev) => ({ ...prev, payment_status: newPaymentStatus }));
    } catch (err) {
      alert(err.message || "Error updating payment status");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost/api/orders.php?id=${orderId}`
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
  }, [orderId]);

  if (loading) return <div className="p-6">Loading order...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  const subtotal = order.subtotal || 0;
  const grandTotal = order.total_amount || 0;
  const printInvoice = () => window.print();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded shadow animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Order Detail - #{order.id}</h2>
        <button
          onClick={printInvoice}
          className="bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition"
        >
          Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block font-semibold mb-1">Order Status</label>
          <select
            className="border p-2 rounded w-full"
            value={order.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Payment Status</label>
          <select
            className="border p-2 rounded w-full"
            value={order.payment_status}
            onChange={handlePaymentStatusChange}
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 p-4 rounded shadow bg-white">
          <p className="text-gray-500 text-sm">Order Placed</p>
          <p className="text-xl font-bold">{order.created_at || "N/A"}</p>
        </div>
        <div className="flex-1 p-4 rounded shadow bg-white">
          <p className="text-gray-500 text-sm">Customer</p>
          <p className="text-xl font-bold">{order.customer_name}</p>
        </div>
        <div className="flex-1 p-4 rounded shadow bg-white">
          <p className="text-gray-500 text-sm">Grand Total</p>
          <p className="text-xl font-bold text-rose-600">PKR {grandTotal}</p>
        </div>
      </div>

      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">Billing Address</h3>
          <p className="border p-3 rounded bg-gray-50">
            {order.billing_address}
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Shipping Address</h3>
          <p className="border p-3 rounded bg-gray-50">
            {order.shipping_address}
          </p>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{item.title}</td>
                <td className="p-3 border">PKR {item.price}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border font-bold">
                  PKR {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8 space-y-2 text-lg">
        <div className="flex justify-between">
          <span>Subtotal:</span> <span>PKR {subtotal}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount:</span> <span>- PKR {order.discount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span> <span>PKR {order.shipping_charges}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Grand Total:</span>{" "}
          <span className="text-rose-600">PKR {grandTotal}</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition"
          onClick={() => alert("Order cancelled (demo)")}
        >
          Cancel Order
        </button>
      </div>

      <div className="hidden print:block printable-invoice border p-8 max-w-3xl mx-auto text-sm leading-relaxed">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-rose-600">ARNA WEAR</h1>
            <p className="text-gray-600 text-xs">www.arnawear.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-gray-600">Order #: {order.id}</p>
            <p className="text-gray-600">Date: {order.created_at || "N/A"}</p>
          </div>
        </div>
        {/* Order Timeline */}
        {/* Horizontal Order Timeline */}
        <div className="mb-6 border-t pt-4 print:hidden">
          <h3 className="text-lg font-bold mb-4">Order Timeline</h3>
          <div className="flex justify-between items-center overflow-x-auto">
            {[
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Shipped", value: "shipped" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center relative flex-shrink-0 w-24"
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                    order.status === step.value
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "bg-gray-200 border-gray-400 text-gray-700"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-xs font-semibold text-center ${
                    order.status === step.value
                      ? "text-rose-600"
                      : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
                {/* Connector line */}
                {idx < 4 && (
                  <div
                    className={`absolute top-4 left-12 w-16 h-1 ${
                      order.status === step.value
                        ? "bg-rose-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-1">Billing To:</h3>
            <p className="text-gray-700">{order.customer_name}</p>
            <p className="text-gray-700">{order.phone}</p>
            <p className="text-gray-700">{order.email}</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Shipping Address:</h3>
            <p className="text-gray-700">{order.customer_name}</p>
            <p className="text-gray-700">{order.shipping_address}</p>
            <p className="text-gray-700">{order.phone}</p>
          </div>
        </div>

        <table className="w-full border text-left mb-6 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">PKR {item.price}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">PKR {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right space-y-1">
          <p>Subtotal: PKR {subtotal}</p>
          <p>Discount: - PKR {order.discount}</p>
          <p>Shipping: PKR {order.shipping_charges}</p>
          <p className="font-bold text-lg text-rose-600 border-t pt-2">
            Grand Total: PKR {grandTotal}
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
          Thank you for shopping with Your Store!
          <br />
          For any queries, contact support@ARNA_WEAR.com
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
