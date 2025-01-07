import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BestSellCard from "./BestSellCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import Link from "next/link";

const MonthlyBestSell = ({ price, ...props }) => {
  useEffect(() => {
    //animate on scroll
    AOS.init();
  }, []);

  const [discountBanners, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = "MonthlyBestSell";

  // const discountBanners = [
  //   {
  //     id: 1,
  //     imageUrl: "/assets/image/discoutnbanner.png",
  //     text: "under",
  //     discount: "₹400",
  //     link: "",
  //   },
  //   {
  //     id: 2,
  //     imageUrl: "/assets/image/discoutnbanner.png",
  //     text: "under",
  //     discount: "75% off",
  //     link: "",
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "/assets/image/discoutnbanner.png",
  //     text: "under",
  //     discount: "50% off",
  //     link: "",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("before reaponce")
        const response = await axios.get(`/api/BestSell`);

        //console.log("the responce is ", response);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Determine slidesPerView dynamically based on product length
  // const slidesToShow = Math.min(product.length, 5); // Max 5 slides
  // const enableLoop = product.length > slidesToShow;

  console.log("discountBanners", discountBanners);

  return (
    <div>
      <div className="bg-gray-100" id="monthly_best_sell">
        <div className="container py-5">
          <p
            data-aos="fade-up"
            className="text-center text-sm light_black_font"
          >
            Shop More With
          </p>
          <h2
            data-aos="fade-up"
            className="mb-4 font-semibold text-4xl text-center light_black_font"
          >
            Big Savings
          </h2>

          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {discountBanners.length > 0 &&
              discountBanners.map((data) => {
                return (
                  <Link
                    key={data._id}
                    href={data.order_link}
                    className="rounded-xl"
                  >
                    <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden">
                      <img
                        src={data.img_src}
                        alt=""
                        className="rounded-xl h-full w-full object-cover"
                      />
                      {/* Optional content overlay */}
                      <div className="p-4 absolute top-0 left-0 inset-0 w-full bg-black/70 hover:bg-black/40 transition duration-500 text-center z-10 text-white flex flex-col justify-center items-center h-full">
                        <h2 className="lg:text-4xl md:text-3xl max-sm:text-2xl text-2xl uppercase ">
                          {data.discount_text}
                        </h2>
                        <p className="lg:text-6xl md:text-5xl max-sm:text-4xl text-4xl font-bold uppercase  break-words">
                          {data.discount}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBestSell;
