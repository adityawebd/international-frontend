import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { useCartStore } from "../../stores/useCartStore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useFromStore from "../../hooks/useFromStore";

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

export default function CartItem({ product }) {
  const updateFromCart = useCartStore((state) => state.updateQuantity);
  const removeFromCart1 = useCartStore((state) => state.removeQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [inputValue, setInputValue] = useState(product.quantity);
  const [totalPrice, setTotalPrice] = useState(
    product.price * product.quantity
  );

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    setInputValue(newValue);
  };

  useEffect(() => {
    const newTotalPrice = product.price * inputValue;
    setTotalPrice(newTotalPrice);
    localStorage.setItem(
      "totalPrice_" + product._id,
      JSON.stringify(newTotalPrice)
    );
  }, [inputValue]);

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior
    removeFromCart1(item);
  };

  const addToCart2 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior
    updateFromCart(item);
  };

  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  }

  return (
    <>
      <div>
        <div className="lg:block hidden">
          <div className="flex justify-between gap-2 items-start border-b pb-3 mb-3">
            <div className="flex gap-4">
              <img
                src={product?.images[0]}
                alt={product.title}
                loading="lazy"
                className="2xl:w-56 xl:w-56 lg:w-48 rounded-lg"
              />
              <div>
                <div className="text-lg font-medium ">{product.title}</div>
                <div className="text-green-500 text-sm">
                  (
                  {product.stockQuantity > 0
                    ? "In stock"
                    : "Currently Unavailable"}
                  )
                </div>
                <div className="flex items-start gap-2 justify-start mt-3">
                  <div className="flex items-center justify-center border border-gray-300 rounded-full w-24 ">
                    <button
                      onClick={(e) => addToCart1(e, product)}
                      className=" rounded-l-full px-2 border-r border-gray-300"
                    >
                      -
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{product.quantity}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      onClick={(e) => addToCart2(e, product)}
                      className=" rounded-r-full px-2 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    title="Remove Item"
                    className="text-red-500 hover:text-red-600 mt-1 border-l-2 pl-2"
                    onClick={() => removeFromCart(product)}
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-center justify-end 2xl:flex-row xl:flex-row lg:flex-col">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {`- ${Math.round(
                    ((product.price - product.discountedPrice) /
                      product.price) *
                      100
                  )}%`}
                </div>
                <div className="text-black font-bold text-lg">
                  ₹<span>{product.quantity * product.discountedPrice}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-right mt-2">
                M.R.P.: <span className="line-through">{product.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden block">
          <div className="border-b pb-3 mb-3">
            <div className="flex gap-2 max-sm:flex-col">
              <img
                src={product?.images[0]}
                alt={product.title}
                loading="lazy"
                className="w-32 rounded-lg max-sm:w-32"
              />
              <div>
                <div className="text-lg font-medium ">{product.title}</div>
                <div className="text-green-500 text-sm">
                  (
                  {product.stockQuantity > 0
                    ? "In stock"
                    : "Currently Unavailable"}
                  )
                </div>
                <div className="mt-3">
                  <div className="flex gap-2 items-center justify-start 2xl:flex-row xl:flex-row lg:flex-col">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {`- ${Math.round(
                        ((product.price - product.discountedPrice) /
                          product.price) *
                          100
                      )}%`}
                    </div>
                    <div className="text-black font-bold text-lg">
                      ₹<span>{product.quantity * product.discountedPrice}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-left mt-2">
                    M.R.P.:{" "}
                    <span className="line-through">{product.price}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-start mt-3">
                  <div className="flex items-center justify-center border border-gray-300 rounded-full w-24 ">
                    <button
                      onClick={(e) => addToCart1(e, product)}
                      className=" rounded-l-full px-2 border-r border-gray-300"
                    >
                      -
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{product.quantity}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      onClick={(e) => addToCart2(e, product)}
                      className=" rounded-r-full px-2 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <button
                    title="Remove Item"
                    className="text-red-500 hover:text-red-600 mt-1 border-l-2 pl-2"
                    onClick={() => removeFromCart(product)}
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img
            loading="lazy"
            src={product?.images[0]}
            alt={product.title}
            width={100}
            height={100}
            className="h-10 w-10 rounded-full mr-4"
          />
        </td>
        <td className="px-6 py-4 font-semibold ">{product.title}</td>
        <td className="px-6 py-4"></td>
        <td className="px-6 py-4 font-semibold">
          ₹<span>{product.quantity * product.discountedPrice}</span>
        </td>
        <td className="px-6 py-4"></td>
      </tr> */}
    </>
  );
}
