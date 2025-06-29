import React from "react";

const dummyOrders = [
  {
    id: "ORD-001",
    customer: "Ali Khan",
    date: "2024-06-30",
    status: "Pending",
    total: 1200,
  },
  {
    id: "ORD-002",
    customer: "Fatima Noor",
    date: "2024-06-28",
    status: "Shipped",
    total: 3400,
  },
  {
    id: "ORD-003",
    customer: "Ahmed Raza",
    date: "2024-06-25",
    status: "Delivered",
    total: 2800,
  },
];

const OrdersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b font-semibold">Order ID</th>
              <th className="py-3 px-4 border-b font-semibold">Customer</th>
              <th className="py-3 px-4 border-b font-semibold">Date</th>
              <th className="py-3 px-4 border-b font-semibold">Status</th>
              <th className="py-3 px-4 border-b font-semibold">Total</th>
              <th className="py-3 px-4 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{order.id}</td>
                <td className="py-3 px-4 border-b">{order.customer}</td>
                <td className="py-3 px-4 border-b">{order.date}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b font-bold text-rose-600">PKR {order.total}</td>
                <td className="py-3 px-4 border-b">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
