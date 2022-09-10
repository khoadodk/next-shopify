
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper";

export default function HeaderMessage({messages}) {
  return (
    <div className="py-3 px-4 text-center text-sm uppercase  border-b">
      <div className="sm:w-1/2 mx-auto">
          <Swiper 
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
              }} 
              navigation={true} 
              modules={[Autoplay, Navigation]}
          >
              {messages.map(msg => {
                  return <SwiperSlide>{msg}</SwiperSlide>
              })}
        </Swiper>
      </div>
    </div>
  );
}
