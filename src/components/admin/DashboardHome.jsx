import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold text-rose-600">120</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-rose-600">PKR 1,200,000</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <p className="text-3xl font-bold text-rose-600">56</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
