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
            <Breadcrumbs page_title="All Productsss" />

            <div className="py-5">
                
            </div>


            <NewArrival />
            <Footer />
    </div>
  )
}

export default page
