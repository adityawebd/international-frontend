import React, { useState, useEffect } from "react";
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
  const [productData, setProductData] = useState([]);
  const [review, setReview] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const addToCart = useCartStore((state) => state.addToCart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Current video index
  const [isZoomed, setIsZoomed] = useState(false); // Zoom state for images

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false); // Reset zoom when closing modal
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + productData.length) % productData.length
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productData.length);
  };

  const notify = () =>
    toast.success("Product added to cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  // const videoProduct = [
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  //   { url: "https://internationalgift.in/product/673c49b5bac14b959d11842b" },
  // ];

  const [videoProduct, setVideoProducts] = useState([]);
  useEffect(() => {
    fetchVideoProducts();
  }, []);

  const fetchVideoProducts = async () => {
    try {

      const res = await axios.get('/api/videoProduct');
      setVideoProducts(res.data.data);
    } catch (error) {
      console.error('Error fetching video products:', error);
    } finally {
      console.log('Video products:', videoProduct);
    }
  };

  // console.log("Video banners", videoProduct);
  

  useEffect(() => {
    // Extract IDs from the URLs
    const productIds = videoProduct.map((item) => {
      const urlParts = item.url.split("/product/");
      return urlParts[1]; // The ID is the part after '/product/'
    });

    // Fetch data for each product ID
    const fetchProductData = async () => {
      try {
        const responses = await Promise.all(
          productIds.map((id) =>
            axios.get(`/api/productDetail?condition=${id}`)
          )
        );
        const data = responses.map((response) => response.data[0]);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert(
          "There was an error fetching product data. Please try again later."
        );
      }
    };

    fetchProductData();
  }, [videoProduct]);

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior

    // console.log("quantity", quantity);
    // Run addToCart the number of times as quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }

    notify(); // Trigger a notification
  };

  const cart = useFromStore(useCartStore, (state) => state.cart);

  console.log("Video banners", productData);

  return (
    <div>
      <ToastContainer />
      <div className="p-2">
        <h2 className="mb-2 font-semibold text-4xl text-center light_black_font">
          Watch & Shop
        </h2>
        <p className="text-center text-sm light_black_font">
          Browse The Collection of Top Products
        </p>

        <div className="py-5">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            speed={2000}
            scrollbar={{ draggable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
              },
              500: {
                slidesPerView: 2.2,
              },
              768: {
                slidesPerView: 3.2,
              },
              1024: {
                slidesPerView: 5.2,
              },
              1300: {
                slidesPerView: 6.5,
              },
              1500: {
                slidesPerView: 7.5,
              },
            }}
            navigation={true}
            //  modules={[Autoplay, Pagination, Navigation]}
            modules={[Autoplay, Navigation, A11y]}
            className="swiper-wrapper"
          >
            {productData.map((product, index) => {
              const firstVideo = product.images?.find((image) =>
                image.endsWith(".mp4")
              );

              return (
                <SwiperSlide
                  key={index}
                  className="border rounded-lg shadow-md"
                >
                  <div className=" h-[370px] w-auto overflow-hidden rounded-t-lg">
                    {firstVideo && (
                      <video
                        src={firstVideo}
                        className="rounded-t-lg cursor-pointer h-[370px] w-auto object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onClick={() => openModal(index)} // Open modal with the current index
                      />
                    )}
                  </div>
                  <div className="p-2 pt-3 pb-2">
                    <div className="flex gap-2 items-center">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="rounded-full lg:h-8 lg:w-8 md:w-8 md:h-8 max-sm:w-8 max-sm:h-8 border-2 "
                      />
                      <div className="productTitle">{product.title}</div>
                    </div>

                    <div className="flex items-center mt-2 gap-2">
                      <p className="text-sm font-semibold text-md">
                        ₹{product.discountedPrice.toFixed(2)}{" "}
                      </p>
                      <p className="text-xs text-gray-400 pt-1 line-through">
                        ₹{product.price.toFixed(2)}
                      </p>
                      <span className="green_font text-xs pt-1">
                        {`${Math.round(
                          ((product.price - product.discountedPrice) /
                            product.price) *
                          100
                        )}% OFF`}
                      </span>
                    </div>

                    <div className="">
                      <button
                        onClick={(e) => addToCart1(e, productData)}
                        className="uppercase bg_green text-center w-full rounded-lg text-white mt-3 py-2 px-2 text-sm"
                      >
                        add to cart{" "}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 text-white bg-transparent rounded-full hover:bg-gray-500 transition duration-300"
        >
          <X />
        </button>
        <div className="relative  flex justify-center items-center">
          {/* Video in Modal */}
          <div className="h-full w-auto overflow-hidden rounded-lg">
            <video
              src={productData[currentIndex]?.images?.find((image) =>
                image.endsWith(".mp4")
              )}
              className="h-full w-full object-cover rounded-lg transition-transform"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
        >
          <ChevronRight />
        </button>
      </div>
      )}
    </div>
  );
};

export default HomeVideos;
