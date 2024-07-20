const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useContext , useEffect, useState } from 'react';
import { CurrencyContext } from '../CurrencyContext';

import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import axios from "axios";

const ProductTimer = () => {

    const { currency, exchangeRates } = useContext(CurrencyContext);
    const convertedPrice = convertPrice('200', currency, exchangeRates);
    const convertedActualPrice = convertPrice('400', currency, exchangeRates);

    const [products1, setProducts1] = useState([]);
    useEffect(() => {
        axios.get('/api/feature').then(response => {
            setProducts1(response.data);
        });
    }, []);

    const [products2, setProducts2] = useState([]);
    useEffect(() => {
        axios.get('/api/limited').then(response => {
            setProducts2(response.data);
        });
    }, []);

    return (
        <div>
            <div className="product_timer py-5">
                <div className="container">
                    <div className="row">

                        {products1.map((product) =>(
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="product_timer_header flex justify-between align-middle border-b-2">
                                <h2 data-aos="fade-up" data-aos-duration="400" className='mb-2 font-semibold text-2xl text-center light_black_font'>Featured Items</h2>

                                
                            </div>
                            <div className="product_timer_body mt-4">
                                <div className="scrollable_card">
                                    <figure>
                                        <img src={product.image} alt={product.name} height={100} width={100} />
                                    </figure>
                                    <div className="product_timer_content">
                                        <h3 data-aos="fade-up" data-aos-duration="400">{product.title}</h3>
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
                                            {currency === 'INR' ? '₹' : '$'} 
                                            {convertPrice(product.price, currency, exchangeRates).toFixed(2)}
                                             &nbsp;
                                            <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                                        </div>

                                        <p data-aos="fade-up" data-aos-duration="430" className='desc text-sm'>{product.description}.</p>
                                        {/* <div data-aos="fade-up" data-aos-duration="440" className="booking"> <span className='font-semibold light_black_font'>Total Booking: </span> 25 </div> */}
                                        <div data-aos="fade-up" data-aos-duration="450" className="btns py-2">
                                            {/* <a href="">REMIND ME</a> */}
                                            <a href="/product">BUY NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        ))}

                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTimer
