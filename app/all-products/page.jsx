'use client'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';

import FilterComponent from '../components/FilterComponent';
import ProductCard from '../components/ProductCard';

import { Filter } from 'lucide-react'
import axios from 'axios';
// dynamic product data
// const products = [
//     {
//         id: 1,
//         name: 'Ganesha Idol',
//         category: 'Religious Idol',
//         subCategory: 'Ganesha Idol',
//         discounted_price: '50',
//         actual_price: '100',
//         color: 'Red',
//         image: 'https://www.internationalgift.in/assets/upload/25.jpeg',
//         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?',
//         link: '/product'
//     },
//     { id: 2, name: 'Shiva Idol', category: 'Religious Idol', subCategory: 'Shiva Idol', discounted_price: 150, actual_price: '100', color: 'Blue', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 3, name: 'Parvati idol', category: 'Religious Idol', subCategory: 'Parvati Idol', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },

//     { id: 4, name: 'Golden Duck Oxidized Metal', category: 'Decorative Item', subCategory: 'Duck', discounted_price: 1050, actual_price: '100', color: 'Golden', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 5, name: 'Ganesha Wall Hanging Idol Oil', category: 'Decorative Item', subCategory: 'Wall Hanging', discounted_price: 750, actual_price: '100', color: 'Silver', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 6, name: 'Golden Horse Oxidized Metal Gold', category: 'Decorative Item', subCategory: 'Horse', discounted_price: 2550, actual_price: '100', color: 'Pink', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },

//     { id: 7, name: 'German Silver Round Bowl Set', category: 'Dry Fruit Bowl', subCategory: 'Cashew & Almod', discounted_price: 750, actual_price: '100', color: 'Golden', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 8, name: 'German Silver Brass Round Almond Bowl', category: 'Dry Fruit Bowl', subCategory: 'Almond', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 9, name: 'German Silver Brass Round Bowl', category: 'Dry Fruit Bowl', subCategory: 'Cashew & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 10, name: 'German Silver Brass Round Cashew Bowl', category: 'Dry Fruit Bowl', subCategory: 'Cashew', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 11, name: 'German Silver Brass Round Raisin Bowl', category: 'Dry Fruit Bowl', subCategory: 'Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 12, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 13, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 14, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 15, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 16, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 17, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 18, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 19, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 20, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 21, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 22, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 23, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     { id: 24, name: 'Golden Brass Round Bowl Raisin', category: 'Dry Fruit Bowl', subCategory: 'Almond & Raisin', discounted_price: 750, actual_price: '100', color: 'Orange', image: 'https://www.internationalgift.in/assets/upload/25.jpeg', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?', link: '/product' },
//     // Add more products here
// ];

const page = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        subCategory: null,
        priceRange: null,
        colors: [],
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/product').then(response => {
            setProducts(response.data);
        });
    }, []);
    // const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        let filtered = products;

        if (filters.category !== 'All') {
            filtered = filtered.filter(product => product.category === filters.category);
            if (filters.subCategory) {
                filtered = filtered.filter(product => product.subCategory === filters.subCategory);
            }
        }

        if (filters.priceRange) {
            filtered = filtered.filter(product =>
                product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
            );
        }

        if (filters.colors.length > 0) {
            filtered = filtered.filter(product => filters.colors.includes(product.color));
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
        document.body.classList.toggle('filter-active', !isFilterVisible); {/* for mobile device black overlay */ }
    };


    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="All Products" />

            <div className="py-5">
                <div className="container">

                    <div className="product-page">
                        {/* <FilterComponent onFilterChange={handleFilterChange} /> */}
                        {/* for mobile device black overlay */}
                        {/* <div className={`filter-overlay ${isFilterVisible ? 'show' : ''}`} onClick={toggleFilterVisibility} /> 
                        <div className={`filter-component-div ${isFilterVisible ? 'show' : ''}`}>
                            <FilterComponent onFilterChange={handleFilterChange} />
                        </div>
                        <div className="filter-icon" onClick={toggleFilterVisibility}>
                            <span><Filter /> All Filters</span>
                        </div> */}

                        <div className="product-list">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            <NewArrival />
            <Footer />
        </div>
    )
}

export default page
