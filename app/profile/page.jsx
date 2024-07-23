'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';
import { useSession, signIn, signOut } from "next-auth/react"
import { FaUser } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'

const page = () => {
    const { data: session } = useSession();
    const [redirectToHome, setRedirectToHome] = useState(false);

    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <a href="/login">
                        <button className="bg-white p-2 px-4 rounded-lg">Login First</button>
                    </a>
                </div>
            </div>
        );
    }


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
