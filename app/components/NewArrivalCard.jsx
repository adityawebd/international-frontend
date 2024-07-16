const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';
import { IoCart } from "react-icons/io5";


const NewArrivalCard = (props) => {
    const { currency, exchangeRates } = useContext(CurrencyContext);
    // console.log("currency: ",currency)
    // console.log("exchangeRates are",exchangeRates)
    // Convert price using real-time exchange rates
    const convertedPrice = convertPrice(props.discounted_price, currency, exchangeRates);
    const convertedActualPrice = convertPrice(props.actual_price, currency, exchangeRates);
    //   console.log("convertedPrice",convertedPrice)

    return (
        <div className="products_card">
            <a href={props.card_link}>
                <img className='rounded-2xl' src={props.img_src} alt={props.img_title} />
                <div className="card_content">
                    <div className="sku_id"> {props.sku_id} </div>
                    <div className="product_card_items">
                        <div className="product_card_text">
                            <div className="title"> {props.title}</div>
                            <div className="price">
                                {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp;
                                <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="cart_icon"> <IoCart /> </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NewArrivalCard
