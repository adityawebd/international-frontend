import React, { useEffect, useState } from "react";
import Image from "next/image";
import "swiper/css";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useRouter } from 'next/navigation';

const ProductTopbar = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showPopovers, setShowPopovers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleFilter = (property) => {
        if (selectedCategory) {
            router.push(`/products?category=${selectedCategory}&filter=${property}`);
        }
    };

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
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const handleButtonClick = (category) => {
        setSelectedCategory(category._id);
    };

    const categoryData = categories.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
    }, {});

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
                                    <button className="pt_card_parent" onClick={() => handleButtonClick(category)}>
                                        <img
                                            className=""
                                            src={`/assets/image/gift14.jpg`} // Assuming category has an image field
                                            alt={category.name}
                                            width={50}
                                            height={50}
                                        />
                                        <div className="text-black tracking-wider fs-6 text-start px-2">
                                            {category.name.split(' ').map((word, idx) => (
                                                <div key={idx} className="topbar_word">{word}</div>
                                            ))}
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <div className="modal-body">
                            {selectedCategory && categoryData[selectedCategory] ? (
                                <div>
                                    <h2 className="category-name">{categoryData[selectedCategory].name}</h2>
                                    <div className="category-subCategory-wrapper">
                                        {categoryData[selectedCategory].properties?.map((property, index) => (
                                            <button
                                                key={index}
                                                className="category-subCategory"
                                                onClick={() => handleFilter(property.values[0])}
                                            >
                                                {property.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p>Select a category to view data</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTopbar;
