'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CiUser, CiShoppingBasket } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CurrencyContext } from '../CurrencyContext'; // Importing the context

const Navbar = () => {
  const { currency, setCurrency } = useContext(CurrencyContext); // Use context
  const [isVisible, setIsVisible] = useState(false);
  const searchBarRef = useRef(null); // Ref for the search bar
  const currencyDropdownRef = useRef(null); // Ref for the currency dropdown
  const userDropdownRef = useRef(null); // Ref for the user dropdown

  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

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

  return (
    <div>
      <nav>
        <div className="navbar_header">
          <div className="icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
          <div className="offer">
            Free Shipping this week order above - ₹75
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
        </div>
        <div className='navbar'>
          <div className="navbar_brand">
            <a href="/">
              <img src="/assets/image/logo-gift1.png" alt="Logo" />
            </a>
          </div>
          <div className='navbar_body'>
            <div className='search_bar'>
              <input type='text' placeholder='Search your products...' onClick={toggleSearchBar} />
              <span className="search-icon"><IoSearch onClick={toggleSearchBar} /></span>

              <div ref={searchBarRef} className={`search_bar_body ${isVisible ? 'show_searchDiv_with_animation' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="search_card_wrapper">
                  <div className="search_card">
                    <img src="/assets/image/gift5.jpg" alt="Product" />
                    <div className="desc">Product Description</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='navbar_icons'>

              <div className='cart_icon user_dropdown_btn' onClick={toggleUserDropdown} ref={userDropdownRef}><span><CiUser /></span>
                {userDropdownVisible && (
                  <div className="user_dropdown">
                    <div><a href="/login">LOGIN</a></div>
                    <div><a href="/register">REGISTER</a></div>
                  </div>
                )}
              </div>

              <div className='cart_icon'><a href="/cart"><span><CiShoppingBasket /></span></a></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
