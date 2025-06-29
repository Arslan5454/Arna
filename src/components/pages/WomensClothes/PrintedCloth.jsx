// import { Eye, ShoppingCart } from 'lucide-react';
// import React from 'react'
// import { useNavigate } from 'react-router-dom';



// const PrintedCloth = () => {

//     const navigate = useNavigate()
//     const lawnItems = [
//     {
//       id: 1,
//       title: "Classic Lawn Suit",
//       image: "/images/lawn1.jpg",
//       price: "PKR 3,990",
//     },
//     {
//       id: 2,
//       title: "Printed Lawn 3pc",
//       image: "/images/lawn2.jpg",
//       price: "PKR 4,250",
//     },
//     {
//       id: 3,
//       title: "Embroidered Lawn",
//       image: "/images/lawn3.jpg",
//       price: "PKR 5,500",
//     },
//     // aur items add kar sakte hain
//   ];
//   return (
//     <section className="bg-white">
//       {/* Video Section */}
//       <div className="relative w-full h-96 overflow-hidden">
//         <video
//           src="/videos/lawn-promo.mp4"
//           autoPlay
//           loop
//           muted
//           className="w-full h-full object-cover"
//         ></video>
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           <h1 className="text-white text-4xl md:text-5xl font-bold font-playfair">
//             PRINTED COLLECTION
//           </h1>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {lawnItems.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-xl overflow-hidden shadow group cursor-pointer hover:shadow-lg transition"
//             >
//               <div className="h-72 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transform group-hover:scale-105 transition"
//                 />
//               </div>
//               <div className="p-4 text-left">
//                 <h2 className="text-lg font-semibold text-gray-800 group-hover:text-rose-600">
//                   {item.title}
//                 </h2>
//                 <p className="mt-2 text-rose-600 font-bold">{item.price}</p>

//                 <div className="flex gap-4 mt-4">
//                   <button
//                     className="flex items-center gap-2 bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition"
//                     onClick={() => alert(`Added ${item.title} to cart!`)}
//                   >
//                     <ShoppingCart size={18} /> Add to Cart
//                   </button>

//                   <button
//                     className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
//                     onClick={() => navigate(`/printed/${item.id}`)}
//                   >
//                     <Eye size={18} /> View
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default PrintedCloth

import ProductGrid from "../../common/ProductGrid";

const printedItems = [
  { id: 1, title: "Classic Lawn Suit", image: "/images/lawn1.jpg", price: "PKR 3,990" },
  { id: 2, title: "Printed Lawn 3pc", image: "/images/lawn2.jpg", price: "PKR 4,250" },
  { id: 3, title: "Embroidered Lawn", image: "/images/lawn3.jpg", price: "PKR 5,500" },
];

const PrintedCloth = () => (
  <ProductGrid
    title="PRINTED COLLECTION"
    videoSrc="/videos/lawn-promo.mp4"
    products={printedItems}
  />
);

export default PrintedCloth;
