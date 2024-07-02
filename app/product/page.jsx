'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Variations from '../components/Variations'

import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import ExploreFeeds from '../components/ExploreFeeds'



const page = () => {
    return (
        <div>
            <Navbar />

            <div className="product mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 product_img_wrapper border-2">

                        </div>
                        <div className="col-md-6 product_about_wrapper border-2">
                            <h3 className='text-xl font-semibold'>Shiva Gold Statue</h3>
                            <p className='green_font font-semibold'> ₹689 </p>

                            <div className="rating_div flex align-middle mt-2">
                                <div className="stars flex align-middle mr-3">
                                    <span className='colored_star'> <FaStar /> </span>
                                    <span className='colored_star'> <FaStar /> </span>
                                    <span className='colored_star'> <FaStar /> </span>
                                    <span className='colored_star'> <FaStar /> </span>
                                    <span className='uncolored_star'> <FaStar /> </span>
                                </div>
                                <div className="review"> 4 Reviews</div>
                            </div>

                            <p className="text-base light_black_font">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officiis dolore officia ut ullam quibusdam consequatur incidunt explicabo amet dignissimos eligendi aperiam atque quae culpa nesciunt, alias commodi obcaecati odit temporibus mollitia vero architecto nam aut sed. Sed, veritatis placeat.</p>

                            <div className="flex flex-wrap mt-3 mb-4">
                                <div className="product_points text-sm light_black_font">
                                    <span><FaCheck /></span> &nbsp; Moisturize
                                </div>
                                <div className="product_points text-sm light_black_font">
                                    <span><FaCheck /></span> &nbsp; Vegan
                                </div>
                                <div className="product_points text-sm light_black_font">
                                    <span><FaCheck /></span> &nbsp; Organic
                                </div>
                                <div className="product_points text-sm light_black_font">
                                    <span><FaCheck /></span> &nbsp; Immune System
                                </div>
                            </div>
                            <div className="cart_btns">
                                <a href=""> <span><HiOutlineShoppingBag /></span> &nbsp; add to cart </a>
                                <a href=""> <span><FaRegHeart /></span> &nbsp; add to wishlist </a>
                                {/* <FaHeart /> */}
                            </div>

                            <h2 className='text-xl font-semibold light_black_font mt-4'>Variations</h2>
                            <Variations />
                        </div>
                    </div>
                </div>
            </div>

            <div className="suggestions">
                <ExploreFeeds />
            </div>

            <Footer />
        </div>
    )
}

export default page
