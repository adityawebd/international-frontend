import React from 'react'
import Navbar from '../components/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

import { GoDotFill } from "react-icons/go";


const page = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="About Us" />

      <div className="about_page py-5">
        <div className="container">
          <div className="row">
            <div className="">
              <h2 className='text-3xl font-semibold text-black'>About Us</h2>
              <p className='date_views_ul flex flex-wrap text-xs font-medium light_black_font my-3'>
                By International &nbsp;<span><GoDotFill /></span>&nbsp; 10 May 2024  &nbsp;<span><GoDotFill /></span>&nbsp; 8 mins read  &nbsp;<span><GoDotFill /></span>&nbsp; 69K Views
              </p>

              <img className='rounded-xl mt-4 mb-5' src="/assets/terms.jpg" alt="" />

              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
            
              <h2 className='text-2xl font-semibold'>Rights & Restrictions</h2>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              
              <h2 className='text-2xl font-semibold'>Links to Other Web Sites</h2>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
            
              <h2 className='text-2xl font-semibold'>Termination</h2>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              
              <h2 className='text-2xl font-semibold'>Governing Law</h2>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequuntur in facere natus, sint voluptatem cumque id placeat, alias nihil rem itaque est voluptates quos.</p>
              
              <h2 className='text-2xl font-semibold'>Changes</h2>
              <p className='light_black_font mb-4'>Lorem ipsum dolor sit amet consectetur alias nihil rem itaque est voluptates quos.</p>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default page
