"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CiUser, CiShoppingBasket } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { CurrencyContext } from "../CurrencyContext"; // Importing the context
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import axios from "axios";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

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
    window.location.href = "/";
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
      event.target.tagName !== "INPUT" // Ensure the search input is not considered outside
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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleCurrencyDropdown = (event) => {
    // for currency dropdown
    event.stopPropagation();
    setCurrencyDropdownVisible((prev) => !prev);
  };

  const changeCurrency = (currency) => {
    // for curreny change
    setCurrency(currency);
    setCurrencyDropdownVisible(false);
  };

  const toggleUserDropdown = (event) => {
    // for user dropdown
    event.stopPropagation();
    setUserDropdownVisible((prev) => !prev);
  };

  const { data: session } = useSession();

  // serching the product

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim() === "") {
      setResults([]);
      return;
    }

    const res = await axios.get(`/api/search?query=${e.target.value}`);
    // const data = await res.json();
    console.log("result as responce", res);
    setResults(res.data);
    console.log("result ", results);
    console.log("result length", results.length);
  };

  return (
    <div>
      <div className="mx-auto container lg:px-10">
        <div className="lg:block hidden">
          <div className="flex justify-between py-2 border-b">
            <div className="flex gap-8 justify-start items-center w-[80%]">
              <div>
                <Link href="/">
                  <img
                    loading="lazy"
                    src="/assets/international-gift-logo-inline.png"
                    alt="Logo"
                    className="w-96"
                  />
                </Link>
              </div>

              <div className="relative w-[70%]">
                <input
                  type="text"
                  placeholder="Search your products..."
                  onClick={toggleSearchBar}
                  value={query}
                  onChange={handleSearch}
                  className="w-full border border-black/80 rounded-full px-4 py-1 outline-none light_black_font"
                />
                <span className="bg-gray-200 p-2 rounded-full absolute top-0 right-0">
                  <IoSearch onClick={toggleSearchBar} className="" />
                </span>
                <div
                  ref={searchBarRef}
                  className={`absolute top-10 w-full rounded-b-2xl shadow-lg bg-white p-4 z-[999] ${
                    isVisible ? "animate-slideDown block" : "hidden"
                  }`}
                >
                  <div
                    className={`${
                      results.length === 0
                        ? ""
                        : "grid lg:grid-cols-4 md:grid-cols-4 grid-cols-4 gap-2 max-sm:grid-cols-3 h-[500px] lg:h-[500px] md:h-[300px] sm:h-[300px] overflow-y-auto"
                    }`}
                  >
                    {results?.length > 0 ? (
                      results.map((result) => (
                        <a
                          href={`/product/${result._id}`}
                          className="border rounded-lg p-2"
                          key={result._id}
                        >
                          <img
                            loading="lazy"
                            src={result.images[0]}
                            alt={result.title}
                            className="rounded-lg border"
                          />
                          <div className="productTitle mt-2">
                            {result.title}
                          </div>
                        </a>
                      ))
                    ) : (
                      <div>No results found.</div> // Optional: Message when there are no results
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[20%] flex justify-end items-center">
              <div className="flex gap-4 items-start">
                <div className="flex flex-col justify-center items-center relative">
                  <span
                    className="hover:cursor-pointer relative"
                    onClick={(event) => toggleUserDropdown(event)}
                    ref={userDropdownRef}
                  >
                    <LuUser size={30} />
                    {session ? (
                      <span className="absolute -right-2 -bottom-2 text-green-500">
                        <GoDotFill size={24} />
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  {session ? (
                    <>
                      <p className="text-sm green_font">Online</p>
                      {userDropdownVisible && (
                        <div className="absolute top-12 right-0 w-40 z-10 bg-white border rounded-lg p-2">
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/profile">Your Profile</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/user-history">Your Orders</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 hover:bg-gray-300 transition duration-300 cursor-pointer">
                            <a onClick={logout}>Logout</a>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {userDropdownVisible && (
                        <div className="absolute top-12 right-0 w-36 z-10 bg-white border rounded-lg p-2">
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/login">LOGIN</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/register">REGISTER</Link>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative">
                  <Link href="/cart">
                    <span>
                      <MdOutlineShoppingCart size={30} />
                    </span>
                  </Link>
                  <span className="absolute -bottom-3 -right-2 text-xs text-white bg_green rounded-full p-1 w-5 flex justify-center">
                    {cart?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden block md:block max-sm:block">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <Link href="/">
                <img
                  loading="lazy"
                  src="/assets/international-gift-logo-inline.png"
                  alt="Logo"
                  className="w-48"
                />
              </Link>
            </div>

            <div className="flex justify-end items-center">
              <div className="flex gap-4 items-start">
                <div className="flex flex-col justify-center items-center relative">
                  <span
                    className="hover:cursor-pointer relative"
                    onClick={toggleUserDropdown}
                    ref={userDropdownRef}
                  >
                    <LuUser size={20} />
                    {session ? (
                      <span className="absolute -right-2 -bottom-2 text-green-500">
                        <GoDotFill size={18} />
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  {session ? (
                    <>
                      <p className="text-sm green_font">Online</p>
                      {userDropdownVisible && (
                        <div className="absolute top-12 right-0 w-40 z-10 bg-white border rounded-lg p-2">
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/profile">Your Profile</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/user-history">Your Orders</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 hover:bg-gray-300 transition duration-300 cursor-pointer">
                            <a onClick={logout}>Logout</a>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {userDropdownVisible && (
                        <div className="absolute top-12 right-0 w-36 z-10 bg-white border rounded-lg p-2">
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/login">LOGIN</Link>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2 px-4 mb-1 hover:bg-gray-300 transition duration-300">
                            <Link href="/register">REGISTER</Link>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="relative">
                  <Link href="/cart">
                    <span>
                      <MdOutlineShoppingCart size={20} />
                    </span>
                  </Link>
                  <span className="absolute -bottom-3 -right-2 text-xs text-white bg_green rounded-full p-1 w-5 flex justify-center">
                    {cart?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full mt-2">
            <input
              type="text"
              placeholder="Search your products..."
              onClick={toggleSearchBar}
              value={query}
              onChange={handleSearch}
              className="w-full border border-black/80 rounded-full px-4 py-1 outline-none light_black_font"
            />
            <span className="bg-gray-200 p-2 rounded-full absolute top-0 right-0">
              <IoSearch onClick={toggleSearchBar} className="" />
            </span>
            <div
              ref={searchBarRef}
              className={`absolute top-10 w-full rounded-b-2xl shadow-lg bg-white p-4 z-[999] ${
                isVisible ? "animate-slideDown block" : "hidden"
              }`}
            >
              <div
                className={`${
                  results.length === 0
                    ? ""
                    : "grid lg:grid-cols-4 md:grid-cols-4 grid-cols-4 gap-2 max-sm:grid-cols-3 h-[500px] lg:h-[500px] md:h-[300px] sm:h-[300px] overflow-y-auto"
                }`}
              >
                {results?.length > 0 ? (
                  results.map((result) => (
                    <a
                      href={`/product/${result._id}`}
                      className="border rounded-lg p-2"
                      key={result._id}
                    >
                      <img
                        loading="lazy"
                        src={result.images[0]}
                        alt={result.title}
                        className="rounded-lg border"
                      />
                      <div className="productTitle mt-2">{result.title}</div>
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
    </div>
  );
};

export default Navbar;
