'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CiUser, CiShoppingBasket } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CurrencyContext } from '../CurrencyContext'; // Importing the context
import ProductTopbar from '../components/ProductTopbar'
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from '../../stores/useCartStore';
import useFromStore from '../../hooks/useFromStore';
import axios from 'axios';

const Navbar = () => {
  const { currency, setCurrency } = useContext(CurrencyContext); // Use context
  const [isVisible, setIsVisible] = useState(false);
  const searchBarRef = useRef(null); // Ref for the search bar
  const currencyDropdownRef = useRef(null); // Ref for the currency dropdown
  const userDropdownRef = useRef(null); // Ref for the user dropdown

  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  async function logout() {

    await signOut();
    window.location.href = '/';
  }

  const cart = useFromStore(useCartStore, (state) => state.cart);
  // Toggle search bar visibility
  const toggleSearchBar = (event) => {
    event.stopPropagation(); // Prevent click propagation
    setIsVisible((prevVisible) => !prevVisible);
  };

  // Hide search bar when clicking outside of it
  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      event.target.tagName !== 'INPUT' // Ensure the search input is not considered outside
    ) {
      setIsVisible(false);
    }

    if (
      currencyDropdownRef.current &&
      !currencyDropdownRef.current.contains(event.target)
    ) {
      setCurrencyDropdownVisible(false);
    }

    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setUserDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleCurrencyDropdown = (event) => {   // for currency dropdown
    event.stopPropagation();
    setCurrencyDropdownVisible((prev) => !prev);
  };

  const changeCurrency = (currency) => {         // for curreny change
    setCurrency(currency);
    setCurrencyDropdownVisible(false);
  };

  const toggleUserDropdown = (event) => {     // for user dropdown
    event.stopPropagation();
    setUserDropdownVisible((prev) => !prev);
  };


  const { data: session } = useSession();


  // serching the product

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim() === '') {
      setResults([]);
      return;
    }



    const res = await axios.get(`/api/search?query=${e.target.value}`);
    // const data = await res.json();
    console.log('result as responce', res)
    setResults(res.data);
    console.log("result ", results)
    console.log("result length", results.length)
  };

  return (
    <div>
      




      <nav>
        {/* <div className="navbar_header">
          <div className="icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
          <div className="currency" onClick={toggleCurrencyDropdown} ref={currencyDropdownRef}>
            CURRENCY: {currency}
            {currencyDropdownVisible && (
              <div className="currency_dropdown">
                <div onClick={() => changeCurrency('INR')}>₹ INR</div>
                <div onClick={() => changeCurrency('USD')}>$ USD</div>
              </div>
            )}
          </div>
        </div> */}

        <div className="navbar">
          <div className="navbar_brand">
            <a href="/">
              <img loading='lazy'
                src="/assets/international-gift-logo-inline.png"
                alt="Logo"
              />
            </a>
          </div>
          <div className="navbar_body">
            <div className="search_bar search_bar_hidden">
              <input
                type="text"
                placeholder="Search your products..."
                onClick={toggleSearchBar}
                value={query}
                onChange={handleSearch}
              />
              <span className="search-icon">
                <IoSearch onClick={toggleSearchBar} />
              </span>

              <div
                ref={searchBarRef}
                className={`search_bar_body ${
                  isVisible ? "show_searchDiv_with_animation" : " "
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`${
                    results.length === 0
                      ? ""
                      // : "search_card_wrapper overflow-x-auto h-[300px] lg:h-[300px] md:h-[300px] sm:h-[300px]"
                      : "grid lg:grid-cols-5 md:grid-cols-4 grid-cols-4 gap-2 max-sm:grid-cols-3 h-[500px] lg:h-[500px] md:h-[300px] sm:h-[300px] overflow-y-auto"
                  }`}
                >
                  {results?.length > 0 ? (
                    results.map((result) => (
                      <a href={`/product/${result._id}`} className="border rounded-lg p-2" key={result._id}>
                        <img loading='lazy' src={result.images[0]} alt={result.title} className='rounded-lg border' />
                        <div className=" productTitle mt-2">{result.title}</div>
                      </a>
                    ))
                  ) : (
                    <div>No results found.</div> // Optional: Message when there are no results
                  )}

                </div>
              </div>
            </div>

            <div className="navbar_icons">
              <div
                className="cart_icon user_dropdown_btn w-full flex flex-row-reverse"
                onClick={toggleUserDropdown}
                ref={userDropdownRef}
              >
                <span>
                  <LuUser className="max-sm:w-[20px]" />
                </span>
                {session ? (
                  <div className="flex items-end">
                    <div className="username_after_login">
                      <a className="text-sm no-underline" href="/profile">
                        {" "}
                        Welcome {session.user.fname}{" "}
                      </a>
                    </div>
                    {userDropdownVisible && (
                      <div className="user_dropdown">
                        <div>
                          <a href="/profile">Your Profile</a>
                        </div>
                        <div>
                          <a href="/user-history">Your Orders</a>
                        </div>
                        <div>
                          <a onClick={logout}>Logout</a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {userDropdownVisible && (
                      <div className="user_dropdown">
                        <div>
                          <a href="/login">LOGIN</a>
                        </div>
                        <div>
                          <a href="/register">REGISTER</a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="cart_icon cart_length_btn">
                <a href="/cart">
                  <span>
                    <MdOutlineShoppingCart className="max-sm:w-[20px] text-black" />
                    <span className="text-xs cart_length">{cart?.length}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden responsive_navbar">
          <div className="navbar_body">
            <div className="search_bar ">
              <input
                type="text"
                placeholder="Search your products..."
                onClick={toggleSearchBar}
                value={query}
                onChange={handleSearch}
              />
              <span className="search-icon">
                <IoSearch onClick={toggleSearchBar} />
              </span>

              <div
                ref={searchBarRef}
                className={`search_bar_body ${
                  isVisible ? "show_searchDiv_with_animation" : " "
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* {results.length > 0 ? (
                  results.map((result, index) => (
                    <div
                      className="search_card_wrapper overflow-y-auto"
                      key={index}
                    >
                      <div className="search_card">
                        <img loading='lazy' src={result.images[0]} alt={result.title} />
                        <div className="desc">{result.title}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-2">No products available</div>
                )} */}
                <div
                  className={`${
                    results.length === 0
                      ? "search_card_wrapper "
                      : "grid lg:grid-cols-5 md:grid-cols-4 max-sm:grid-cols-3  grid-cols-4 gap-2 h-[500px] lg:h-[500px] md:h-[300px] sm:h-[300px] overflow-y-auto"
                  }`}
                >
                  {results?.length > 0 ? (
                    results.map((result) => (
                      <a href={`/product/${result._id}`} className="border rounded-lg p-2" key={result._id}>
                      <img loading='lazy' src={result.images[0]} alt={result.title} className='rounded-lg border' />
                      <div className=" productTitle mt-2 text-sm">{result.title}</div>
                      </a>
                    ))
                  ) : (
                    <div>No results found.</div> // Optional: Message when there are no results
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <ProductTopbar /> */}
      </nav>
    </div>
  );
};
 
export default Navbar;
