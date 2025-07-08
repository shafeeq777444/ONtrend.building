'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Ohio Boutique Hotel',
    price: 144,
    image:
      'https://images.unsplash.com/photo-1600585154084-49010cd3ca4e?auto=format&fit=crop&w=1600&q=80', // Replace with your image
    rating: 5,
    roomType: 'Grand Deluxe',

  },
  // Add more slides as needed
];

export default function BuildingCarouseImage() {
  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000 }}
        loop
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{ clickable: true }}
        className="h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              {/* Content */}
              <div className="absolute bottom-6 left-6 text-white max-w-md">
                <div className="text-sm font-light">{slide.roomType}</div>
                <div className="text-3xl font-bold mt-1">{slide.title}</div>
                <div className="flex items-center mt-1 text-yellow-400">
                  {'★'.repeat(slide.rating)}
                </div>
                <div className="mt-3 bg-white text-black rounded-full px-4 py-1 inline-block text-sm font-medium">
                  Start from ${slide.price}
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-2">
          <button className="prev-btn bg-white/60 p-2 rounded-full hover:bg-white shadow">
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute z-10 top-1/2 -translate-y-1/2 right-2">
          <button className="next-btn bg-white/60 p-2 rounded-full hover:bg-white shadow">
            <ChevronRight size={20} />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
