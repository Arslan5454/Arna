import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import model1 from "../../assets/models/1.png";
import model2 from "../../assets/models/2.png";
import model3 from "../../assets/models/3.png";

const slides = [
  { leftImg: model1, rightImg: model2, caption: "Ready to Wear" },
  { leftImg: model2, rightImg: model3, caption: "Elegant & Effortless" },
  { leftImg: model3, rightImg: model1, caption: "Discover Your Look" },
];

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      loop
      autoplay={{ delay: 4000 }}
      className="w-full h-[50vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            {/* Left Image */}
            <img
              src={slide.leftImg}
              alt="Left model"
              className="absolute left-2 md:left-16 bottom-0 w-1/3 md:w-1/4 h-auto object-cover rounded-xl shadow-xl z-20 animate-fade-in"
            />

            {/* Right Image */}
            <img
              src={slide.rightImg}
              alt="Right model"
              className="absolute right-2 md:right-16 bottom-0 w-1/3 md:w-1/4 h-auto object-cover rounded-xl shadow-xl z-20 animate-fade-in"
            />

            {/* Center Caption */}
            <div className="relative z-30 text-center px-4 md:px-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-white leading-tight drop-shadow-sm animate-slide-up">
                {slide.caption}
              </h2>
              <button className="mt-4 bg-rose-500 text-white py-3 px-8 rounded-full text-sm md:text-base font-semibold hover:bg-rose-600 transition shadow animate-fade-in">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
