"use client";
const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from 'next/link'
import { CurrencyContext } from "../../CurrencyContext";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import { useCartStore } from "../../../stores/useCartStore";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Variations from "../../components/Variations";
import ExploreFeeds from "../../components/ExploreFeeds";
import Magnify from "../../components/Magnify";
import { FaStar, FaCheck, FaRegHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";

import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import NewArrival from "../../components/NewArrival";
import StarRating2 from "../../components/StarRating2";
import { Check, CheckCircle } from "lucide-react";
import { Checkbox } from "@material-tailwind/react";

const Page = ({ params }) => {
  const urldata = decodeURIComponent(params.productname);
  // console.log("urldata is",urldata);

  const [activeTab, setActiveTab] = useState("general_info");
  const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
  const [isCounting, setIsCounting] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);
  const [productData, setProductData] = useState(null);
  const [sku, setSku] = useState([]);
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const [skuData, setSkuData] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const imgTabRef = useRef(null);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    axios.get(`/api/productDetail?condition=${urldata}`).then((response) => {
      setProductData(response.data[0]);
      setSku(response.data[0].sku); // Assuming the API returns an array of products
    });
  }, [urldata]);

  useEffect(() => {
    axios.get(`/api/productskuDetail?condition=${sku}`).then((response) => {
      setSkuData(response.data);
      // Assuming the API returns an array of products
    });
  }, [sku]);

  console.log("sku data is", skuData);

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[0],
  });
  const { value: value2, reset: resetValue2 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[1],
  });
  const { value: value3, reset: resetValue3 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[2],
  });
  const { value: value4, reset: resetValue4 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[3],
  });
  const { value: value5, reset: resetValue5 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[4],
  });

  const { currency, exchangeRates } = useContext(CurrencyContext);

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews?.reduce(
      (acc, review) => acc + parseInt(review.rating),
      0
    );
    const averageRating = totalRating / reviews?.length;
    return Math.round(averageRating);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductTabClick = (index) => {
    setActiveProductTab(index); // Update active tab when a tab button is clicked
  };

  useEffect(() => {
    if (activeTab === "reviews") {
      setProgressValues([75, 50, 60, 80, 90]); // Update with your desired values
      resetValue1();
      resetValue2();
      resetValue3();
      resetValue4();
      resetValue5();
      setIsCounting(true);
    } else {
      setIsCounting(false);
    }
  }, [
    activeTab,
    resetValue1,
    resetValue2,
    resetValue3,
    resetValue4,
    resetValue5,
  ]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const convertedPrice = convertPrice(
    productData.discountedPrice,
    currency,
    exchangeRates
  );
  const convertedActualPrice = convertPrice(
    productData.price,
    currency,
    exchangeRates
  );
  const averageRating = calculateAverageRating(productData.reviews);

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior
    addToCart(item);
  };
  const addToCart2 = (e, item) => {
    // Prevent default form submission or link behavior
    addToCart(item);
    window.location.replace("/cart");
  };

  const scrollImages = (direction) => {
    const container = imgTabRef.current;
    if (container) {
      if (direction === "up") {
        container.scrollBy({ top: -160, behavior: "smooth" });
        // console.log('up clicked')
      } else if (direction === "down") {
        container.scrollBy({ top: 160, behavior: "smooth" });
        // console.log('down clicked')
      }
    }
  };

  const addToCartHandler = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity });
  };

  // const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      // Call addToCartHandler with the updated quantity
      addToCartHandler(new Event("click"), {
        ...productData,
        quantity: newQuantity,
      });
      return newQuantity;
    });
  };
  const decreaseQuantity = () => {
    // if (quantity > 1) setQuantity((prev) => prev - 1);
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent decrementing below 1
  };

  var hasPurchasedCourse = true;

  const handleRatingChange = (newRating) => {
    console.log("Rating Changed:", newRating);
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    console.log("Submit Review Function Called");
    alert("Submit Review Function Called");

    // if (rating && reviewText) {
    //   const newReview = {
    //     name: usersessions?.name,
    //     rating: rating,
    //     comment: reviewText, // Adjusted to match the 'comment' field in your API
    //     user_id: usersessions?._id, // Replace with the actual user_id if needed
    //     module_data_id: item._id, // Replace with the actual module_data_id
    //   };

    //   try {
    //     // Send the review data to the API
    //     const response = await axios.post('/api/reviews', newReview);

    //     if (response.status === 201) {
    //       // Update the local state with the new review
    //       setReview([...review, newReview]);
    //       setRating(0);
    //       setReviewText("");
    //       alert("Review Submitted");
    //       window.location.reload()
    //       console.log("Review Submitted:", newReview);
    //     } else {
    //       console.error("Failed to submit review:", response.data.error);
    //       alert("Failed to submit review. Please try again.");
    //     }
    //   } catch (error) {
    //     console.error("Error submitting review:", error);
    //     alert("An error occurred while submitting the review. Please try again.");
    //   }
    // }
  };

  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="Product Details" />

      <div className="product mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 product_img_wrapper">
              <div className="product_img_wrapper_container">
                <div
                  className="scroll_button"
                  onClick={() => scrollImages("up")}
                >
                  <FaCircleChevronUp />
                </div>
                <div className="product_img_tab_btns" ref={imgTabRef}>
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      className={index === activeProductTab ? "active" : ""}
                      onClick={() => handleProductTabClick(index)}
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={150}
                        height={160}
                      />
                    </button>
                  ))}
                </div>
                <div
                  className="scroll_button"
                  onClick={() => scrollImages("down")}
                >
                  <FaCircleChevronDown />
                </div>
                <div className="product_img_tab_content">
                  {productData.images.map((image, index) => (
                    <div
                      key={index}
                      className={
                        index === activeProductTab ? "active" : "hidden"
                      }
                    >
                      <Magnify
                        imageSrc={productData.images[activeProductTab]}
                        alt={`Product image ${activeProductTab + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 product_about_wrapper">
              <h3 className="text-xl font-semibold">{productData.title}</h3>
              <p className="green_font font-semibold price mt-2">
                {currency === "INR" ? "₹" : "$"} {convertedPrice.toFixed(2)}{" "}
                &nbsp;
                <span>
                  {currency === "INR" ? "₹" : "$"}{" "}
                  {convertedActualPrice.toFixed(2)}
                </span>
                <div className="text-xs">Inclusive of all taxes</div>
              </p>
              <div className="my-2">
                <img src="/assets/images/icons/payment.png" alt="" />
              </div>
              <div className="rating_div flex align-middle mt-2">
                <div className="stars flex align-middle mr-3">
                  {averageRating ? (
                    [...Array(averageRating)].map((_, index) => (
                      <span key={index} className="colored_star">
                        <FaStar />
                      </span>
                    ))
                  ) : (
                    <span>No Ratings</span>
                  )}
                </div>
                <div className="review">
                  {productData.reviews?.length
                    ? productData.reviews?.length
                    : "No"}{" "}
                  Reviews
                </div>
              </div>
              <p className="text-base light_black_font mt-3">
                <span className="text-black font-semibold">
                  Short Description:{" "}
                </span>
                {productData.shortDescriptionPoints?.map((point, index) => (
                  <ul key={index}>
                    <li>
                      <span className="flex gap-2">
                        <CheckCircle /> {point}
                      </span>
                    </li>
                  </ul>
                ))}
              </p>

              <td className="pt-2">
                <div className=" flex items-center justify-center border border-black rounded-full px-4 py-1 my-2">
                  <button onClick={decreaseQuantity}>-</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{quantity}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </td>

              <div className="cart_btns mt-4  ">
                <button onClick={(e) => addToCart2(e, productData)}>
                  buy now{" "}
                </button>
                <button onClick={(e) => addToCart1(e, productData)}>
                  <span>
                    <HiOutlineShoppingBag />
                  </span>{" "}
                  &nbsp; add to cart{" "}
                </button>
              </div>
              <div className="product_variations">
                <h2 className="text-xl font-semibold light_black_font mt-4">
                  Variations
                </h2>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.5}
                  loop={true}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  breakpoints={{
                    500: {
                      slidesPerView: 3.4,
                    },
                    780: {
                      slidesPerView: 3.8,
                    },
                    1300: {
                      slidesPerView: 4.6,
                    },
                  }}
                  modules={[Autoplay, Navigation, A11y]}
                  className="swiper-wrapper mx-auto mb-4"
                >
                  {skuData.map((data) => (
                    //  <Variations key={data._id} images={data.images} />
                    <SwiperSlide key={data._id}>
                      <a href={`/product/${data._id}`}>
                        <div>
                          <img
                            src={data.images[0]}
                            alt={data.title}
                            height={100}
                            width={100}
                          />
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row product_details mt-4">
            <div className="mb-4 mt-2 flex justify-center align-middle">
              <ul
                className="flex tabs_ul flex-wrap -mb-px text-sm font-medium text-center"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "general_info"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("general_info")}
                  >
                    General Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "additional_info"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("additional_info")}
                  >
                    Additional Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "reviews"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>
            <div>
              {activeTab === "general_info" && (
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="text-sm text-gray-500">
                    {productData.description}
                  </p>
                </div>
              )}
              {activeTab === "additional_info" && (
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="text-sm text-gray-500">
                    {productData?.property && (
                      <ul>
                        {Object.entries(productData.property).map(
                          ([key, value]) => (
                            <li key={key}>
                              <strong>{key}:</strong> {value}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="row">
                    {/* <div className="col-md-4 left_review_section">
                                            <div className="average_rating_div">
                                            </div>
                                        </div> */}
                    <div className="col-md-12 right_review_section px-5">
                      <div className="average_review mb-4">
                        <p className="text-lg font-medium text-gray-900">
                          Average Review: &nbsp;
                          <span className="green_font">{averageRating}</span>
                        </p>
                        <div className="flex align-middle">
                          {/* <div className="stars flex align-middle mr-3">
                                                            {Array.isArray(averageRating) && averageRating.length > 0 ? (
                                                                averageRating.map((_, index) => (
                                                                    <span key={index} className="colored_star">
                                                                        <FaStar />
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span>No rating available</span>
                                                            )}
                                                        </div> */}
                          <div className="review mt-3">
                            Total Reviews: {productData.reviews?.length}
                          </div>
                        </div>
                      </div>
                      <div className="review_items">
                        {Array.isArray(productData.reviews) &&
                        productData.reviews.length > 0 ? (
                          productData.reviews.map((review, index) => {
                            const rating = parseInt(review.rating, 10) || 0; // Default to 0 if rating is invalid

                            return (
                              <div className="review_item mb-4" key={index}>
                                <div className="author_info flex align-middle">
                                  <div className="author_image mr-3">
                                    <FaUserCircle size={25} />
                                  </div>
                                  <div className="author_about flex flex-col align-middle">
                                    <div className="author_name font-semibold flex">
                                      {review.name}{" "}
                                      <span className="author_badge pt-1 pl-1 green_font">
                                        <MdVerified />
                                      </span>
                                    </div>

                                    <div className="author_rating flex align-middle mt-2 mb-1">
                                      <div className="author_stars flex align-middle mr-1">
                                        {[...Array(rating)].map((_, i) => (
                                          <span
                                            key={i}
                                            className="colored_star"
                                          >
                                            <FaStar />
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="author_date text-sm">
                                      {review.comment}
                                    </div>
                                  </div>
                                </div>
                                <div className="review_content mt-2">
                                  <p className="text-sm">{review.text}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>No reviews available</div>
                        )}
                      </div>

                      <div className="mt-5">
                      {/* Write a review section  */}
                      {hasPurchasedCourse ? (
                        <div className="mt-5">
                          <div className="section-title">
                            <h4 className="text-lg text-blackClr font-bold">
                              Write your review
                            </h4>
                            <hr className="text-textClr my-3" />
                          </div>

                          <div className="mb-4 star_clr">
                            <StarRating2
                              rating={rating}
                              onRatingChange={handleRatingChange}
                            />
                          </div>

                          <textarea
                            value={reviewText}
                            onChange={handleCommentChange}
                            placeholder="Write your review"
                            className="w-full h-24 p-2 border rounded outline-none"
                          ></textarea>

                          <button
                            onClick={handleSubmitReview}
                            className="bg_green text-sm text-white py-2 px-4 rounded mt-3"
                          >
                            Add Review
                          </button>
                        </div>
                      ) : (
                        <div className="mt-5">
                          <div className="section-title">
                            <h4 className="text-lg text-blackClr font-bold">
                              Write your review
                            </h4>
                            <hr className="text-textClr my-3" />
                          </div>

                          <p className="text-center text-textClr">
                            <span className="text-textClr font-bold text-lg block">
                              Purchase Required
                            </span>
                            <span className="block mb-4">
                              To write a review, you must purchase this course.
                            </span>
                            <span className="">
                              <Link
                                href="/cart"
                                className="bg_green text-sm text-white py-2 px-4 rounded mt-3 mr-4"
                                prefetch={true}
                              >
                                Buy Now
                              </Link>
                              OR
                              <Link
                                href="/login"
                                className="bg_green text-sm text-white py-2 px-4 rounded mt-3 ml-4"
                                prefetch={true}
                              >
                                Login
                              </Link>
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <NewArrival />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
