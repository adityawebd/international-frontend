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

    const getCategoryProducts = (categoryId) => {
        return products.filter((product) => product.category === categoryId);
    };

    console.log("categories ", categories)
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
                                >
                                    <div className="pt_card_parent">
                                        <Image
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
                                    {showPopovers[index] && (
                                        <div
                                            className="pt_card_child"
                                        >
                                            <div className="col">
                                                <a href={`/allproducts`}>
                                                    <div className="fs-5 fw-600 text-start px-3">{category.name}</div>
                                                </a>
                                                <div className="pt_card_child_wrapper">
                                                    {getCategoryProducts(category._id).map((product) => (
                                                        <div
                                                            key={product._id}
                                                            className="pt_card"
                                                        >
                                                            <a href={`/products/${product._id}`} >
                                                                <Image
                                                                    className=""
                                                                    src={`${product.images[0]}`} // Assuming product has an image field
                                                                    alt={product.title}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                            </a>
                                                            <div className="pt_card_title">{product.title}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTopbar
