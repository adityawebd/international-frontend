'use client'
const convertPrice = (price, currency, exchangeRates) => {
    const rate = exchangeRates[currency];
    return price * rate;
};

import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Variations from '../components/Variations';
import ExploreFeeds from '../components/ExploreFeeds';
import Magnify from '../components/Magnify'
import { FaStar, FaCheck, FaRegHeart } from 'react-icons/fa6';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const Page = () => {
    const [activeTab, setActiveTab] = useState('general_info');
    const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
    const [isCounting, setIsCounting] = useState(false);
    const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);


    // useCountUp for the circular progress
    const { value: value1, reset: resetValue1 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[0] });
    const { value: value2, reset: resetValue2 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[1] });
    const { value: value3, reset: resetValue3 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[2] });
    const { value: value4, reset: resetValue4 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[3] });
    const { value: value5, reset: resetValue5 } = useCountUp({ isCounting, duration: 1, start: 0, end: progressValues[4] });


    const productData = {
        productName: "Shiva Gold Statue",
        actual_price: "999",
        discounted_price: "689",
        rating: 4,
        reviewsCount: 4,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officiis dolore officia ut ullam quibusdam consequatur incidunt explicabo amet dignissimos eligendi aperiam atque quae culpa nesciunt, alias commodi obcaecati odit temporibus mollitia vero architecto nam aut sed. Sed, veritatis placeat.",
        features: [
            { id: 1, name: "Moisturize" },
            { id: 2, name: "Vegan" },
            { id: 3, name: "Organic" },
            { id: 4, name: "Immune System" }
        ],
        variations: [
            { id: 1, name: "Size", options: ["Small", "Medium", "Large"] },
            { id: 2, name: "Color", options: ["Gold", "Silver", "Bronze"] }
        ],
        images: [
            { id: 1, src: "/assets/image/gift12.jpg", "alt": "Gift 12" },
            { id: 2, src: "/assets/image/gift13.jpg", "alt": "Gift 13" },
            { id: 3, src: "/assets/image/gift14.jpg", "alt": "Gift 14" }
        ],
        variations_images: [
            { id: 1, src: "/assets/image/gift5.jpg", "alt": "Gift 12" },
            { id: 2, src: "/assets/image/gift7.jpg", "alt": "Gift 13" },
            { id: 3, src: "/assets/image/gift12.jpg", "alt": "Gift 14" },
            { id: 3, src: "/assets/image/gift14.jpg", "alt": "Gift 14" },
            { id: 3, src: "/assets/image/gift15.jpg", "alt": "Gift 14" },
            { id: 3, src: "/assets/image/gift7.jpg", "alt": "Gift 14" }
        ],

        tabs: {
            general_info: {
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ratione expedita consectetur tempore ab saepe ad modi voluptatem quibusdam illum. Possimus voluptates reprehenderit, assumenda in, beatae architecto at ad nesciunt ratione aliquam tenetur aperiam deserunt aliquid modi. Exercitationem suscipit doloremque tempora voluptates fugiat, aut pariatur inventore alias dignissimos sit beatae!"
            },
            additional_info: {
                content: "Additional information Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ratione expedita consectetur tempore ab saepe ad modi voluptatem quibusdam illum. Possimus voluptates reprehenderit, assumenda in, beatae architecto at ad nesciunt ratione aliquam tenetur aperiam deserunt aliquid modi. Exercitationem suscipit doloremque tempora voluptates fugiat, aut pariatur inventore alias dignissimos sit beatae!"
            },
            reviews: {
                averageRating: 4.9,
                totalReviews: 209,
                topReviews: [
                    {
                        author: "Mita",
                        date: "3 weeks ago",
                        verifiedPurchase: true,
                        rating: 4,
                        reviewText: "The smell is gorgeous!",
                        likes: 12,
                        dislikes: 2,
                        informationIcons: ["MdVerified", "FaStar", "FaStar", "FaStar", "FaStar"]
                    },
                    {
                        author: "John Doe",
                        date: "1 month ago",
                        verifiedPurchase: false,
                        rating: 5,
                        reviewText: "Absolutely stunning!",
                        likes: 20,
                        dislikes: 0,
                        informationIcons: ["FaStar", "FaStar", "FaStar", "FaStar", "FaStar"]
                    }
                ],
                progressValues: [75, 50, 60, 80, 90]
            }
        }
    };

    const { currency, exchangeRates } = useContext(CurrencyContext);
    const convertedPrice = convertPrice(productData.discounted_price, currency, exchangeRates);
    const convertedActualPrice = convertPrice(productData.actual_price, currency, exchangeRates);


    // to handle tab click of product desc
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // to handle tab click of product image
    const handleProductTabClick = (index) => {
        setActiveProductTab(index); // Update active tab when a tab button is clicked
    };

    // to handle circular progress
    useEffect(() => {
        if (activeTab === 'reviews') {
            setProgressValues([75, 50, 60, 80, 90]); // Update with your desired values
            resetValue1();
            resetValue2();
            resetValue3();
            resetValue4();
            resetValue5();
            setIsCounting(true);
        } else {
            setIsCounting(false);
        }
    }, [activeTab, resetValue1, resetValue2, resetValue3, resetValue4, resetValue5]);


    return (
        <div>
            <Navbar />

            <div className="product mt-3">
                <div className="container">
                    {/* product image and about section */}
                    <div className="row">
                        <div className="col-md-6 product_img_wrapper">
                            {/* Image section placeholder */}
                            <div className="product_img_wrapper_container">
                                <div className="product_img_tab_btns">
                                    {/* Render tab buttons */}
                                    {productData.images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            className={index === activeProductTab ? 'active' : ''}
                                            onClick={() => handleProductTabClick(index)}
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                width={150}
                                                height={160}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="product_img_tab_content">
                                    {/* Render tab content */}
                                    {productData.images.map((image, index) => (
                                        <div
                                            key={image.id}
                                            className={index === activeProductTab ? 'active' : 'hidden'}
                                        >
                                            {/* <img
                                                src={image.src}
                                                alt={image.alt}
                                            /> */}
                                            <Magnify imageSrc={productData.images[activeProductTab].src} alt={productData.images[activeProductTab].alt} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 product_about_wrapper">
                            <h3 className='text-xl font-semibold'>{productData.productName}</h3>
                            <p className='green_font font-semibold price'> 
                                {/* ₹{productData.price}  */}
                                {currency === 'INR' ? '₹' : '$'} {convertedPrice.toFixed(2)} &nbsp;
                                <span>{currency === 'INR' ? '₹' : '$'} {convertedActualPrice.toFixed(2)}</span>
                            </p>

                            <div className="rating_div flex align-middle mt-2">
                                <div className="stars flex align-middle mr-3">
                                    {[...Array(productData.rating)].map((_, index) => (
                                        <span key={index} className="colored_star"><FaStar /></span>
                                    ))}
                                    {[...Array(5 - productData.rating)].map((_, index) => (
                                        <span key={index} className="uncolored_star"><FaStar /></span>
                                    ))}
                                </div>
                                <div className="review">{productData.reviewsCount} Reviews</div>
                            </div>

                            <p className="text-base light_black_font">{productData.description}</p>
                            <div className="flex flex-wrap mt-3 mb-4">
                                {productData.features.map((feature) => (
                                    <div key={feature.id} className="product_points text-sm light_black_font mb-2">
                                        <span><FaCheck /></span> &nbsp; {feature.name}
                                    </div>
                                ))}
                            </div>
                            <div className="cart_btns">
                                <a href="#"><span><HiOutlineShoppingBag /></span> &nbsp; add to cart </a>
                            </div>
                            <h2 className="text-xl font-semibold light_black_font mt-4">Variations</h2>
                            <Variations images={productData.variations_images}/>
                            {/* <Variations variations={productData.variations} /> */}
                            {/* <Variations /> */}
                        </div>
                    </div>

                    {/* product details section */}
                    <div className="row product_details mt-4">
                        <div className="mb-4 mt-2 flex justify-center align-middle">
                            <ul className="flex tabs_ul flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'general_info' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('general_info')}
                                    >
                                        General Information
                                    </button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'additional_info' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('additional_info')}
                                    >
                                        Additional Information
                                    </button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`inline-block mt-2 px-4 py-2 ${activeTab === 'reviews' ? 'green_bg_white_font' : 'hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => handleTabClick('reviews')}
                                    >
                                        Reviews
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {activeTab === 'general_info' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ratione expedita consectetur tempore ab saepe ad modi voluptatem quibusdam illum. Possimus voluptates reprehenderit, assumenda in, beatae architecto at ad nesciunt ratione aliquam tenetur aperiam deserunt aliquid modi. Exercitationem suscipit doloremque tempora voluptates fugiat, aut pariatur inventore alias dignissimos sit beatae!
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem dolorem sapiente sunt itaque. Corporis, accusantium iste? Sapiente voluptatibus debitis cumque hic non. Amet aut iure similique, eveniet sit a eligendi dolor impedit excepturi commodi nam odit unde deleniti molestiae minus. Similique, animi, eius ea ducimus sint aliquam magnam amet rem dolores enim ipsam fuga necessitatibus veritatis harum. Repellendus rerum vitae dignissimos exercitationem necessitatibus voluptate maxime pariatur minima aspernatur suscipit minus eos, unde magni reprehenderit beatae obcaecati fuga? Maiores quo sit eum expedita fuga eius optio ipsum, quam commodi laborum repellendus molestiae accusantium eveniet obcaecati ratione tempora in harum officia ipsam!
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente accusamus vero perspiciatis explicabo ut possimus molestiae labore totam pariatur sint? Corrupti aut asperiores suscipit quis mollitia deserunt amet similique consequuntur? Dolorem odio voluptas ratione autem similique, aliquid sed hic aperiam tempore error perspiciatis alias dolor temporibus omnis eius laborum perferendis facere possimus ut magni quae nostrum id! Totam laudantium ut ex vero perferendis minus quasi libero! Est modi cupiditate voluptatem in maxime, libero earum optio unde quis beatae consequatur commodi mollitia. Amet adipisci voluptatem harum unde aperiam beatae earum nobis ut, recusandae aut, asperiores quo optio quos atque minima quisquam!
                                    </p>
                                </div>
                            )}
                            {activeTab === 'additional_info' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500"> freoiio ufhiy8urhgLorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ratione expedita consectetur tempore ab saepe ad modi voluptatem quibusdam illum. Possimus voluptates reprehenderit, assumenda in, beatae architecto at ad nesciunt ratione aliquam tenetur aperiam deserunt aliquid modi. Exercitfurbhgn vior vhiof  oiv ationem suscipit doloremque tempora voluptates fugiat, aut pariatur inventore alias dignissimos sit beatae!
                                        Lorem ipsum dolor sit amet consectetur, afdipisicing elit. Voluptatem dolorem sapiente sunt itaque. Corporis, accusantium iste? Sapiente voluptatibus debitis cumque hic non. Amet vaut iure simicfvfvf, eveniet sit a eligendi dolor impedit excepturi commodi nam odit unde deleniti molestiae minus. Similique, animi, vrdvbfdvfdfgfgvbvfrrri iof  reoifg regeius ea ducimus sint aliquam magnam amet rem dolores enim ipsam fuga necessitatibus veritativfdvs harum. Repellenvfdus rerum vitae dignissimobfvs exercitationem necessitatibus voluptate maxime pariatur minima aspernatur suscipit minus eos, unde magni reprehenderit be caecati ratione tempora in harum officia ipsam!
                                        Lorem ipsum dolor sit amet consectetur, adipisficing elit. Sapiente accusamus ver fo perspiciatis explicabo ut possimus molestiae labore totam pariatur sint? Corrupti aut asperiores suscipitd  quis m fol  alias dolor temporibus omnis eius laborum perferendis facere possimus ut magni quae nostrum id! Totam laudantium ut ex vero perferendis minfs quasi libero! Est modi cupiditate voluptatem in maxime, libero earum optio unde quis beatae consequatur commodi mollitia. Amet adipisci voluptatem harum unde aperiam beatae earum nobis ut, recusandae aut, asperiores quo optio quos atque minima quisquam!
                                    </p>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm">
                                            <h3 className='text-xl font-semibold light_black_font'>Customer Reviews</h3>
                                            <div className="rating_div flex align-middle mt-2">
                                                <div className="stars flex align-middle mr-3">
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='colored_star'><FaStar /></span>
                                                    <span className='uncolored_star'><FaStar /></span>
                                                </div>
                                                <div className="review">4.9 (Total 209 Reviews)</div>
                                            </div>

                                            <div className="circular_progress_wrapper flex flex-wrap mt-3">
                                                {[value1, value2, value3, value4, value5].map((value, index) => (
                                                    <Stack key={`progress-${index}`} className="mr-5 mb-4" direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
                                                        <Stack spacing={2}>
                                                            <CircularProgress size="lg" determinate value={value}>
                                                                <Typography>{Math.round(value)}%</Typography>
                                                            </CircularProgress>
                                                        </Stack>
                                                    </Stack>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm">
                                            <h3 className='text-xl font-semibold light_black_font'>Top Reviews</h3>
                                            <div className="top_reviews_wrapper">
                                                <div className="flex mt-4">
                                                    <img src="/assets/images/testimonial/1.jpg" alt="" />
                                                    <div>
                                                        <h5 className='text-base font-semibold'>Mita</h5>
                                                        <small className='text-sm text-gray-500'>3 weeks ago</small>
                                                        <div className="verified_pruchase flex align-middle text-xs">
                                                            <span> <MdVerified /> </span> &nbsp; <p>Verified Purchase</p>
                                                        </div>
                                                        <div className="stars flex align-middle mr-3 mt-3 mb-2">
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='uncolored_star'><FaStar /></span>
                                                        </div>
                                                        <p className='text-lg mb-2'>The smell is gorgeous!</p>
                                                        <div className="flex top_reviews_icons">
                                                            <span> <BiLike /> </span>
                                                            <span> <BiDislike /> </span>
                                                            <span> <IoMdInformationCircleOutline /> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <img src="/assets/images/testimonial/1.jpg" alt="" />
                                                    <div>
                                                        <h5 className='text-base font-semibold'>Mita</h5>
                                                        <small className='text-sm text-gray-500'>3 weeks ago</small>
                                                        <div className="verified_pruchase flex align-middle text-xs">
                                                            <span> <MdVerified /> </span> &nbsp; <p>Verified Purchase</p>
                                                        </div>
                                                        <div className="stars flex align-middle mr-3 mt-3 mb-2">
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='colored_star'><FaStar /></span>
                                                            <span className='uncolored_star'><FaStar /></span>
                                                        </div>
                                                        <p className='text-lg mb-2'>The smell is gorgeous!</p>
                                                        <div className="flex top_reviews_icons">
                                                            <span> <BiLike /> </span>
                                                            <span> <BiDislike /> </span>
                                                            <span> <IoMdInformationCircleOutline /> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="suggestions">
                <ExploreFeeds />
            </div>

            <Footer />
        </div>
    );
}

export default Page;
