import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

//imports for swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeVideos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Current video index

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reels.length) % reels.length
    );
  };

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reels.length);
  };

  const convertToEmbedUrl = (url) => {
    const shortRegex = /https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
    const match = url.match(shortRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}`;
    }
    return url;
  };

  const reels = [
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/nlNtskyfH9U",
      productUrl: "https://example.com/product/1",
    },
    {
      videoUrl: "https://www.youtube.com/shorts/v2DDv1iGL0Q",
      productUrl: "https://example.com/product/2",
    },
  ];

  const reelRefs = useRef([]);

  // Intersection Observer to play video when in view
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport as root
      rootMargin: "0px",
      threshold: 0.5, // trigger when 50% of the video is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play the video when it is in view
          const iframe = entry.target.querySelector("iframe");
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        } else {
          // Pause the video when it is out of view
          const iframe = entry.target.querySelector("iframe");
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      });
    }, observerOptions);

    reelRefs.current.forEach((reel) => observer.observe(reel));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="p-2 ">
        <h2 className="mb-2 font-semibold text-4xl text-center light_black_font">
          Watch & Shop
        </h2>
        <p className="text-center text-sm light_black_font">
          Browse The Collection of Top Products
        </p>
        {/* Scrollable Reel Container */}
        <div className="mt-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            speed={5000}
            scrollbar={{ draggable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1.6,
              },
              500: {
                slidesPerView: 2.2,
              },
              768: {
                slidesPerView: 2.6,
              },
              1024: {
                slidesPerView: 3.5,
              },
              1300: {
                slidesPerView: 5.5,
              },
              1500: {
                slidesPerView: 6.5,
              },
            }}
            navigation={true}
            //  modules={[Autoplay, Pagination, Navigation]}
            modules={[Autoplay, Navigation, A11y]}
            className="swiper-wrapper"
          >
            {reels.map((reel, index) => (
              <SwiperSlide
                key={index}
                // ref={(el) => (reelRefs.current[index] = el)}
              >
                {/* Video */}

                <div
                  onClick={() => openModal(index)}
                  className="relative w-full h-[500px] max-sm:h-[300px] bg-black overflow-hidden rounded-t-lg"
                >
                  <iframe
                    src={convertToEmbedUrl(reel.videoUrl)}
                    title={`Reel ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Buy Now Button */}
                <div className="flex justify-center">
                  <a
                    href={reel.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg_green text-white px-4 py-2 w-full text-center hover:bg_darkgray rounded-b-lg"
                  >
                    Buy Now
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-transparent hover:bg-gray-700 p-2 rounded-full"
            >
              <X />
            </button>
            <div className="relative flex justify-center items-center h-[80%] w-[350px] ">
              <iframe
                src={convertToEmbedUrl(reels[currentIndex].videoUrl)}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`Modal Video ${currentIndex}`}
              ></iframe>
            </div>
            <button
              onClick={prevVideo}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeVideos;
