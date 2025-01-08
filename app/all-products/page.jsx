"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  useContext,
} from "react";
import Navbar2 from '../components/Navbar2'
import Navbar3 from '../components/Navbar3'
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartStore } from "../../stores/useCartStore";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Filter } from "lucide-react";
import axios from "axios";
import dynamic from "next/dynamic";

// Lazy loading NewArrival and Footer components
const NewArrival = dynamic(() => import("../components/NewArrival"), {
  suspense: true,
});
import { CurrencyContext } from "../CurrencyContext";

const ITEMS_PER_PAGE = 20; // Set items per scroll/page
const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const page = () => {
  const [filters, setFilters] = useState({
    category: "All",
    subCategory: null,
    priceRange: null,
    colors: [],
  });
  const addToCart = useCartStore((state) => state.addToCart);

  const notify = () =>
    toast.success("Product added to cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Fetch products from the API using pagination
  const fetchProducts = async () => {
    const { data } = await axios.get(`/api/product`);
    return data;
  };

  useEffect(() => {
    // Initial fetch
    // fetchProducts().then(newProducts => {
    //     setProducts(newProducts);
    //     // setFilteredProducts(newProducts);
    // });
  }, []);

  const { currency, exchangeRates } = useContext(CurrencyContext);
  const convertedPrice = convertPrice(
    products.discountedPrice,
    currency,
    exchangeRates
  );
  const convertedActualPrice = convertPrice(
    products.price,
    currency,
    exchangeRates
  );

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior

    // console.log("quantity", quantity);
    // // Run addToCart the number of times as quantity
    // for (let i = 0; i < quantity; i++) {
    addToCart(item);
    // }

    notify(); // Trigger a notification
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("before reaponce")
        const response = await axios.get(`/api/product`);

        //console.log("the responce is ", response);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar2 />
      <Navbar3 />
      <Breadcrumbs page_title="All Products" />
      <ToastContainer />
      <div className="py-5">
        <div className="container mx-auto">
          <div className="lg:block md:block max-sm:hidden">
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-5 md:grid-cols-3">
              {products?.map((product) => (
                <div key={product._id} className="border rounded-xl p-2">
                  <a
                    href={`/product/${product._id}`}
                    className="rounded-xl group overflow-hidden"
                  >
                    <img
                      loading="lazy"
                      className="rounded-xl scale-100 hover:scale-105 transition duration-500"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </a>
                  <div className="mt-2">
                    <div className="productTitle text-lg font-semibold text-black">
                      <a
                        href={`/product/${product._id}`}
                        className="productTitle"
                      >
                        {product.title}
                      </a>
                    </div>
                    <div className="price mt-2 green_font text-md">
                      ₹
                      {convertPrice(
                        product.discountedPrice,
                        currency,
                        exchangeRates
                      ).toFixed(2)}{" "}
                      &nbsp;
                      <span className="text-sm line-through text-gray-300">
                        ₹
                        {convertPrice(
                          product.price,
                          currency,
                          exchangeRates
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <a
                      href={`/product/${product._id}`}
                      className="text-sm bg_green text-white rounded py-2 px-4"
                    >
                      Buy Now
                    </a>
                    <button
                      onClick={(e) => addToCart1(e, product)}
                      className="bg_green rounded-full p-2 border text-white"
                    >
                      <MdOutlineShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:hidden md:hidden">
            <div className="grid gap-2 grid-cols-1">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-xl p-2 flex gap-2"
                >
                  <div className="w-2/5">
                    <a
                      href={`/product/${product._id}`}
                      className="rounded-xl group overflow-hidden"
                    >
                      <img
                        loading="lazy"
                        className="rounded-xl scale-100 hover:scale-105 transition duration-500"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </a>
                  </div>
                  <div className="w-3/5">
                    <div className="">
                      <div className="productTitleTwo font-semibold text-black">
                        <a href={`/product/${product._id}`}>{product.title}</a>
                      </div>
                      <div className="price mt-2 green_font text-sm">
                        ₹
                        {convertPrice(
                          product.discountedPrice,
                          currency,
                          exchangeRates
                        ).toFixed(2)}{" "}
                        &nbsp;
                        <span className="text-xs line-through text-gray-300">
                          ₹
                          {convertPrice(
                            product.price,
                            currency,
                            exchangeRates
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <a
                        href={`/product/${product._id}`}
                        className="text-sm bg_green text-white rounded py-1  px-2"
                      >
                        Buy Now
                      </a>
                      <button
                        onClick={(e) => addToCart1(e, product)}
                        className="bg_green rounded-full p-2 border text-white"
                      >
                        <MdOutlineShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="product-page">
            <div className="all_products_container mx-auto">
              <div className="product-list  grid lg:grid-cols-6 grid-cols-4 md:grid-cols-3 max-sm:grid-cols-1">
                {products?.map((product) => (
                  <div key={product._id} className="products_card">
                    <a href={`/product/${product._id}`}>
                      <figure>
                        <img
                          loading="lazy"
                          className="rounded-2xl"
                          src={product.images[0]}
                          alt={product.title}
                        />
                      </figure>
                      <div className="card_content">
                        <div className="title">{product.title}</div>

                        <div className="price">
                          ₹
                          {convertPrice(
                            product.discountedPrice,
                            currency,
                            exchangeRates
                          ).toFixed(2)}{" "}
                          &nbsp;
                          <span>
                            {currency === "INR" ? "₹" : "$"}{" "}
                            {convertPrice(
                              product.price,
                              currency,
                              exchangeRates
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-end">
                            <a
                              href={`/product/${product._id}`}
                              className=" w-full rounded text-center bg_green px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Suspense for lazy loading components */}
      <Suspense fallback={<div>Loading New Arrivals...</div>}>
        <NewArrival />
      </Suspense>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

// Memoizing ProductCard to avoid unnecessary re-renders
const MemoizedProductCard = React.memo(ProductCard);

export default page;
