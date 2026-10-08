
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../../../asstes/images/imageye___-_imgi_111_home-slider-1.d79601a8.png";
import Link from "next/link";


const slides = [
  {
    title: "Fresh Products Delivered\nto your Door",
    description: "Get 20% off your first order",
    image: img1,
  },
  {
    title: "Freshness You Can\nTrust Every Day",
    description: "Discover fresh products for your family",
    image: img1,
  },
  {
    title: "Your Daily Needs,\nDelivered Fresh",
    description: "Shop your favorite products today",
    image: img1,
  },
];

export default function HeaderSlider() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{
          clickable: true,
          el: ".hero-pagination",
        }}
        
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex h-107.5 items-center overflow-hidden sm:h-125 lg:h-107.5">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt="Fresh products"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Green Overlay */}
              <div className="absolute inset-0 bg-green-600/80" />

              {/* Content */}
              <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-12">
                <div className="max-w-112.5 text-white">
                  <h1 className="mb-4 whitespace-pre-line text-3xl font-bold leading-tight sm:text-4xl lg:text-4xl">
                    {slide.title}
                  </h1>

                  <p className="mb-7 text-base sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
  href="/Product"
  className="rounded-lg bg-white px-7 py-3 font-semibold text-green-600 transition hover:bg-gray-100"
>
  Shop Now
</Link>
                    
                    <button className="rounded-lg border border-white px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-green-600">
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-5 left-0 z-20 flex w-full justify-center gap-2" />
    </section>
  );
}