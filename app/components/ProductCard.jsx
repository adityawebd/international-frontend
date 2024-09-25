const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';

const ProductCard = ({ product }) => {
    //console.log("product card product", product);
    const { currency, exchangeRates } = useContext(CurrencyContext);
    const convertedPrice = convertPrice(product.discountedPrice, currency, exchangeRates);
    const convertedActualPrice = convertPrice(product.price, currency, exchangeRates);

    return (
        <div className="w-[300px] rounded-md border mb-2 mr-2 reposnive_product_card">
            <img
                src={product.images[0]}
                alt="product-image"
                className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="py-4 px-2 reposnive_product_card_content">
                <h1 className="inline-flex items-center text-lg font-semibold product_title">
                    {product.title} &nbsp;
                    {/* <ArrowUpRight className="h-4 w-4" /> */}
                </h1>
                <p className="mt-1 text-sm text-gray-600 product_desc">
                    {product.desc}
                </p>
                <div className="mt-2 mb-3 price">
                    {/* {product.price} */}
                    {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp;
                    <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                </div>  
                <a
                    // type="button"
                    href={product.link}
                    className="mt-4 w-full rounded text-center bg_green px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Buy Now
                </a>
            </div>
        </div>
    )
}

export default ProductCard;
