'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
const HeroSection = () => {
  const images = [
    { id: 1, src: "/assets/image/1.jpg", alt: "Image 1", text: "Welcome to our store!" },
    { id: 2, src: "/assets/image/2.jpg", alt: "Image 2", text: "Discover our new collection" },
    { id: 3, src: "/assets/image/1.jpg", alt: "Image 3", text: "Exclusive offers available now" },
    { id: 4, src: "/assets/image/2.jpg", alt: "Image 4", text: "Shop the latest trends" },
  ];
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

  return (
    <div className="relative">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />
      <div className="w-full h-[80vh] flex overflow-hidden relative m-auto">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`w-full h-full absolute transition-transform duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="animate-fadeIn"
              />
              {/* {index === currentSlide && (
                <div className="absolute bottom-8 left-8 bg-black bg-opacity-50 text-white p-4 rounded hero_img_text">
                  {image.text}
                </div>
              )} */}
            </div>
          ))}
        </Swipe>
      </div>
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />

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
  );
}

export default HeroSection;
