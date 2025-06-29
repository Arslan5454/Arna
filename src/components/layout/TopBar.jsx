import React from 'react'

const TopBar = () => {
  return (
    <div className="hidden md:block bg-black text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4">
          🔥 Welcome to Arna Clothing Center — Flat 20% Off on All Products — Limited Time Offer! 🔥
        </span>
        <span className="mx-4">
          🔥 Free Shipping on Orders Over Rs. 5000 — Don't Miss Out! 🔥
        </span>
      </div>
    </div>
  );
};


export default TopBar
