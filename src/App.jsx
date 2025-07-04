import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Mens from "./components/pages/Mens";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Home from "./components/pages/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./components/pages/NotFound";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/pages/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardHome from "./components/admin/DashboardHome";
import OrdersPage from "./components/admin/OrdersPage";
import ProductsPage from "./components/admin/ProductsPage";
import CreateProductPage from "./components/admin/CreateProductPage";
import EditProductPage from "./components/admin/EditProductPage";
import { ProductProvider } from "./context/ProductContext";
import OrderDetailPage from "./components/admin/OrderDetailPage";
import CustomersPage from "./components/admin/CustomersPage";
import AdminCategoriesPage from "./components/admin/AdminCategoriesPage";
import TrackOrderPage from "./components/pages/TrackOrderPage";
import OrderConfirmationPage from "./components/pages/OrderConfirmationPage";
import TrackerOrderCustomer from "./components/layout/TrackerOrderCustomer";
import AuthPage from "./components/pages/Auth";
import { ProtectedRoute } from "./components/protected/ProtectedRoute";
import CustomerLayout from "./components/customer/CustomerLayout";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import MyOrders from "./components/customer/MyOrder";
import CategoryProducts from "./components/pages/CategoryProducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/mens", element: <Mens /> },
        {
          path: "/category/:categoryId/product/:id",
          element: <ProductDetail />,
        },
        { path: "/product/:id", element: <ProductDetail /> },
        { path: "/category/:categoryId", element: <CategoryProducts /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/track-order/:trackingNumber", element: <TrackOrderPage /> },
        {
          path: "/order-confirmation/:orderId",
          element: <OrderConfirmationPage />,
        },
        { path: "/trackordercustomer", element: <TrackerOrderCustomer /> },
        { path: "/account", element: <AuthPage /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute isAdmin={true}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <DashboardHome /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/create", element: <CreateProductPage /> },
        { path: "products/edit/:productId", element: <EditProductPage /> },
        { path: "orders/:orderId", element: <OrderDetailPage /> },
        { path: "customers", element: <CustomersPage /> },
        { path: "categories", element: <AdminCategoriesPage /> },
        // more admin pages e.g. orders/products/customers will go here
      ],
    },
    {
      path: "/customer",
      element: (
        <ProtectedRoute>
          <CustomerLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <CustomerDashboard /> },
        { path: "myorders", element: <MyOrders /> },
        // More customer routes e.g. orders, profile, addresses
      ],
    },
  ]);

  return (
    <>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
