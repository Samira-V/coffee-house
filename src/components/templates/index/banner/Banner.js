"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";


import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <img
          src="./images/2.png"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="./images/3.png"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="./images/1.png"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
