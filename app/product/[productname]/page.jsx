"use client";
const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../../CurrencyContext";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import { useCartStore } from "../../../stores/useCartStore"
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
import axios from "axios";

const Page = ({ params }) => {
    const urldata = decodeURIComponent(params.productname);
    // console.log("urldata is",urldata);

    const [activeTab, setActiveTab] = useState("general_info");
    const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
    const [isCounting, setIsCounting] = useState(false);
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);
    const [productData, setProductData] = useState(null);
    const addToCart = useCartStore(state => state.addToCart)

    useEffect(() => {
        axios.get(`/api/productDetail?condition=${urldata}`).then(response => {
            setProductData(response.data[0]); // Assuming the API returns an array of products
        });
    }, [urldata]);

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
        const totalRating = reviews?.reduce((acc, review) => acc + parseInt(review.rating), 0);
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
    }, [activeTab, resetValue1, resetValue2, resetValue3, resetValue4, resetValue5]);

    if (!productData) {
        return <div>Loading...</div>;
    }

    const convertedPrice = convertPrice(productData.discountedPrice, currency, exchangeRates);
    const convertedActualPrice = convertPrice(productData.price, currency, exchangeRates);
    const averageRating = calculateAverageRating(productData.reviews);

    const addToCart1 = (e, item) => {
        e.preventDefault();  // Prevent default form submission or link behavior
        addToCart(item);
    };

    return (
        <div>
            <Navbar />
            <div className="product mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 product_img_wrapper">
                            <div className="product_img_wrapper_container">
                                <div className="product_img_tab_btns">
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
                                <div className="product_img_tab_content">
                                    {productData.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={index === activeProductTab ? "active" : "hidden"}
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
                            <h3 className="text-xl font-semibold">
                                {productData.title}
                            </h3>
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
                                <div className="review">{productData.reviews?.length} Reviews</div>
                            </div>
                            <p className="text-base light_black_font">
                                {productData.description}
                            </p>
                            <div className="cart_btns">
                                <a onClick={(e) => addToCart1(e, productData)} >
                                    <span>
                                        <HiOutlineShoppingBag />
                                    </span>{" "}
                                    &nbsp; add to cart{" "}
                                </a>
                            </div>
                            <h2 className="text-xl font-semibold light_black_font mt-4">
                                Variations
                            </h2>
                            {/* <Variations images={productData.variations_images} /> */}
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
                                        Lorem ipsum
                                    </p>
                                </div>
                            )}
                            {activeTab === "additional_info" && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500">
                                        {" "}
                                        freoiio
                                    </p>
                                </div>
                            )}
                            {activeTab === "reviews" && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <div className="row">
                                        <div className="col-md-4 left_review_section">
                                            <div className="average_rating_div">
                                                <div className="rating_number">
                                                    <span>{averageRating}</span>
                                                </div>
                                                <div className="average_review">
                                                    <p className="text-lg font-medium text-gray-900">
                                                        Average Review
                                                    </p>
                                                    <div className="flex align-middle">
                                                        <div className="stars flex align-middle mr-3">
                                                            {Array.isArray(averageRating) && averageRating.length > 0 ? (
                                                                averageRating.map((_, index) => (
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
                                                </div>
                                            </div>
                                            <div className="rating_percentage flex align-middle">
                                                <ul className="flex flex-col w-full">
                                                    <li>
                                                        <span className="percent">
                                                            <div>{value5}%</div>
                                                        </span>
                                                        <span className="stars flex align-middle">
                                                            <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                                                            <FaStar />
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="percent">
                                                            <div>{value4}%</div>
                                                        </span>
                                                        <span className="stars flex align-middle">
                                                            <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="percent">
                                                            <div>{value3}%</div>
                                                        </span>
                                                        <span className="stars flex align-middle">
                                                            <FaStar /> <FaStar /> <FaStar />{" "}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="percent">
                                                            <div>{value2}%</div>
                                                        </span>
                                                        <span className="stars flex align-middle">
                                                            <FaStar /> <FaStar />{" "}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="percent">
                                                            <div>{value1}%</div>
                                                        </span>
                                                        <span className="stars flex align-middle">
                                                            <FaStar />{" "}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-8 right_review_section">
                                            <div className="review_items">

                                                {Array.isArray(productData.reviews) && productData.reviews.length > 0 ? (
                                                    productData.reviews.map((review, index) => {
                                                        const rating = parseInt(review.rating, 10) || 0; // Default to 0 if rating is invalid

                                                        return (
                                                            <div className="review_item" key={index}>
                                                                <div className="author_info flex align-middle">
                                                                    <div className="author_image">
                                                                        <img
                                                                            src={review.authorImage}
                                                                            alt="author image"
                                                                        />
                                                                    </div>
                                                                    <div className="author_about flex align-middle">
                                                                        <div className="author_name font-semibold">
                                                                            {review.authorName}
                                                                        </div>
                                                                        <div className="author_date text-sm">
                                                                            {review.date}
                                                                        </div>
                                                                        <div className="author_rating flex align-middle">
                                                                            <div className="author_stars flex align-middle mr-1">
                                                                                {[...Array(rating)].map((_, i) => (
                                                                                    <span key={i} className="colored_star">
                                                                                        <FaStar />
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <div className="author_badge">
                                                                                <MdVerified />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="review_content mt-2">
                                                                    <p className="text-sm">{review.text}</p>
                                                                </div>
                                                                <div className="review_action flex align-middle mt-2">
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
                                                                </div>
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
