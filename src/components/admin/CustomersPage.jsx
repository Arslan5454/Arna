import React from "react";
import { dummyCustomers } from "../../data/dummyCustomers";

const CustomersPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Customers</h2>

      <table className="min-w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border">Orders</th>
            <th className="p-3 border">Total Spent</th>
            <th className="p-3 border">Joined</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="p-3 border">{customer.id}</td>
              <td className="p-3 border">{customer.name}</td>
              <td className="p-3 border">{customer.email}</td>
              <td className="p-3 border">{customer.phone}</td>
              <td className="p-3 border">{customer.address}</td>
              <td className="p-3 border">{customer.totalOrders}</td>
              <td className="p-3 border">PKR {customer.totalSpent}</td>
              <td className="p-3 border">{customer.createdAt}</td>
              <td className="p-3 border flex gap-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => alert(`Delete customer ID ${customer.id}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
