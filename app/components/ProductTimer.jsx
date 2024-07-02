import React, { useEffect, useState } from 'react';

import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const ProductTimer = () => {

    return (
        <div>
            <div className="product_timer py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="product_timer_header flex justify-between align-middle border-b-2">
                                <h2 className='mb-2 font-semibold text-2xl text-center light_black_font'>Featured Items</h2>

                                <div className="l_r_btns flex justify-between align-middle">
                                    <button className='text-2xl light_black_font'> <MdArrowBackIos /> </button>
                                    <button className='text-2xl light_black_font'> <MdArrowForwardIos /> </button>
                                </div>
                            </div>
                            <div className="product_timer_body mt-4">
                                <div className="scrollable_card">
                                    <figure>
                                        <img src="/assets/image/resized/gift2.webp" alt="" />
                                    </figure>
                                    <div className="product_timer_content">
                                        <h3>Golden Plated Laxmi Ganesh Idol</h3>
                                        <div className="rating_div flex align-middle mt-2">
                                            <div className="stars flex align-middle mr-3">
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='uncolored_star'> <FaStar /> </span>
                                            </div>
                                            <div className="review"> 4 Reviews</div>
                                        </div>
                                        <div className="price pt-2">
                                            <span>₹549.00</span> &nbsp; ₹480.00
                                        </div>

                                        <p className='desc text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, corrupti.</p>
                                        <div className="booking"> <span className='font-semibold light_black_font'>Total Booking: </span> 25 </div>
                                        <div className="btns py-2">
                                            <a href="">REMIND ME</a>
                                            <a href="">BOOK NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="product_timer_header flex justify-between align-middle border-b-2">
                                <h2 className='mb-2 font-semibold text-2xl text-center light_black_font'>Featured Items</h2>

                                <div className="l_r_btns flex justify-between align-middle">
                                    <button className='text-2xl light_black_font'> <MdArrowBackIos /> </button>
                                    <button className='text-2xl light_black_font'> <MdArrowForwardIos /> </button>
                                </div>
                            </div>
                            <div className="product_timer_body mt-4">
                                <div className="scrollable_card">
                                    <figure>
                                        <img src="/assets/image/resized/gift2.webp" alt="" />
                                    </figure>
                                    <div className="product_timer_content">
                                        <h3>Golden Plated Laxmi Ganesh Idol</h3>
                                        <div className="rating_div flex align-middle mt-2">
                                            <div className="stars flex align-middle mr-3">
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='uncolored_star'> <FaStar /> </span>
                                            </div>
                                            <div className="review"> 4 Reviews</div>
                                        </div>
                                        <div className="price pt-2">
                                            <span>₹549.00</span> &nbsp; ₹480.00
                                        </div>

                                        <p className='desc text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, corrupti.</p>
                                        <div className="booking"> <span className='font-semibold light_black_font'>Total Booking: </span> 25 </div>
                                        <div className="btns py-2">
                                            <a href="">REMIND ME</a>
                                            <a href="">BOOK NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTimer
