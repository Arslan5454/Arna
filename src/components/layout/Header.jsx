import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu, X, PackageSearch, LogIn } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({}); // mobile ke liye expanded state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost/api/categories.php");
        const flatData = await res.json();
        const nestedData = buildNestedCategories(flatData);
        setCategories(nestedData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Build nested categories from flat list
  function buildNestedCategories(flat) {
    const map = {};
    const roots = [];
    flat.forEach((item) => (map[item.id] = { ...item, subcategories: [] }));
    flat.forEach((item) => {
      if (item.parent_id && map[item.parent_id]) {
        map[item.parent_id].subcategories.push(map[item.id]);
      } else if (item.parent_id === 0) {
        roots.push(map[item.id]);
      }
    });
    return roots;
  }

  const toggleMenu = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recursive function for desktop dropdowns
  const renderDesktopSubcategories = (subs) => (
    <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-lg rounded-md p-4 space-y-2 z-50 flex-col min-w-[200px]">
      {subs.map((sub) => (
        <div key={sub.id} className="relative group">
          <NavLink
            to={`/category/${sub.id}`}
            className="text-sm text-gray-700 hover:text-rose-600"
          >
            {sub.name}
          </NavLink>
          {sub.subcategories?.length > 0 &&
            renderDesktopSubcategories(sub.subcategories)}
        </div>
      ))}
    </div>
  );

  // Recursive function for mobile nested subcategories
  const renderMobileSubcategories = (subs) => (
    <div className="ml-4 mt-2 space-y-2">
      {subs.map((sub) => (
        <div key={sub.id}>
          <div className="flex justify-between items-center">
            <NavLink
              to={`/category/${sub.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-rose-600"
            >
              {sub.name}
            </NavLink>
            {sub.subcategories?.length > 0 && (
              <button onClick={() => toggleMenu(sub.id)}>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    expandedMenus[sub.id] ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
          {sub.subcategories?.length > 0 &&
            expandedMenus[sub.id] &&
            renderMobileSubcategories(sub.subcategories)}
        </div>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 left-0 bg-white/90 backdrop-blur-md shadow-sm w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <NavLink to={"/"}>
          <h1 className="text-2xl md:text-3xl font-playfair text-rose-600 font-bold">
            Arna Wearing
          </h1>
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 relative">
          {categories.map((cat) => (
            <div key={cat.id} className="relative group">
              <NavLink
                to={`/category/${cat.id}`}
                className="flex items-center gap-1 text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
              >
                {cat.name}
              </NavLink>
              {cat.subcategories?.length > 0 &&
                renderDesktopSubcategories(cat.subcategories)}
            </div>
          ))}

          {/* Additional static pages */}
          <NavLink
            to="/about"
            className="text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
          >
            Contact Us
          </NavLink>
        </ul>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/trackordercustomer"
            className="text-gray-700 hover:text-rose-600 transition"
            title="Track Order"
          >
            <PackageSearch size={24} />
          </Link>
          <Link
            to="/account"
            className="text-gray-700 hover:text-rose-600 transition"
            title="My Account"
          >
            <LogIn size={24} />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/trackordercustomer"
            className="text-gray-700 hover:text-rose-600 transition"
            title="Track Order"
          >
            <PackageSearch size={24} />
          </Link>
          <Link
            to="/account"
            className="text-gray-700 hover:text-rose-600 transition"
            title="My Account"
          >
            <LogIn size={24} />
          </Link>

          {mobileMenuOpen ? (
            <X size={28} onClick={() => setMobileMenuOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setMobileMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-xl z-40 flex flex-col px-4 py-6 space-y-4 md:hidden">
          {categories.map((cat) => (
            <div key={cat.id}>
              <div className="flex justify-between items-center">
                <NavLink
                  to={`/category/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
                >
                  {cat.name}
                </NavLink>
                {cat.subcategories?.length > 0 && (
                  <button onClick={() => toggleMenu(cat.id)}>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        expandedMenus[cat.id] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {cat.subcategories?.length > 0 &&
                expandedMenus[cat.id] &&
                renderMobileSubcategories(cat.subcategories)}
            </div>
          ))}

          {/* Static About & Contact Us for mobile */}
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-semibold tracking-wide text-gray-700 hover:text-rose-600"
          >
            Contact Us
          </NavLink>
        </ul>
      )}
    </header>
  );
};

export default Header;
