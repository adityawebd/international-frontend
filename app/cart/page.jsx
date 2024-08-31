'use client'
import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NewArrival from '../components/NewArrival'
import Breadcrumbs from '../components/Breadcrumbs'
import BackToTopButton from '../components/BackToTopButton'

import Sidebar from '../components/Sidebar'

const page = () => {
    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="Cart" />                                         
                    <div className="m-4">
                        <Cart />
                    </div>
                <NewArrival />
                <Footer />
                <BackToTopButton />
        </div>
    )
}

export default page
