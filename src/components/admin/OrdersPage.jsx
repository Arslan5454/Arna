import React from "react";
import { Link } from "react-router-dom";
import { dummyOrders } from "../../data/dummyOrders";

const OrdersPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <table className="min-w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyOrders.map((order) => (
            <tr key={order.id}>
              <td className="p-3 border">{order.id}</td>
              <td className="p-3 border">{order.customerName}</td>
              <td className="p-3 border">PKR {order.totalAmount}</td>
              <td className="p-3 border">{order.status}</td>
              <td className="p-3 border">{order.createdAt}</td>
              <td className="p-3 border">
                <div className="flex gap-2">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => alert(`Delete order ID ${order.id}`)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
