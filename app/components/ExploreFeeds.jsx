import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';

const ExploreFeeds = () => {
    return (
        <div>
            <div className="explore_feeds py-5">
                <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>Explore Our Feeds</h2>
                <p className='text-center text-sm light_black_font'>Browse The Collection of Top Products</p>

                <div className="container mt-4 explore_feeds_wrapper">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.5}
                        loop={true}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        // navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            500: {
                                slidesPerView: 3.4,
                            },
                            780: {
                                slidesPerView: 5.8,
                            },
                            1300: {
                                slidesPerView: 6.4,
                            },
                        }}
                        // navigation={true}
                        //  modules={[Autoplay, Pagination, Navigation]}
                        modules={[Autoplay, Navigation, A11y]}
                        className="swiper-wrapper mx-auto mb-4"
                    >
                        <SwiperSlide>
                            <img src="/assets/image/gift2.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift3.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift4.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift5.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift6.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift7.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift8.jpg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/assets/image/gift10.jpg" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </div>
    )
}

export default ExploreFeeds
