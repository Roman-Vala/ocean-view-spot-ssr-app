import React from 'react';

import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import IMG1 from '../../../img/IMG1.jpg'
import IMG2 from '../../../img/IMG2.jpg'
import IMG3 from '../../../img/IMG3.jpg'
import IMG4 from '../../../img/IMG4.jpg'
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SlideShow() {

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // autoplay={{disableOnInteraction:false, delay:8000}}
      loop={true}
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
        height:350,
        borderRadius: 3,
      }}
    >
      <SwiperSlide>
        <img src={IMG4}></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={IMG1}></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={IMG2}></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={IMG3}></img>
      </SwiperSlide>
    </Swiper>
  );
};