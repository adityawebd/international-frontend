const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';

import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const ProductTimer = () => {

    const { currency, exchangeRates } = useContext(CurrencyContext);
    const convertedPrice = convertPrice('200', currency, exchangeRates);
    const convertedActualPrice = convertPrice('400', currency, exchangeRates);

    return (
        <div>
            <div className="product_timer py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="product_timer_header flex justify-between align-middle border-b-2">
                                <h2 data-aos="fade-up" data-aos-duration="400" className='mb-2 font-semibold text-2xl text-center light_black_font'>Featured Items</h2>

                                {/* <div className="l_r_btns flex justify-between align-middle">
                                    <button className='text-2xl light_black_font'> <MdArrowBackIos /> </button>
                                    <button className='text-2xl light_black_font'> <MdArrowForwardIos /> </button>
                                </div> */}
                            </div>
                            <div className="product_timer_body mt-4">
                                <div className="scrollable_card">
                                    <figure>
                                        <img src="/assets/image/resized/gift2.webp" alt="" />
                                    </figure>
                                    <div className="product_timer_content">
                                        <h3 data-aos="fade-up" data-aos-duration="400">Golden Plated Laxmi Ganesh Idol</h3>
                                        <div data-aos="fade-up" data-aos-duration="410" className="rating_div flex align-middle mt-2">
                                            <div className="stars flex align-middle mr-3">
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='uncolored_star'> <FaStar /> </span>
                                            </div>
                                            <div className="review"> 4 Reviews</div>
                                        </div>
                                        <div data-aos="fade-up" data-aos-duration="420" className="price pt-2">
                                            {/* <span>₹549.00</span> &nbsp; ₹480.00 */}
                                            {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp;
                                            <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                                        </div>

                                        <p data-aos="fade-up" data-aos-duration="430" className='desc text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, corrupti.</p>
                                        <div data-aos="fade-up" data-aos-duration="440" className="booking"> <span className='font-semibold light_black_font'>Total Booking: </span> 25 </div>
                                        <div data-aos="fade-up" data-aos-duration="450" className="btns py-2">
                                            {/* <a href="">REMIND ME</a> */}
                                            <a href="/product">BUY NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="product_timer_header flex justify-between align-middle border-b-2">
                                <h2 data-aos="fade-up" data-aos-duration="400" className='mb-2 font-semibold text-2xl text-center light_black_font'>Featured Items</h2>

                                {/* <div className="l_r_btns flex justify-between align-middle">
                                    <button className='text-2xl light_black_font'> <MdArrowBackIos /> </button>
                                    <button className='text-2xl light_black_font'> <MdArrowForwardIos /> </button>
                                </div> */}
                            </div>
                            <div className="product_timer_body mt-4">
                                <div className="scrollable_card">
                                    <figure>
                                        <img src="/assets/image/resized/gift2.webp" alt="" />
                                    </figure>
                                    <div className="product_timer_content">
                                        <h3 data-aos="fade-up" data-aos-duration="400">Golden Plated Laxmi Ganesh Idol</h3>
                                        <div data-aos="fade-up" data-aos-duration="410" className="rating_div flex align-middle mt-2">
                                            <div className="stars flex align-middle mr-3">
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='colored_star'> <FaStar /> </span>
                                                <span className='uncolored_star'> <FaStar /> </span>
                                            </div>
                                            <div className="review"> 4 Reviews</div>
                                        </div>
                                        <div data-aos="fade-up" data-aos-duration="420" className="price pt-2">
                                            {/* <span>₹549.00</span> &nbsp; ₹480.00 */}
                                            {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp;
                                            <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                                        </div>

                                        <p data-aos="fade-up" data-aos-duration="430" className='desc text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, corrupti.</p>
                                        <div data-aos="fade-up" data-aos-duration="440" className="booking"> <span className='font-semibold light_black_font'>Total Booking: </span> 25 </div>
                                        <div data-aos="fade-up" data-aos-duration="450" className="btns py-2">
                                            {/* <a href="">REMIND ME</a> */}
                                            <a href="/product">BUY NOW</a>
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
