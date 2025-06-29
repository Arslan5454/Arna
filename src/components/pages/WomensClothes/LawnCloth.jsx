import React from "react";
import ProductGrid from "../../common/ProductGrid";

const lawnItems = [
  { id: 4, title: "Summer Lawn Deluxe", image: "/images/lawn4.jpg", price: "PKR 4,990" },
  { id: 5, title: "Festive Lawn 3pc", image: "/images/lawn5.jpg", price: "PKR 5,200" },
  { id: 6, title: "Luxury Lawn", image: "/images/lawn6.jpg", price: "PKR 6,500" },
];

const LawnCloth = () => (
  <ProductGrid
    title="LAWN COLLECTION"
    videoSrc="/videos/lawn-special.mp4"
    products={lawnItems}
  />
);

export default LawnCloth;
