'use client'
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';

import ProductSidebar from '../components/ProductSidebar'
import ReligiousIdol from '../components/ReligiousIdol'


const page = () => {
  return (
    <div>
      <Navbar />
            <Breadcrumbs page_title="All Product" />

            <div className="py-5">
                <div className="container-fluid">
                   <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12">
                        <ProductSidebar />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-12 border-l">
                      <ReligiousIdol />
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
