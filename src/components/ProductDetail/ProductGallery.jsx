import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbsDirection, setThumbsDirection] = useState("horizontal");

  useEffect(() => {
    const updateDirection = () => setThumbsDirection(window.innerWidth >= 768 ? "vertical" : "horizontal");
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => window.removeEventListener("resize", updateDirection);
  }, []);

  return (
    <>
      <div className="md:w-1/4 flex flex-col gap-8">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          direction={thumbsDirection}
          className="h-[80px] md:h-[400px] w-full md:w-auto"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt="Thumbnail" className="w-20 h-20 md:w-20 md:h-24 object-cover rounded border cursor-pointer hover:scale-105 transition" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="md:w-1/2 flex items-center justify-center relative">
        <Swiper
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="w-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="overflow-hidden rounded relative group">
                <img src={img} alt="Product" className="w-full max-h-[500px] object-contain group-hover:scale-110 transition duration-300 ease-in-out" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductGallery;
