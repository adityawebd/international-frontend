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
  const [totalPrice, setTotalPrice] = useState(product.price * product.quantity);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    setInputValue(newValue);
  };

  useEffect(() => {
    const newTotalPrice = product.price * inputValue;
    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice_" + product._id, JSON.stringify(newTotalPrice));
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
    total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img loading='lazy'
          src={product?.images[0]}
          alt={product.title}
          width={100}
          height={100}
          className="h-10 w-10 rounded-full mr-4"
        />
      </td>
      <td className="px-6 py-4 font-semibold ">
        {product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          <button onClick={(e) => addToCart1(e, product)}>-</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>{product.quantity}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={(e) => addToCart2(e, product)}>+</button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold">
        ₹<span>{product.quantity * product.discountedPrice}</span>
      </td>
      <td className="px-6 py-4">
        <button
          title="Remove Item"
          className="text-red-500 hover:text-red-600 ml-4"
          onClick={() => removeFromCart(product)}
        >
          <FaTrashAlt size={18} />
        </button>
      </td>
    </tr>
  );
}
