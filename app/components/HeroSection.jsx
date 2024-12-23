"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductTopbar from "./ProductTopbar";

//imports for swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
const HeroSection = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "",
      alt: "",
    },
    {
      id: 2,
      src: "",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "",
      alt: "Image 3",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get("/api/banner").then((response) => {
  //     const apiImages = response.data.map((item) => item.images[0]);
  //     const updatedImages = images.map((image, index) => ({
  //       ...image,
  //       src: apiImages[index] ? apiImages[index] : image.src,
  //     }));
  //     setImages(updatedImages);
  //   });
  // }, []);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("/api/banner");
        const apiImages = response.data.map((item) => item.images[0]);
        const updatedImages = images.map((image, index) => ({
          ...image,
          src: apiImages[index] ? apiImages[index] : image.src,
        }));
        setImages(updatedImages);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
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
      }, 1000); // duration of the animation

      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating]);

  useEffect(() => {
    //animate on scroll
    AOS.init();
  }, []);

  // if (loading)
  //   return (
  //     <div className="flex gap-2 justify-center items-center w-full pt-2">
  //       <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
  //       <p className="ml-4 green_font text-sm mt-1">Loading banner...</p>
  //     </div>
  //   ); // Show preloader while loading

  return (
    <>
      <ProductTopbar />
      <div className="heronewwrapper">
        {/* <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20 hero_nav_btns"
        /> */}
        <Swiper
          // spaceBetween={10}
          slidesPerView={1.5}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={3000}
          // navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            // Mobile small (smaller than 500px)
            320: {
              slidesPerView: 1, // 1 slide on very small screens
              // spaceBetween: 5,
            },
            // Mobile medium (around 500px)
            500: {
              slidesPerView: 1,
              // spaceBetween: 10,
            },
            // Tablets (around 768px)
            768: {
              slidesPerView: 1, // Can show partial next slide
              // spaceBetween: 15,
            },
            // Tablets large (around 1024px)
            1024: {
              slidesPerView: 1, // Showing 2 slides
              // spaceBetween: 20,
            },
            // Laptops (around 1300px)
            1300: {
              slidesPerView: 1, // Show 2.5 slides
              // spaceBetween: 25,
            },
            // Desktop (larger than 1500px)
            1500: {
              slidesPerView: 1, // Show 3 full slides
              // spaceBetween: 30,
            },
          }}
          navigation={true}
          //  modules={[Autoplay, Pagination, Navigation]}
          modules={[Autoplay, Navigation, A11y]}
          className="swiper-wrapper"
        >
          {loading ? (
            <div className="flex gap-2 justify-center items-center pt-2 h-[100vh] w-full">
              <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
              <p className="ml-4 green_font text-sm mt-1">Loading banners...</p>
            </div>
          ) : (
            images.map((image, index) => (
              <SwiperSlide
                key={image.id}
                // className={`w-full h-full absolute transition-transform duration-1000 ${
                //   index === currentSlide ? "opacity-100" : "opacity-0"
                // }`}
                // style={{
                //   transform: `translateX(${(index - currentSlide) * 100}%)`,
                // }}
              >
                <img
                  loading="lazy"
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectfit="cover"
                  // className="animate-fadeIn mx-auto lg:h-[80vh] "
                  className="h-[auto] lg:max-h-[800px] md:max-h-[300px] max-sm:max-h-[200px] mx-auto"
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        {/* <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20 hero_nav_btns"
        /> */}

        <div className="relative flex justify-center p-2 d-none">
          {images.map((_, index) => (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
