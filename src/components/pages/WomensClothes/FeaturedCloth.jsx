import React from "react";
import ProductGrid from "../../common/ProductGrid";

const featuredItems = [
  { id: 7, title: "Luxury Festive", image: "/images/featured1.jpg", price: "PKR 7,500" },
  { id: 8, title: "Classic Festive", image: "/images/featured2.jpg", price: "PKR 8,000" },
];

const FeaturedCloth = () => (
  <ProductGrid
    title="FEATURED COLLECTION"
    videoSrc="/videos/featured-promo.mp4"
    products={featuredItems}
  />
);

export default FeaturedCloth;

