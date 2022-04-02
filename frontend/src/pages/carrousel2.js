// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Ciudades from "../components/apiPaises";
import "../style.css";

// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from "swiper";

export default function Carrousel2() {
  return (
    <>
      {
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[EffectFlip, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {Ciudades.map((evento) => (
            <SwiperSlide key={evento.Carrousel2}>
              <div className="img-carrousel">
                <img src={process.env.PUBLIC_URL + `/paises/${evento.image}`} />
              </div>
              <div className="txt-carrousel">
                <a src="#">{evento.ciudad}</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </>
  );
}
