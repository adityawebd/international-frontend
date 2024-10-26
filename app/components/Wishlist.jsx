'use client'
import React, { useState, useEffect } from 'react';
import ProductStockStatus from '../components/ProductStockStatus'; // to get product status data from this components dynamically
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoBagOutline } from "react-icons/io5";


const Wishlist = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch or set your product data here
        const fetchProducts = async () => {
            // Simulate fetching data from the backend
            // Replace this with your actual API call
            const productData = [
                {
                    id: 1,
                    name: 'Diamond Statue',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, doloribus?',
                    price: '₹660',
                    image: 'assets/image/gift15.jpg',
                    stockStatus: 'In Stock',
                },
                {
                    id: 2,
                    name: 'Gold Buddha',
                    description: 'Elegant and beautiful gold necklace. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, doloribus?',
                    price: '₹1,250',
                    image: 'assets/image/gift16.jpg',
                    stockStatus: 'Out of Stock',
                },
            ];

            setProducts(productData);
        };

        fetchProducts();
    }, []);

    const handleDelete = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div>

            <div className="wishlist_page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="table_wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope='col' colSpan='2' className='product'>Product</th>
                                            <th scope='col' className='price'>Price</th>
                                            <th scope='col' className='status'>Stock Status</th>
                                            <th scope='col' className='action'>Action</th>
                                            <th scope='col' className='remove'>Remove</th>
                                        </tr>
                                    </thead>
                                    {products.length > 0 ? (
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.id}>
                                                    <td className='product_img'>
                                                        <img loading='lazy' src={product.image} alt={product.name} />
                                                    </td>
                                                    <td className='product_name'>
                                                        <h3 className='text-xl font-medium green_font'>{product.name}</h3>
                                                        <p className='text-sm'>{product.description}</p>
                                                    </td>
                                                    <td className='product_price'>{product.price}</td>
                                                    <ProductStockStatus stockStatus={product.stockStatus} />
                                                    <td className='product_action'>
                                                        <button
                                                            disabled={product.stockStatus.toLowerCase() === 'out of stock'}
                                                            style={{
                                                                cursor: product.stockStatus.toLowerCase() === 'out of stock' ? 'not-allowed' : 'pointer',
                                                            }}
                                                        >
                                                            <IoBagOutline />&nbsp; Add to Cart
                                                        </button>
                                                    </td>
                                                    <td className='product_delete_btn'>
                                                        <span onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer' }}>
                                                            <RiDeleteBin6Line />
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td colSpan="6" className="text-center p-3">No products in wishlist</td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
