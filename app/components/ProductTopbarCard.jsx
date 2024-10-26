import React from 'react';
import { ChevronDown } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Card = ({ image, name, sections }) => {
    return (
        <div className="pt_card_wrapper">
            <div className="pt_card">
                <img loading='lazy' src={image} alt={name} />
                <div className="pt_card_name px-2 text-sm font-semibold light_black_font">{name}</div>
                <span><ChevronDown /></span>
            </div>
            <div className="pt_card_content">
                <div className="row">
                    {sections.map((section, index) => (
                        <div key={index} className="col-md-12 col-lg-12 col-sm-12 pt_card_content_separate">
                            <p className='text-medium font-semibold light_black_font mb-3 px-2'>{section.title}</p>
                            <div className="product_content_separate_div">
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
                                    modules={[Autoplay, Navigation, A11y]}
                                    className="mx-auto mb-4"
                                >
                                    {section.products.map((product, idx) => (
                                        <SwiperSlide key={idx} className="pt_featured_card">
                                            <a href={product.link}>
                                                <img loading='lazy' src={product.image} alt={product.name} />
                                                <div className="text-xs mt-2">{product.name}</div>
                                            </a>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;


