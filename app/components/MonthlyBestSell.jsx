import React, {useEffect,useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import BestSellCard from './BestSellCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';

const MonthlyBestSell = ({ price, ...props }) => {
    
  useEffect(() => { //animate on scroll
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
            <div className="monthly_best_sell">
                <div className="container py-5">
                    <h2 data-aos="fade-down" data-aos-duration="1000" className='mb-4 font-semibold text-2xl'><span>Monthly</span> Best Sell</h2>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="best_sell_banner_wrapper">
                                <div  data-aos="zoom-in-right" data-aos-duration="1000"  className="banner">
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
                                navigation={true}
                                //  modules={[Autoplay, Pagination, Navigation]}
                                modules={[Autoplay, Navigation, A11y]}
                                className="swiper-wrapper mx-auto mb-4"
                            >

                                {product.map((product) =>(
                                <SwiperSlide>

                                    <BestSellCard
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
            </div>
        </div>
    )
}

export default MonthlyBestSell
