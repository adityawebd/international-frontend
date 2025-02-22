import React, { useEffect, useState } from "react";
import NewArrivalCard from "./NewArrivalCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const NewArrival = ({ title, related }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const type = related || "NewArrival";

  useEffect(() => {
    if (type === "NewArrival") {
      const fetchNewArrivals = async () => {
        try {
          const response = await axios.get(
            `/api/productnewarrival?properties=${type}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching New Arrival data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNewArrivals();
    }
  }, []);

  // useEffect(() => {
  //   if (type !== "NewArrival") {
  //     const fetchOtherProducts = async () => {
  //       try {
  //         const response = await axios.get(`/api/productf?properties=${type}`);
  //         setProduct(response.data);
  //       } catch (error) {
  //         console.error("Error fetching other products data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchOtherProducts();
  //   }
  // }, [related]);

  //   console.log("product",product,"related",related);

  // Determine slidesPerView dynamically based on product length

  const slidesToShow = Math.min(product.length, 5); // Max 5 slides
  const enableLoop = product.length > slidesToShow;

  return (
    <div>
      <div className="new_arrival py-5" id="new_arrival">
        <h2
          data-aos="fade-up"
          className="mb-4 font-semibold text-4xl text-center light_black_font"
        >
          {title}
        </h2>
        <p data-aos="fade-up" className="text-center text-sm light_black_font">
          Browse The Best Collections of Month
        </p>
        <div className="container mt-4">
          {loading ? (
            <div className="grid grid-cols-5 max-sm:grid-cols-1 gap-4 px-10 max-sm:px-2">
              <div className="animate-pulse h-[300px] w-full bg-gray-300 rounded"></div>
              <div className="animate-pulse h-[300px] w-full bg-gray-300 rounded"></div>
              <div className="animate-pulse h-[300px] w-full bg-gray-300 rounded"></div>
              <div className="animate-pulse h-[300px] w-full bg-gray-300 rounded"></div>
              <div className="animate-pulse h-[300px] w-full bg-gray-300 rounded"></div>
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
              {product?.map((product, index) => (
                <SwiperSlide key={index}>
                  <NewArrivalCard
                    card_link={`/product/${product?._id}`}
                    img_src={product?.images[0]}
                    img_title={product?.title}
                    sku_id={product?.sku}
                    title={product?.title}
                    discounted_price={product?.discountedPrice}
                    actual_price={product?.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center green_font mt-4">
              No products available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
