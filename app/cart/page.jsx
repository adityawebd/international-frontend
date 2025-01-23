"use client";
import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import RelatedProduct from "../components/RelatedProduct";
import Navbar2 from '../components/Navbar2'
import Navbar3 from '../components/Navbar3'
import Footer from "../components/Footer";
import NewArrival from "../components/NewArrival";
import Breadcrumbs from "../components/Breadcrumbs";
import BackToTopButton from "../components/BackToTopButton";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useFromStore from "../../hooks/useFromStore";
import { useCartStore } from "../../stores/useCartStore";
import Sidebar from "../components/Sidebar";

const page = () => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  

  // Safely check if `cart` exists and has at least one item
  const firstItemProperties = cart?.[0]?.properties || {};
  // console.log("cart",firstItemProperties);
  

  // related={firstItemProperties}
  return (
    <div>
      <Navbar2 />
      <Navbar3 />
      
      <div className="bg_gray breadcrumbs_wrapper py-3">
        <div className="container">
          <div className="flex justify-between align-middle">
            <h3 className="font-medium">
              {" "}
              <a href="/all-products">All Products</a>
            </h3>
            <div className="breadcrumbs flex justify-between align-middle">
              <a href="/" className="text-sm">
                Home
              </a>
              <div className="breadcrumbs flex justify-between align-middle text-sm text-blue-600/100">
                {" "}
                <span>
                  <MdKeyboardDoubleArrowRight />
                </span>{" "}
                Cart{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <Cart />
      </div>
      {/* <NewArrival related={firstItemProperties}/> */}

      <RelatedProduct  related={firstItemProperties}/>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default page;
