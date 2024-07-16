'use client'
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';

import ProductSidebar from '../components/ProductSidebar'
import DryFruits from '../components/DryFruits'

const page = () => {
    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="Religious Idol" />

            <div className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-12">
                            <ProductSidebar />
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-12 border-l">
                            <DryFruits />
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
