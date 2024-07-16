import React from 'react'
import NewArrivalCard from './NewArrivalCard'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';

const NewArrival = () => {
    return (
        <div>
            <div className="new_arrival py-5">
                <h2 className='mb-4 font-semibold text-4xl text-center light_black_font'>New Arrivals</h2>
                <p className='text-center text-sm light_black_font'>Browse The Collection of Top Products</p>
                <div className="container mt-4">
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
                                slidesPerView: 2.4,
                            },
                            780: {
                                slidesPerView: 3.8,
                            },
                            1300: {
                                slidesPerView: 4.6,
                            },
                        }}
                        // navigation={true}
                        //  modules={[Autoplay, Pagination, Navigation]}
                        modules={[Autoplay, Navigation, A11y]}
                        className="swiper-wrapper mx-auto mb-4"
                    >
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <NewArrivalCard
                                card_link=""
                                img_src="/assets/image/gift17.jpg"
                                img_title=""
                                sku_id="667a6274b4d48f8a84ed4c63"
                                title="Shiva Gold Statue Aditya"
                                discounted_price="550"
                                actual_price="984" 
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default NewArrival
