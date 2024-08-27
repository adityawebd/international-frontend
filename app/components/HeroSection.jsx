'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import AOS from 'aos';
import 'aos/dist/aos.css'
import axios from 'axios';

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ProductTopbar from "./ProductTopbar";

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
      src: "/assets/image/1.jpg",
      alt: "Image 1",
      text: [
        {
          id: 1,
          heading: "New Statue Collection",
          offer: "SALE OFFER",
          para: "Elevate Your Space – Stunning Statues on Sale Now!",
          btn_link: "products"
        }
      ]
    },
    {
      id: 2,
      src: "/assets/image/2.jpg",
      alt: "Image 2",
      text: [
        {
          id: 1,
          heading: "BEST STATUE SETS",
          offer: "SALE OFFER",
          para: "Transform Your Home – Beautiful Statues, Special Offers!",
          btn_link: "products"
        }
      ]
    },
    {
      id: 3,
      src: "/assets/image/1.jpg",
      alt: "Image 3",
      text: [
        {
          id: 1,
          heading: "New Statue Collection",
          offer: "SALE OFFER",
          para: "Elevate Your Space – Stunning Statues on Sale Now!",
          btn_link: "products"
        }
      ]
    },
  ]);

  useEffect(() => {
    axios.get('/api/banner').then(response => {
      const apiImages = response.data.map(item => item.images[0]);
      const updatedImages = images.map((image, index) => ({
        ...image,
        src: apiImages[index] ? apiImages[index] : image.src,
      }));
      setImages(updatedImages);
    });
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

  useEffect(() => { //animate on scroll
    AOS.init();
  }, [])

  return (
    <>
      <ProductTopbar />
      <div className="relative hero_main_wrapper">
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20 hero_nav_btns"
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
                <img
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectfit="cover"
                  className="animate-fadeIn"
                />
                {index === currentSlide && (
                  <div className="hero_img_text ">
                    {Array.isArray(image.text) ? (
                      image.text.map((textItem) => (
                        <div key={textItem.id}>
                          <h1 className="animated-text">{textItem.heading}</h1>
                          <h6 className="animated-text">{textItem.offer}</h6>
                          <p className="animated-text">{textItem.para}</p>
                          <a className="animated-text" href={textItem.btn_link}>ORDER NOW</a>
                        </div>
                      ))
                    ) : (
                      <h1>{image.text}</h1>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Swipe>
        </div>
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20 hero_nav_btns"
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
    </>
  );
}

export default HeroSection;
