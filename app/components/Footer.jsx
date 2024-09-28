import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {Send} from 'lucide-react'

const Footer = () => {
    const date = new Date();

    return (
        <div className='developedByAdityaRajGupta'>
            <footer>
                <div className="limited_edition text-center text-md text-white py-3">
                    Discover the World of Unique Gifts!
                </div>
                <div className="container py-5">
                    <div className="row pb-5">
                        <div className="col-md-3">
                            <a href="/">
                                <img src="/assets/image/logo-gift.png" alt="Logo" />
                            </a>
                            <div className="text-sm light_black_font mt-3">We International Gift, located at Uttam Nager, New Delhi </div>
                            <div className='text-sm light_black_font mt-2'> <span className='font-bold'>Call Us: </span> +91-8800217402</div>
                            <div className='text-sm light_black_font mt-2'> <span className='font-bold'>Email: </span> rakesh@internationalgift.in</div>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Information</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="/about-us">About us</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/cart">Cart</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/contact-us">Contact us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Account</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="/profile">My Account</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/track-order">Track Your Order</a></li>
                                {/* <li className='text-sm light_black_font mt-2'><a href="/wishlist">Wishlist</a></li> */}
                                <li className='text-sm light_black_font mt-2'><a href="/user-history">Your Product History</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Services</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="/privacy-policy">Privacy Policy</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/tnc">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Newsletter</h3>
                            <ul>
                                <p className='text-sm light_black_font mt-2 mb-4'>Subscribe to your newletter! By submitting your email below</p>
                                <div className="footer_news_widget">
                                    <form>
                                        <input type="email" placeholder='Enter you email here...' />
                                        <button><span><Send /></span></button>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="row border-t-2 pt-4">
                        <div className="col-md-4">
                            <div className="icons">
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaTwitter /></a>
                                <a href="#"><FaInstagram /></a>
                                <a href="#"><FaLinkedinIn /></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <p className='text-sm light_black_font py-2 text-center'>Copyright &copy; 2{date.getFullYear()} <span>INTERNATION GIFT</span>. All Rights Reserved</p>
                        </div>
                        <div className="col-md-4">
                            <img src="/assets/images/icons/payment.png" alt="" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
