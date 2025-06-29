import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Women from "./components/pages/Women";
import Mens from "./components/pages/Mens";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Home from "./components/pages/Home";
import UnstitchedCategories from "./components/pages/UnstitchedCategories";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import PrintedCloth from "./components/pages/WomensClothes/PrintedCloth";
import FeaturedCloth from "./components/pages/WomensClothes/FeaturedCloth";
import LawnCloth from "./components/pages/WomensClothes/LawnCloth";
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
// import ProductDetail from './components/pages/WomensClothes/ProductDetail'

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
        { path: "/women", element: <Women /> },
        { path: "/mens", element: <Mens /> },
        { path: "/unstitched", element: <UnstitchedCategories /> },
        { path: "/printed/:id", element: <ProductDetail /> },
        { path: "/lawn/:id", element: <ProductDetail /> },
        { path: "/featured/:id", element: <ProductDetail /> },
        { path: "/printed", element: <PrintedCloth /> },
        { path: "/featured", element: <FeaturedCloth /> },
        { path: "/lawn", element: <LawnCloth /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "", element: <DashboardHome /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/create", element: <CreateProductPage /> },
        { path: "products/edit/:productId", element: <EditProductPage /> },
        { path: "orders/:orderId", element: <OrderDetailPage /> },
        // more admin pages e.g. orders/products/customers will go here
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
