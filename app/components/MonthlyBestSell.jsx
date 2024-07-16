import React from 'react';

import BestSellCard from './BestSellCard'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';

const MonthlyBestSell = ({ price, ...props }) => {
    return (
        <div>
            <div className="monthly_best_sell">
                <div className="container py-5">
                    <h2 className='mb-4 font-semibold text-2xl'><span>Monthly</span> Best Sell</h2>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="best_sell_banner_wrapper">
                                <div className="banner">
                                    <img src="/assets/imgs/banner/banner-9.jpg" className='rounded-2xl' alt="" />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-9 best_sell_cards">
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
                                        slidesPerView: 3.6,
                                    },
                                }}
                                // navigation={true}
                                //  modules={[Autoplay, Pagination, Navigation]}
                                modules={[Autoplay, Navigation, A11y]}
                                className="swiper-wrapper mx-auto mb-4"
                            >
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="1000"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <BestSellCard
                                        card_link="/product"
                                        img_src="/assets/image/gift17.jpg"
                                        img_title=""
                                        sku_id="667a6274b4d48f8a84ed4c63"
                                        title="Shiva Gold Statue "
                                        discounted_price="759"
                                        actual_price="884"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyBestSell
