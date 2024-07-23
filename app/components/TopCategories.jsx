import React, { useState } from 'react';

const TopCategories = () => {
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('vertical-tab-with-border-1');

    // Function to handle tab switching
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <div className="top_categories py-5">
                <h2 data-aos="fade-up" data-aos-duration="500" className='mb-2 font-semibold text-4xl text-center light_black_font'>Top Categories</h2>
                <p data-aos="fade-up" data-aos-duration="600" className='text-center text-sm light_black_font'>Browse The Collection of Top Products</p>

                <div className="container">
                    <div className="tabs_wrapper mt-4">
                        <div className="row tab_view">
                            <div className="col-md-3 col-sm">
                                <nav className="flex flex-col space-y-2" aria-label="Tabs" role="tablist">
                                    {[
                                        { id: '1', category: 'Religious Idol', products: '440 Products', img: 'cat_1.png', hoverImg: 'cat_1_1.png' },
                                        { id: '2', category: 'Decorative Item', products: '440 Products', img: 'cat_2.png', hoverImg: 'cat_2_1.png' },
                                        { id: '3', category: 'Dry Fruit Bowl', products: '440 Products', img: 'cat_3.png', hoverImg: 'cat_3_1.png' },
                                        { id: '4', category: 'Car Idol', products: '440 Products', img: 'cat_4.png', hoverImg: 'cat_4_1.png' }
                                    ].map(({ id, category, products, img, hoverImg }) => (
                                        <button
                                            key={id}
                                            type="button"
                                            className={`tab-button ${activeTab === `vertical-tab-with-border-${id}` ? 'active' : ''}`}
                                            id={`vertical-tab-with-border-item-${id}`}
                                            onClick={() => handleTabClick(`vertical-tab-with-border-${id}`)}
                                            aria-controls={`vertical-tab-with-border-${id}`}
                                            role="tab"
                                            aria-selected={activeTab === `vertical-tab-with-border-${id}`}
                                        >
                                            <figure className="hover-image">
                                                <img className='default_img' src={`/assets/images/icons/${img}`} alt={`${category} Image`} />
                                                <img className='hovered_img' src={`/assets/images/icons/${hoverImg}`} alt={`${category} Hover Image`} />
                                            </figure>
                                            <div className="tab_btn_text">
                                                <div className="category">{category}</div>
                                                <div className="no_of_products">{products}</div>
                                            </div>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <div className="col-md-9 col-sm">
                                {[
                                    { id: '1', img_src: '/assets/images/cat-banner/cat-11.jpg', btn_link: '/products' },
                                    { id: '2', img_src: '/assets/images/cat-banner/cat-22.jpg', btn_link: '/products' },
                                    { id: '3', img_src: '/assets/images/cat-banner/cat-33.jpg', btn_link: '/products' },
                                    { id: '4', img_src: '/assets/images/cat-banner/cat-11.jpg', btn_link: '/products' }
                                ].map(({ id, img_src, btn_link }) => (
                                    <div
                                        key={id}
                                        id={`vertical-tab-with-border-${id}`}
                                        className={`tab_content ${activeTab === `vertical-tab-with-border-${id}` ? '' : 'hidden'}`}
                                        role="tabpanel"
                                        aria-labelledby={`vertical-tab-with-border-item-${id}`}
                                    >
                                        <img src={img_src} alt="" />

                                        <div className="show_all_collection_btn">
                                            <div className="all_collection_card_btn">
                                                <a className='uppercase text-sm' href={btn_link} >View all</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopCategories;
