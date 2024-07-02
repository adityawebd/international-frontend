import React from 'react'
import AllCollectionCard  from './AllCollectionCard'

const AllCollection = () => {
    return (
        <div>
            <div className="all_collection py-5">
                <h2 className='mb-4 font-semibold text-4xl text-center light_black_font'>Shop All Collection</h2>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <AllCollectionCard
                                title="New Arrivals"
                                tagline="Gold Special Gifts"
                                discount_text=""
                                discount="30"
                                img_src="/assets/image/cat-1-1-removebg-preview.png"
                                img_title=""
                                order_link=""
                            />
                        </div>
                        <div className="col-md-6">
                            <AllCollectionCard
                                title="New Trending"
                                tagline="Best Gold Gifts"
                                discount_text="Buy any 3 items & get"
                                discount="30"
                                img_src="/assets/image/cat-1-2-removebg-preview.png"
                                img_title=""
                                order_link=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCollection
