"use client";

import Image from "next/image";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';



export default function ProductDetailsPage({
  imglist = [],
}: {
  imglist?: string[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    

  


<>


    <div className="w-full h-125">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="w-full h-full"
      >
        {imglist.map((image, id) => (
          <SwiperSlide
            key={id}
            className="flex items-center justify-start"
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Product Image ${id}`}
                fill
                priority={id === 0}
                className="object-contain object-left p-0"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="w-full">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="w-full h-25 cursor-pointer"
      >
        {imglist.map((image, id) => (
          <SwiperSlide
            key={id}
            className="
              transition-all
              [&.swiper-slide-thumb-active]:border-2
              [&.swiper-slide-thumb-active]:border-[#22c55e]
            "
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Thumbnail ${id}`}
                fill
                className="object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
</>




  


  );
}