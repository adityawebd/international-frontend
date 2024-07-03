'use client'
import React, { useState, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Variations from '../components/Variations';
import ExploreFeeds from '../components/ExploreFeeds';
import { FaStar, FaCheck, FaRegHeart } from 'react-icons/fa6';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const Page = () => {
    const [activeTab, setActiveTab] = useState('general_info');
    const [isCounting, setIsCounting] = useState(false);
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);

    // useCountUp for the circular progress
    const { value: value1, reset: resetValue1 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[0] });
    const { value: value2, reset: resetValue2 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[1] });
    const { value: value3, reset: resetValue3 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[2] });
    const { value: value4, reset: resetValue4 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[3] });
    const { value: value5, reset: resetValue5 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[4] });
    // to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // to handle circular progress
    useEffect(() => {
        if (activeTab === 'reviews') {
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


    return (
        <div>
            <Navbar />

            <div className="product mt-3">
                <div className="container">
                    {/* product image and about section */}
                    <div className="row">
                        <div className="col-md-6 product_img_wrapper border-2">
                            {/* Image section placeholder */}
                        </div>
                        <div className="col-md-6 product_about_wrapper">
                            <h3 className='text-xl font-semibold'>Shiva Gold Statue</h3>
                            <p className='green_font font-semibold'> ₹689 </p>

                            <div className="rating_div flex align-middle mt-2">
                                <div className="stars flex align-middle mr-3">
                                    <span className='colored_star'><FaStar /></span>
                                    <span className='colored_star'><FaStar /></span>
                                    <span className='colored_star'><FaStar /></span>
                                    <span className='colored_star'><FaStar /></span>
                                    <span className='uncolored_star'><FaStar /></span>
                                </div>
                                <div className="review">4 Reviews</div>
                            </div>

                            <p className="text-base light_black_font">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officiis dolore officia ut ullam quibusdam consequatur incidunt explicabo amet dignissimos eligendi aperiam atque quae culpa nesciunt, alias commodi obcaecati odit temporibus mollitia vero architecto nam aut sed. Sed, veritatis placeat.</p>

                            <div className="flex flex-wrap mt-3 mb-4">
                                <div className="product_points text-sm light_black_font mb-2">
                                    <span><FaCheck /></span> &nbsp; Moisturize
                                </div>
                                <div className="product_points text-sm light_black_font mb-2">
                                    <span><FaCheck /></span> &nbsp; Vegan
                                </div>
                                <div className="product_points text-sm light_black_font mb-2">
                                    <span><FaCheck /></span> &nbsp; Organic
                                </div>
                                <div className="product_points text-sm light_black_font mb-2">
                                    <span><FaCheck /></span> &nbsp; Immune System
                                </div>
                            </div>
                            <div className="cart_btns">
                                <a href="#"><span><HiOutlineShoppingBag /></span> &nbsp; add to cart </a>
                                <a href="#"><span><FaRegHeart /></span> &nbsp; add to wishlist </a>
                            </div>

                            <h2 className='text-xl font-semibold light_black_font mt-4'>Variations</h2>
                            <Variations />
                        </div>
                    </div>

                    {/* product details section */}
                    <div className="row product_details mt-4">
                        <div className="mb-4 mt-2 flex justify-center align-middle">
                            <ul className="flex tabs_ul flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'general_info' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('general_info')}
                                    >
                                        General Information
                                    </button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'additional_info' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('additional_info')}
                                    >
                                        Additional Information
                                    </button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'reviews' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('reviews')}
                                    >
                                        Reviews
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {activeTab === 'general_info' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500">This is some placeholder content for the <strong className="font-medium text-gray-800">general_info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                                </div>
                            )}
                            {activeTab === 'additional_info' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500">This is some placeholder content for the <strong className="font-medium text-gray-800">additional_info tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm">
                                            <h3 className='text-xl font-semibold light_black_font'>Customer Reviews</h3>
                                            <div className="rating_div flex align-middle mt-2">
                                                <div className="stars flex align-middle mr-3">
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='uncolored_star'><FaStar /></span>
                                                </div>
                                                <div className="review">4.9 (Total 209 Reviews)</div>
                                            </div>

                                            <div className="circular_progress_wrapper flex flex-wrap mt-3">
                                                {[value1, value2, value3, value4, value5].map((value, index) => (
                                                    <Stack key={`progress-${index}`} className="mr-5 mb-4" direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
                                                        <Stack spacing={2}>
                                                            <CircularProgress size="lg" determinate value={value}>
                                                                <Typography>{Math.round(value)}%</Typography>
                                                            </CircularProgress>
                                                        </Stack>
                                                    </Stack>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm">
                                            <h3 className='text-xl font-semibold light_black_font'>Top Reviews</h3>
                                            <div className="top_reviews_wrapper">
                                                <div className="flex mt-4">
                                                    <img src="/assets/images/testimonial/1.jpg" alt="" />
                                                    <div>
                                                        <h5 className='text-base font-semibold'>Mita</h5>
                                                        <small className='text-sm text-gray-500'>3 weeks ago</small>
                                                        <div className="verified_pruchase flex align-middle text-xs">
                                                            <span> <MdVerified /> </span> &nbsp; <p>Verified Purchase</p>
                                                        </div>
                                                        <div className="stars flex align-middle mr-3 mt-3 mb-2">
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='uncolored_star'><FaStar /></span>
                                                        </div>
                                                        <p className='text-lg mb-2'>The smell is gorgeous!</p>
                                                        <div className="flex top_reviews_icons">
                                                            <span> <BiLike /> </span>
                                                            <span> <BiDislike /> </span>
                                                            <span> <IoMdInformationCircleOutline /> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <img src="/assets/images/testimonial/1.jpg" alt="" />
                                                    <div>
                                                        <h5 className='text-base font-semibold'>Mita</h5>
                                                        <small className='text-sm text-gray-500'>3 weeks ago</small>
                                                        <div className="verified_pruchase flex align-middle text-xs">
                                                            <span> <MdVerified /> </span> &nbsp; <p>Verified Purchase</p>
                                                        </div>
                                                        <div className="stars flex align-middle mr-3 mt-3 mb-2">
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='uncolored_star'><FaStar /></span>
                                                        </div>
                                                        <p className='text-lg mb-2'>The smell is gorgeous!</p>
                                                        <div className="flex top_reviews_icons">
                                                            <span> <BiLike /> </span>
                                                            <span> <BiDislike /> </span>
                                                            <span> <IoMdInformationCircleOutline /> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="suggestions">
                <ExploreFeeds />
            </div>

            <Footer />
        </div>
    );
}

export default Page;
