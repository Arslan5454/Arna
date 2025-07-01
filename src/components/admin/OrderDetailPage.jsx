import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //Status Updates
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await fetch(
        `http://localhost/api/orders.php?id=${order.id}`,
        {
          method: "PATCH", // ya POST, jo tumhare backend mein support ho
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.error)
        throw new Error(result.error || "Failed to update status");

      setOrder((prev) => ({ ...prev, status: newStatus })); // UI update
      alert("Order status updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error updating order status");
    }
  };

  const handlePaymentStatusChange = async (e) => {
    const newPaymentStatus = e.target.value;
    try {
      const res = await fetch(
        `http://localhost/api/orders.php?id=${order.id}`,
        {
          method: "PATCH", // ya POST, jo backend mein hai
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_status: newPaymentStatus }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.error)
        throw new Error(result.error || "Failed to update payment status");

      setOrder((prev) => ({ ...prev, payment_status: newPaymentStatus })); // UI update
      alert("Payment status updated successfully!");
    } catch (err) {
      console.error(err);
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

        // parse items JSON if present
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

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!order) return <p className="p-6 text-red-600">Order not found.</p>;

  const subtotal = order.subtotal || 0;
  const grandTotal = order.total_amount || 0;

  const printInvoice = () => window.print();

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Order Detail - #{order.id}</h2>
      <p className="mb-2 text-gray-600">
        Placed on: {order.created_at || "N/A"}
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
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

        <div className="flex-1">
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

      {/* Customer Info */}
      <div className="mb-6 border-t pt-4">
        <h3 className="text-lg font-bold mb-2">Customer Information</h3>
        <p>
          <strong>Name:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
      </div>

      {/* Addresses */}
      <div className="mb-6 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-1">Billing Address</h3>
          <p className="border p-3 rounded bg-gray-50">
            {order.billing_address}
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Shipping Address</h3>
          <p className="border p-3 rounded bg-gray-50">
            {order.shipping_address}
          </p>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Order Items</h3>
        {order.items.length === 0 ? (
          <p>No items found in this order.</p>
        ) : (
          <table className="min-w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
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
        )}
      </div>

      {/* Totals */}
      <div className="mb-6 border-t pt-4 space-y-2 text-lg">
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

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <button
          className="bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700"
          onClick={printInvoice}
        >
          Print Invoice
        </button>
        <button
          className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
          onClick={() => alert("Order cancelled (demo)")}
        >
          Cancel Order
        </button>
      </div>

      {/* Printable Invoice */}
      <div className="hidden print:block printable-invoice border p-8 max-w-3xl mx-auto text-sm leading-relaxed">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-rose-600">
              Your Store Name
            </h1>
            <p className="text-gray-600 text-xs">www.yourstore.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-gray-600">Order #: {order.id}</p>
            <p className="text-gray-600">Date: {order.created_at || "N/A"}</p>
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
            <p className="text-gray-700">{order.shipping_address}</p>
          </div>
        </div>

        <table className="w-full border text-left mb-6">
          <thead>
            <tr className="bg-gray-100">
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
          Thank you for shopping with Your Store Name!
          <br />
          For any queries, contact support@yourstore.com
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
