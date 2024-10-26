import React from 'react'

const PromisesBanner = () => {
  return (
    <div>
      <div className="promises_banner pb-5">
        <div className="container">
            <div className="row">
                <div data-aos="zoom-in-right" data-aos-duration="800" className="col-6 col-lg-3 flex flex-col justify-center align-middle mt-4">
                    <figure>
                        <img loading='lazy' src="/assets/images/icons/service_1.svg" alt="" />
                    </figure>
                    <p className='text-base text-center font-bold'>Free Shipping</p>
                    <small className='light_black_font text-center'>Free shipping on all US order or orders above ₹200</small>
                </div>
                <div data-aos="fade-up" data-aos-duration="800" className="col-6 col-lg-3 flex flex-col justify-center align-middle mt-4">
                    <figure>
                        <img loading='lazy' src="/assets/images/icons/service_2.svg" alt="" />
                    </figure>
                    <p className='text-base text-center font-bold'>24/7 Availability</p>
                    <small className='light_black_font text-center'>We are avaialable for you 24/7</small>
                </div>
                <div data-aos="fade-up" data-aos-duration="800" className="col-6 col-lg-3 flex flex-col justify-center align-middle mt-4">
                    <figure>
                        <img loading='lazy' src="/assets/images/icons/service_3.svg" alt="" />
                    </figure>
                    <p className='text-base text-center font-bold'>Safe Order Traking</p>
                    <small className='light_black_font text-center'>We ensure sage order tracking</small>
                </div>
                <div className="col-6 col-lg-3 flex flex-col justify-center align-middle mt-4">
                    <figure>
                        <img loading='lazy' src="/assets/images/icons/service_4.svg" alt="" />
                    </figure>
                    <p className='text-base text-center font-bold'>Secure Payments</p>
                    <small className='light_black_font text-center'>You can rely on us with secured payments</small>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PromisesBanner
