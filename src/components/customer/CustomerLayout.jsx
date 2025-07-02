import { Link, Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <nav className="space-y-2">
          <Link to="/customer" className="block hover:text-rose-400">
            Dashboard
          </Link>
          <Link to="/customer/myorders" className="block hover:text-rose-400">
            My Orders
          </Link>
          <Link to="/customer/profile" className="block hover:text-rose-400">
            Profile Info
          </Link>
          <Link to="/account" className="block hover:text-rose-400">
            Logout
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
