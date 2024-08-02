"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "swiper/css";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

const ProductTopbar = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showPopovers, setShowPopovers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then(({ categories, products }) => {
                setCategories(categories);
                setProducts(products);
                setShowPopovers(categories.map(() => false));
            });
    }, []);

    const togglePopover = (index) => {
        setShowPopovers((prev) => {
            const newPopovers = [...prev];
            newPopovers[index] = !newPopovers[index];
            return newPopovers;
        });
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const handleOverlayClick = (e) => {
        // Close modal if click is outside the modal content
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const getCategoryProducts = (categoryId) => {
        return products.filter((product) => product._id === categoryId);
    };
    // getCategoryProducts(selectedCategory)
    const categoryProducts = selectedCategory ? selectedCategory : ['Hey'];
    console.log("categoryProducts: ", categoryProducts)

    return (
        <div>
            <div className="product_topbar py-2">
                <div className="container">
                    <div className="">
                        <div className="z-50 product_topbar_wrapper">
                            {categories.map((category, index) => (
                                <div
                                    key={category._id}
                                    style={{ cursor: 'pointer' }}
                                    className=""
                                    onMouseEnter={() => togglePopover(index)}
                                    onMouseLeave={() => togglePopover(index)}
                                    onClick={() => handleCategoryClick(category._id)}
                                >
                                    <div className="pt_card_parent">
                                        <img
                                            className=""
                                            src={`/assets/image/gift14.jpg`} // Assuming category has an image field
                                            alt={category.name}
                                            width={50}
                                            height={50}
                                        />
                                        <div className="text-black tracking-wider fs-6 text-start px-2">
                                            {category.name.split(' ').map((word, idx) => (
                                                <div key={idx}>{word}</div>
                                            ))}
                                        </div>
                                        <IoIosArrowDown />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <IoIosCloseCircleOutline
                            onClick={closeModal}
                            style={{ cursor: 'pointer', fontSize: '24px' }}
                        />
                        <div className="modal-body">
                            {categoryProducts}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductTopbar;
