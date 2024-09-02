import React from 'react'

const WoodStatue = () => {
  return (
    <div>
      <div className="wood_statue">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <figure data-aos="zoom-in-right" data-aos-duration="800">
                <img src="/assets/images/offer-image/1.png" alt="" />
              </figure>
            </div>
            <div className="col-md-6">
              <div className="wood_statue_content flex flex-col justify-center align-middle text-center">
                <h1 data-aos="fade-up" data-aos-duration="400" className='text-6xl font-extrabold uppercase tracking-wider green_font'>Wood Statue</h1>
                <h2 data-aos="fade-up" data-aos-duration="450" className='text-4xl font-semibold uppercase green_font'>Super Offer</h2>
                <div data-aos="fade-up" data-aos-duration="500" className="wood_statue_img_div">
                  <img src="/assets/image/cat-1-1-removebg-preview.png" alt="" />
                </div>
                <h2 data-aos="fade-up" data-aos-duration="550" className='text-3xl font-semibold light_black_font uppercase mt-2'>Super Quality Statue</h2>
                <h2 data-aos="fade-up" data-aos-duration="600" className='text-4xl font-semibold light_black_font uppercase mt-2'>₹40.00 Only</h2>
                <a data-aos="fade-up" data-aos-duration="650" href="#monthly_best_sell">SHOP NOW</a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h2 className='text-'></h2>
        </div>
      </div>
    </div>
  )
}

export default WoodStatue
