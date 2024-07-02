'use client'
import React, { useState, useEffect, useRef } from 'react';
import { CiUser, CiShoppingBasket } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(false);
  const searchBarRef = useRef(null);

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
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          <div className="currency">
            CURRENCY
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
              <div className='cart_icon user_dropdown_btn'><span><CiUser /></span>
                <div className="user_dropdown">
                  <ul>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                  </ul>
                </div></div>

              <div className='cart_icon'><span><CiShoppingBasket /></span></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
