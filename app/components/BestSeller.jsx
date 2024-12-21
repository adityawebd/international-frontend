import React, { useEffect, useState } from "react";
import BestSellCard from "./BestSellCard";
import NewArrivalCard from "./NewArrivalCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const BestSeller = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); 
  const type = "BestSeller";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/productnewarrival?properties=${type}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine slidesPerView dynamically based on product length
  const slidesToShow = Math.min(product.length, 5); // Max 5 slides
  const enableLoop = product.length > slidesToShow;

  return (
    <div>
      <div className="new_arrival py-5" id="best_seller">
        <h2
          data-aos="fade-up"
          data-aos-duration="500"
          className="mb-4 font-semibold text-4xl text-center light_black_font"
        >
          Best Seller
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center text-sm light_black_font"
        >
          Browse The Collection of Top Products
        </p>
        <div className="container mt-4">
          {loading ? (
            // Preloader when data is being fetched
            <div className="flex gap-2 justify-center items-center h-64">
              <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
              <p className="ml-4 green_font text-sm mt-1">Loading products...</p>
            </div>
          ) : product.length > 0 ? (
            // Swiper if products are available
            <Swiper
              spaceBetween={10}
              slidesPerView={slidesToShow}
              loop={enableLoop}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                500: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1300: {
                  slidesPerView: 5,
                },
              }}
              navigation={true}
              modules={[Autoplay, Navigation, A11y]}
              className="swiper-wrapper mx-auto mb-4"
            >
              {product.map((product, index) => (
                <SwiperSlide key={index}>
                  <NewArrivalCard
                    card_link={`/product/${product._id}`}
                    img_src={product.images[0]}
                    img_title={product.title}
                    sku_id={product.sku}
                    title={product.title}
                    discounted_price={product.discountedPrice}
                    actual_price={product.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Fallback message if no products are available
            <p className="text-center green_font mt-4">
              No products available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
