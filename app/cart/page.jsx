'use client'
import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NewArrival from '../components/NewArrival'
import Breadcrumbs from '../components/Breadcrumbs'

import Sidebar from '../components/Sidebar'

const page = () => {
    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="Cart" />

            <div className="userprofile_page py-5">
                <div className="container">
                   <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 col-sm-12">
                        <Cart />
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
