"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductTopbar from "./ProductTopbar";

// Imports for Swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeTopbarAndData = async () => {
      // Ensure ProductTopbar is initialized first
      setInitialized(true);

      // Fetch banners after initializing the top bar
      try {
        const response = await axios.get("/api/banner");
        const apiImages = response.data.map((item) => item.images[0]);
        setImages(apiImages);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeTopbarAndData();
  }, []);

  useEffect(() => {
    // Animate on scroll
    AOS.init();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentSlide, images.length]);

  useEffect(() => {
    if (isAnimating) {
      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duration of the animation

      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating]);

  // Show loading spinner if loading or ProductTopbar not initialized
  if (loading || !initialized)
    return (
      <div className="flex gap-2 justify-center items-center w-full pt-2 h-[100vh]">
        <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 green_font text-sm mt-1">Loading banner...</p>
      </div>
    );

  return (
    <>
      <ProductTopbar />
      <main>
        <div className="heronewwrapper">
          <Swiper
            slidesPerView={1.5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              500: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
              1300: { slidesPerView: 1 },
              1500: { slidesPerView: 1 },
            }}
            navigation={true}
            modules={[Autoplay, Navigation, A11y]}
            className="swiper-wrapper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  loading="lazy"
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="h-[auto] lg:max-h-[800px] md:max-h-[300px] max-sm:max-h-[200px] mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className="relative flex justify-center p-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={
                  index === currentSlide
                    ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                    : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                }
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div> */}
        </div>
      </main>
    </>
  );
};

export default HeroSection;
