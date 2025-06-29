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
// import ProductDetail from './components/pages/WomensClothes/ProductDetail'

function App() {
  const router = createBrowserRouter([
    {
    path: '/',
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
    ]
  }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
