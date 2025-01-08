"use client";
import Image from "next/image";
import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useMemo,
} from "react";
const CategoriesContext = createContext();
import { useRouter } from "next/navigation";

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
  const [initialized, setInitialized] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  // Lazy load and memoize categories
  const memoizedCategories = useMemo(() => categories, [categories]);

  // Fetch banner images and categories only when needed
  useEffect(() => {
    const initializeTopbarAndData = async () => {
      // Ensure ProductTopbar is initialized first
      setInitialized(true);

      // Check if data is in localStorage for banners
      const cachedImages = localStorage.getItem("bannerImages");
      if (cachedImages) {
        setImages(JSON.parse(cachedImages)); // Use cached data
      } else {
        try {
          const response = await axios.get("/api/banner");
          const apiImages = response.data.map((item) => item.images[0]);
          setImages(apiImages);
          localStorage.setItem("bannerImages", JSON.stringify(apiImages)); // Cache data
        } catch (error) {
          console.error("Failed to fetch banners:", error);
        }
      }

      // Check if categories data exists in localStorage
      const cachedCategories = localStorage.getItem("categories");
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories)); // Use cached categories
      } else {
        try {
          const res = await fetch("/api/categories");
          const { categories } = await res.json();
          setCategories(categories);
          localStorage.setItem("categories", JSON.stringify(categories)); // Cache categories
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      }
    };

    initializeTopbarAndData();
  }, []);

  useEffect(() => {
    // Animate on scroll
    AOS.init();
  }, []);

  // Modal handlers
  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleFilter = useCallback(
    (property) => {
      if (selectedCategory) {
        router.push(`/products/${property}`);
      }
    },
    [selectedCategory, router]
  );

  // Category data
  const categoryData = useMemo(
    () =>
      categories.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {}),
    [categories]
  );

  console.log("1 log", categories)
  console.log("2 log", categoryData)

  // console.log(categoryData[selectedCategory]?.properties?.length);

  return (
    <div>
      <div className="product_topbar py-2 h-[100px]">
        <div className="container-auto">
          <div className="z-50 product_topbar_wrapper">
            {memoizedCategories.length === 0 ? (
              <div className="flex gap-4 px-10">
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
                <div className="animate-pulse w-20 h-20 bg-gray-300 rounded"></div>
              </div>
            ) : (
              memoizedCategories.map((category) => (
                <div
                  key={category._id}
                  style={{ cursor: "pointer" }}
                  className="pt_card_parent"
                  // onClick={() => handleCategoryClick(category._id)}
                  onClick={() => {
                    // Check if the category has subcategories (properties)
                    if (category.properties && category.properties.length > 0) {
                      // If properties exist, open the modal
                      handleCategoryClick(category._id);
                    } else {
                      // If no properties (subcategories), redirect to the category page
                      router.push(`/products/${category.name}`);
                    }
                  }}
                >
                  <img
                    loading="lazy"
                    src={category.image || `/assets/image/gift14.jpg`}
                    alt={category.name}
                    width={50}
                    height={50}
                  />
                  <div className="text-black tracking-wider fs-6 text-start px-2 topbar_word_wrapper">
                    {category.name.split(" ").map((word, idx) => (
                      <div key={idx} className="topbar_word">
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="heronewwrapper lg:h-[760px]">
        {images.length === 0 ? (
          <div className="animate-pulse h-[800px] w-full lg:max-h-[800px] md:max-h-[300px] max-sm:max-h-[200px] mx-auto bg-gray-300"></div>
        ) : (
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
            lazy={true} // Enable lazy loading
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
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-body">
              {selectedCategory && categoryData[selectedCategory] ? (
                <div>
                  <div className="flex justify-between">
                    <h2 className="category-name">
                      {categoryData[selectedCategory].name}
                    </h2>
                    <button className="mr-2" onClick={closeModal}>
                      ✕
                    </button>
                  </div>

                  <div className="category-subCategory-wrapper">
                    {categoryData[selectedCategory].properties?.map(
                      (property, index) => (
                        <button
                          key={index}
                          className="category-subCategory"
                          onClick={() => handleFilter(property.name)}
                        >
                          {property.name}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <p>Select a category to view data</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
