'use client'
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';

import { Filter } from 'lucide-react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Lazy loading NewArrival and Footer components
const NewArrival = dynamic(() => import('../components/NewArrival'), {
    suspense: true,
});

const ITEMS_PER_PAGE = 20; // Set items per scroll/page

const page = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        subCategory: null,
        priceRange: null,
        colors: [],
    });

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    // Fetch products from the API using pagination
    const fetchProducts = async (pageNumber = 1) => {
        const { data } = await axios.get(`/api/product?page=${pageNumber}&limit=${ITEMS_PER_PAGE}`);
        return data;
    };

    useEffect(() => {
        // Initial fetch
        fetchProducts().then(newProducts => {
            setProducts(newProducts);
            setFilteredProducts(newProducts);
        });
    }, []);

    // Infinite scroll logic
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
            setPage(prev => prev + 1); // Load the next page
        }
    }, [hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [handleObserver]);

    useEffect(() => {
        if (page > 1) {
            fetchProducts(page).then(newProducts => {
                if (newProducts.length === 0) {
                    setHasMore(false);
                } else {
                    setProducts(prevProducts => [...prevProducts, ...newProducts]);
                    setFilteredProducts(prevFilteredProducts => [...prevFilteredProducts, ...newProducts]);
                }
            });
        }
    }, [page]);

    // Filtering logic
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

    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="All Products" />

            <div className="py-5">
                <div className="container">
                    <div className="product-page">
                        <div className="product-list">
                            {filteredProducts.map(product => (
                                <MemoizedProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
                <div ref={loaderRef} className="loader">
                    {hasMore ? 
                        <div className='flex justify-center items-center gap-2'>
                            <div className="spinner"></div>Loading products...
                        </div>
                     : ''}
                </div>
            </div>

            {/* Suspense for lazy loading components */}
            <Suspense fallback={<div>Loading New Arrivals...</div>}>
                <NewArrival />
            </Suspense>

            <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

// Memoizing ProductCard to avoid unnecessary re-renders
const MemoizedProductCard = React.memo(ProductCard);

export default page;
