import { MdOutlineShoppingCart } from "react-icons/md";

import React, { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const ProductCard = ({ product }) => {
  //console.log("product card product", product);
  const { currency, exchangeRates } = useContext(CurrencyContext);
  const convertedPrice = convertPrice(
    product.discountedPrice,
    currency,
    exchangeRates
  );
  const convertedActualPrice = convertPrice(
    product.price,
    currency,
    exchangeRates
  );

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior

    console.log("quantity", quantity);
    // Run addToCart the number of times as quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }

    notify(); // Trigger a notification
  };

  return (
    <div
      className="w-[280px] rounded-md border mb-2 mr-2 reposnive_product_card"
    >
      <a
        href={`/product/${product._id}`}
      >
        <img
          loading="lazy"
          src={product.images[0]}
          alt="product-image"
          className="h-[300px] w-full rounded-t-md object-fit"
        />
      </a>
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
          {currency === "INR" ? "₹" : "$"} {convertedPrice.toFixed(2)} &nbsp;
          <span>
            {currency === "INR" ? "₹" : "$"} {convertedActualPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-end">
            <a
              // type="button"
              href={`/product/${product._id}`}
              className="w-full rounded text-center bg_green px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Buy Now
            </a>
          </div>
          <div className="pr-2 flex items-end">
            <button
              onClick={(e) => addToCart1(e, productData)}
              className="bg_green rounded-full p-2 border text-white"
            >
              <MdOutlineShoppingCart size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
