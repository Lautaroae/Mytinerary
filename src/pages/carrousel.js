import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Ciudades from "../components/apiPaises";
import { DialogActions } from "@mui/material";

export default function Carrousel() {
  return (
    <>
      {
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={5}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          sx={{}}
        >
          {Ciudades.map((evento) => (
            <SwiperSlide key={evento.Carrousel}>
              <div className="img-carrousel">
                <img src={process.env.PUBLIC_URL + `/paises/${evento.image}`} />
              </div>
              <div className="txt-carrousel">
                <p>{evento.ciudad}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </>
  );
}
