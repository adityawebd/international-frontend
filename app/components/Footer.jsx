import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer>
                <div className="limited_edition text-center text-md text-white py-3">
                    Win a contest! Get this limited-edition <a className='underline' href="">View Detail</a>
                </div>
                <div className="container py-5">
                    <div className="row pb-5">
                        <div className="col-md-3">
                            <a href="/">
                                <img src="/assets/image/logo-gift1.png" alt="Logo" />
                            </a>
                            <div className="text-sm light_black_font mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, dolor.</div>
                            <div className='text-sm light_black_font mt-2'> <span className='font-bold'>Call Us: </span> +44 0123 456 789</div>
                            <div className='text-sm light_black_font mt-2'> <span className='font-bold'>Email: </span> example@gmail.com</div>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Information</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="/about-us">About us</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/all-products">All Products</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/refund-policy">Cancellation Refund Policy</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="/contact-us">Contact us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Account</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="">Abouts us</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">All Products</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">Cancellation Refund Policy</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">Contact us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Services</h3>
                            <ul>
                                <li className='text-sm light_black_font mt-2'><a href="">Abouts us</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">All Products</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">Cancellation Refund Policy</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">Contact us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 mt-2">
                            <h3 className='text-lg font-bold tracking-widest light_black_font border-b-2 pb-2'>Newsletter</h3>
                            <ul>
                                <p className='text-sm light_black_font mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, est.</p>
                                <li className='text-sm light_black_font mt-2'><a href="">Cancellation Refund Policy</a></li>
                                <li className='text-sm light_black_font mt-2'><a href="">Contact us</a></li>
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
                            <p className='text-sm light_black_font py-2 text-center'>Copyright &copy; 2023-2024 <span>INTERNATION GIFT</span>. All Rights Reserved</p>
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
