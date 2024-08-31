import React, { useEffect, useState } from 'react';
import NewArrivalCard from './NewArrivalCard'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';


const NewArrival = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("before reaponce")
                const response = await axios.get('/api/product');

                console.log("the responce is ", response);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className="new_arrival py-5">
                <h2 data-aos="fade-up" className='mb-4 font-semibold text-4xl text-center light_black_font'>New Arrivals</h2>
                <p data-aos="fade-up" className='text-center text-sm light_black_font'>Browse The Collection of Top Products</p>
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
                        navigation={true}
                        //  modules={[Autoplay, Pagination, Navigation]}
                        modules={[Autoplay, Navigation, A11y]}
                        className="swiper-wrapper mx-auto mb-4"
                    >

                        {product.map((product,index) => (
                            <SwiperSlide key={index}>
                                <NewArrivalCard
                                card_link={`/product/${product._id}`}
                                img_src={product.images[0]}
                                img_title={product.title}
                                sku_id={product.sku}
                                title={product.title}
                                discounted_price={product.discountedPrice}
                                actual_price={product.price}                     
                                   
     
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default NewArrival
