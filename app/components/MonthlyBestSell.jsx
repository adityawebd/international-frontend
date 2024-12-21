import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BestSellCard from "./BestSellCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const MonthlyBestSell = ({ price, ...props }) => {
  useEffect(() => {
    //animate on scroll
    AOS.init();
  }, []);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = "MonthlyBestSell";

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("before reaponce")
        const response = await axios.get(
          `/api/productnewarrival?properties=${type}`
        );

        //console.log("the responce is ", response);
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
      <div className="monthly_best_sell" id="monthly_best_sell">
        <div className="container py-5">
          <h2
            data-aos="fade-down"
            data-aos-duration="1000"
            className="mb-4 font-semibold text-2xl"
          >
            <span>Monthly</span> Best Sell
          </h2>

          <div className="row">
            <div className="col-md-3">
              <div className="best_sell_banner_wrapper">
                <div
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  className="banner"
                >
                  <img
                    loading="lazy"
                    src="/assets/imgs/banner/banner-9.jpg"
                    className="rounded-2xl max-sm:w-32 max-sm:rounded-xl"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 best_sell_cards">
              {loading ? (
                // Preloader when data is being fetched
                <div className="flex gap-2 justify-center items-center h-64">
                  <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
                  <p className="ml-4 green_font text-sm mt-1">
                    Loading products...
                  </p>
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
                    <SwiperSlide  key={index}>
                      <BestSellCard
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
                <p className="text-center green_font mt-4 h-full flex justify-center items-center">
                  No products available at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBestSell;
