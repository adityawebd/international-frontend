const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    // console.log("type od price",typeof(price))
    // console.log("rate",rate)
    // console.log("price is",price)

    // if (typeof price !== 'number' || isNaN(price)) {
    //   console.error(`Invalid price: ${price}`);
    //   return 0; // Return a fallback value
    // }

    // if (!rate) {
    //   console.error(`Invalid currency: ${currency}`);
    //   return price; // Return the original price if the currency is invalid
    // }

    // console.log("returnibg value is",price * rate)
    return price * rate;
};

import React, { useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';

const BestSellCard = ({ price, ...props }) => {
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
               <figure>
                 <img className='rounded-2xl' src={props.img_src} alt={props.img_title} />
               </figure>
                <div className="card_content">
                    {/* <div className="sku_id"> {props.sku_id} </div> */}
                    <div className="title"> {props.title}</div>
                    <div className="price">
                        {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp; 
                        <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span> 
                    </div>
                    {/* <div className="price">₹{props.discounted_price} &nbsp; <span>₹{props.actual_price}</span></div> */}
                    {/* <div className="price">{currency === 'INR' ? '₹' : '$'} {convertPrice(props.discounted_price, currency).toFixed(2)}</div> */}
                </div>
            </a>
        </div>
    )
}

export default BestSellCard
