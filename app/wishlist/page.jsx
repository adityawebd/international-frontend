'use client'
import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/Navbar2'
import Navbar3 from '../components/Navbar3'
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';
        

import Sidebar from '../components/Sidebar'
import Wishlist from '../components/Wishlist'


const Page = () => {
    return (
        <div>
            <Navbar2 />
            <Navbar3 />
            <Breadcrumbs page_title="Wishlist" />

            <div className="py-5">
                <div className="container">
                   <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12">
                        <Sidebar />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-12 border-l">
                        <Wishlist />
                    </div>
                   </div>
                </div>
            </div>


            <NewArrival />
            <Footer />
        </div>
    );
};

export default Page;
