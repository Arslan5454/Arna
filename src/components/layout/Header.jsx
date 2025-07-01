import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Shirt,
  Flower,
  User,
  Phone,
  Info,
  Circle,
  ShoppingBag,
  ChevronDown,
  Menu,
  Snowflake,
  Star,
  X,
  Search,
  PackageSearch,
  LogIn,
} from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (name) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navLinks = [
    {
      name: "MENS",
      to: "/mens",
      icon: <Shirt size={18} />,
      submenu: {
        wear: [
          { name: "Menswear", to: "/menswear", icon: <Shirt size={16} /> },
          { name: "Kurtas", to: "/kurtas", icon: <ShoppingBag size={16} /> },
          { name: "Suits", to: "/suits", icon: <User size={16} /> },
          { name: "Featured", to: "/featured", icon: <Circle size={16} /> },
          { name: "Waistcoat", to: "/waistcoat", icon: <Shirt size={16} /> },
          { name: "Bottoms", to: "/bottoms", icon: <ShoppingBag size={16} /> },
        ],
        fragrance: [
          { name: "Fragrances", to: "/fragrances", icon: <Flower size={16} /> },
          {
            name: "Men Perfumes",
            to: "/men-perfumes",
            icon: <Flower size={16} />,
          },
        ],
      },
    },
    {
      name: "WOMEN",
      to: "/women",
      icon: <User size={18} />,
      submenu: {
        fabric: [
          { name: "Unstitched", to: "/unstitched", icon: <Shirt size={16} /> },
          { name: "Lawn", to: "/lawn", icon: <Flower size={16} /> },
          { name: "Printed", to: "/printed", icon: <Circle size={16} /> },
          {
            name: "Embroidered",
            to: "/embroidered",
            icon: <Flower size={16} />,
          },
          { name: "Winter", to: "/winter", icon: <Snowflake size={16} /> },
          { name: "Featured", to: "/featured-women", icon: <Star size={16} /> },
          {
            name: "Bottoms",
            to: "/bottoms-women",
            icon: <ShoppingBag size={16} />,
          },
        ],
      },
    },
    { name: "ABOUT", to: "/about", icon: <Info size={18} /> },
    { name: "CONTACT", to: "/contact", icon: <Phone size={18} /> },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-lg font-semibold tracking-wide ${
      isActive
        ? "text-rose-600 border-b-2 border-rose-600"
        : "text-gray-700 hover:text-rose-500"
    }`;

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
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <NavLink to={link.to} className={getNavLinkClass}>
                <li className="flex items-center gap-1">
                  {link.icon} {link.name}
                </li>
              </NavLink>

              {link.submenu && (
                <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-lg rounded-md p-6 space-x-8 z-50">
                  {link.name === "MENS" && (
                    <ul className="space-y-2">
                      {link.submenu.wear.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {item.icon}
                          <NavLink
                            to={item.to}
                            className="text-sm text-gray-700 hover:text-rose-600"
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {link.name === "WOMEN" && (
                    <ul className="space-y-2">
                      {link.submenu.fabric.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {item.icon}
                          <NavLink
                            to={item.to}
                            className="text-sm text-gray-700 hover:text-rose-600"
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
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
          {navLinks.map((link, index) => (
            <li key={index} className="w-full">
              <div className="flex justify-between items-center">
                <NavLink
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getNavLinkClass}
                >
                  <div className="flex items-center gap-2">
                    {link.icon} {link.name}
                  </div>
                </NavLink>

                {link.submenu && (
                  <button onClick={() => toggleMenu(link.name)}>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        expandedMenus[link.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {link.submenu && expandedMenus[link.name] && (
                <div className="mt-3 ml-4 space-y-3">
                  {link.name === "MENS" &&
                    link.submenu.wear.map((item, i) => (
                      <NavLink
                        key={i}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-rose-600"
                      >
                        {item.icon} {item.name}
                      </NavLink>
                    ))}

                  {link.name === "WOMEN" &&
                    link.submenu.fabric.map((item, i) => (
                      <NavLink
                        key={i}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-rose-600"
                      >
                        {item.icon} {item.name}
                      </NavLink>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
