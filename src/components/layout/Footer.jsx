import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* 1 - Company Info */}
        <div>
          <h3 className="text-2xl font-playfair text-rose-600 font-bold mb-4">
            Arna Wearing
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            Elevate your style with our premium collection of menswear,
            womenswear, and accessories. Quality fashion delivered to your
            doorstep.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-rose-500 transition" size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="hover:text-rose-500 transition" size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-rose-500 transition" size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="hover:text-rose-500 transition" size={20} />
            </a>
          </div>
        </div>

        {/* 2 - Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-rose-500">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/mens" className="hover:text-rose-500">
                Shop Mens
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-rose-500">
                Shop Women
              </Link>
            </li>
            <li>
              <Link to="/fragrances" className="hover:text-rose-500">
                Fragrances
              </Link>
            </li>
            <li>
              <Link to="/featured" className="hover:text-rose-500">
                Featured Products
              </Link>
            </li>
          </ul>
        </div>

        {/* 3 - Customer Support */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-rose-500">
            Customer Support
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/about" className="hover:text-rose-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-rose-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-rose-500">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-rose-500">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* 4 - Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-rose-500">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-rose-500" />
              <span>123 Main Street, Karachi, Pakistan</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={18} className="text-rose-500" />
              <a href="tel:+923001234567" className="hover:text-rose-500">
                +92 300 1234567
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={18} className="text-rose-500" />
              <a href="mailto:support@arna.com" className="hover:text-rose-500">
                support@arna.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Arna Wearing. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
