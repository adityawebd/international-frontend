"use client";
const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect, useContext, useRef } from "react";
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

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';

import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";

const Page = ({ params }) => {
    const urldata = decodeURIComponent(params.productname);
    // console.log("urldata is",urldata);

    const [activeTab, setActiveTab] = useState("general_info");
    const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
    const [isCounting, setIsCounting] = useState(false);
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);
    const [productData, setProductData] = useState(null);
    const [sku, setSku] = useState([])
    const [skuData, setSkuData] = useState([])
    const addToCart = useCartStore((state) => state.addToCart);
    const imgTabRef = useRef(null);

    useEffect(() => {
        axios.get(`/api/productDetail?condition=${urldata}`).then((response) => {
            setProductData(response.data[0]);
            setSku(response.data[0].sku)// Assuming the API returns an array of products
        });
    }, [urldata]);




    useEffect(() => {
        axios.get(`/api/productskuDetail?condition=${sku}`).then((response) => {
            setSkuData(response.data);
            // Assuming the API returns an array of products
        });
    }, [sku]);


    console.log("sku data is", skuData)

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
            if (direction === 'up') {
                container.scrollBy({ top: -160, behavior: 'smooth' });
                // console.log('up clicked')
            } else if (direction === 'down') {
                container.scrollBy({ top: 160, behavior: 'smooth' });
                // console.log('down clicked')
            }
        }
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
                                <div className="scroll_button" onClick={() => scrollImages('up')}>
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
                                <div className="scroll_button" onClick={() => scrollImages('down')}>
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
                            <p className="green_font font-semibold price">
                                {currency === "INR" ? "₹" : "$"} {convertedPrice.toFixed(2)}{" "}
                                &nbsp;
                                <span>
                                    {currency === "INR" ? "₹" : "$"}{" "}
                                    {convertedActualPrice.toFixed(2)}
                                </span>
                            </p>
                            <div className="rating_div flex align-middle mt-2">
                                <div className="stars flex align-middle mr-3">
                                    {averageRating ? (
                                        [...Array(averageRating)].map((_, index) => (
                                            <span key={index} className="colored_star">
                                                <FaStar />
                                            </span>
                                        ))
                                    ) : (
                                        <span>No rating available</span>
                                    )}
                                </div>
                                <div className="review">
                                    {productData.reviews?.length} Reviews
                                </div>
                            </div>
                            <p className="text-base light_black_font mt-3">
                                {productData.description}
                            </p>
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
                                        pauseOnMouseEnter: true
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
                                                    <img src={data.images[0]} alt={data.title} height={100} width={100} />
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
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === "general_info"
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
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === "additional_info"
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
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === "reviews"
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
                                    <p className="text-sm text-gray-500"> addinnal info</p>
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
                                                                {/* <div className="review_action flex align-middle mt-2">
                                                                    <div className="flex align-middle mr-3">
                                                                        <span className="flex align-middle mr-1">
                                                                            <BiLike />
                                                                        </span>
                                                                        <span className="mr-3">{review.likes || 0}</span>
                                                                        <span className="flex align-middle">
                                                                            <BiDislike />
                                                                        </span>
                                                                        <span>{review.dislikes || 0}</span>
                                                                    </div>
                                                                    <div className="flex align-middle ml-3">
                                                                        <span className="flex align-middle mr-1">
                                                                            <FaRegHeart />
                                                                        </span>
                                                                        <span>{review.hearts || 0}</span>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div>No reviews available</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ExploreFeeds />
            </div>
            <Footer />
        </div>
    );
};

export default Page;
