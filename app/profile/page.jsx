'use client'
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';

import { FaUser } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'

const page = () => {
    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="User Profile" />

            <div className="py-5">
                <div className="container">
                   <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-12 border-l">
                        <Profile />
                    </div>
                   </div>
                </div>
            </div>



            <NewArrival />
            <Footer />
        </div>
    )
}

export default page
