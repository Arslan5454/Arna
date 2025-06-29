import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import model1 from "../../assets/models/1.png"; // your model images
import model2 from "../../assets/models/2.png";
import model3 from "../../assets/models/3.png";

const slides = [
  { leftImg: model1, rightImg: model2, caption: "Ready to wear" },
  { leftImg: model2, rightImg: model3, caption: "Elegant & Effortless" },
  { leftImg: model3, rightImg: model1, caption: "Discover Your Look" },
];
const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{
        nextEl: null,
        prevEl: null,
      }}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 5000 }}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 px-2 sm:px-8 py-6 bg-gradient-to-r from-gray-50 via-gray-50 to-gray-100">
            {/* Left Image */}
            <div className="w-1/2 max-w-[180px] sm:max-w-[220px]">
              <img
                src={slide.leftImg}
                alt="Left model"
                className="w-full h-[260px] sm:h-[360px] object-cover rounded-xl shadow-sm"
              />
            </div>

            {/* Center Caption */}
            <div className="flex-1 text-center px-1 sm:px-4">
              <h2 className="text-lg sm:text-3xl font-playfair font-semibold text-gray-700 leading-tight">
                {slide.caption}
              </h2>
            </div>

            {/* Right Image */}
            <div className="w-1/2 max-w-[180px] sm:max-w-[220px]">
              <img
                src={slide.rightImg}
                alt="Right model"
                className="w-full h-[260px] sm:h-[360px] object-cover rounded-xl shadow-sm"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HeroCarousel;
