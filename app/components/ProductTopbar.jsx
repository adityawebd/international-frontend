import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

const ProductTopbar = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  // Fetch categories only once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const { categories } = await res.json();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
      }
    };
    fetchCategories();
  }, []);

  // Open/close modal
  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  }, []);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleFilter = useCallback(
    (property) => {
      if (selectedCategory) {
        router.push(`/products/${property}`);
      }
    },
    [selectedCategory, router]
  );

  const categoryData = useCallback(
    categories.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {}),
    [categories]
  );

  return (
    <div>
      <div className="product_topbar py-2">
        <div className="container-auto">
          <div className="z-50 product_topbar_wrapper">
            {categories.map((category) => (
              <div
                key={category._id}
                style={{ cursor: "pointer" }}
                className="pt_card_parent"
                onClick={() => handleCategoryClick(category._id)}
              >
                <img
                  loading="lazy"
                  src={category.image || `/assets/image/gift14.jpg`}
                  alt={category.name}
                  width={50}
                  height={50}
                />
                <div className="text-black tracking-wider fs-6 text-start px-2 topbar_word_wrapper">
                  {category.name.split(" ").map((word, idx) => (
                    <div key={idx} className="topbar_word">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-body">
              {selectedCategory && categoryData[selectedCategory] ? (
                <div>
                  <div className="flex justify-between">
                    <h2 className="category-name">
                      {categoryData[selectedCategory].name}
                    </h2>
                    <button className="mr-2" onClick={closeModal}>
                      ✕
                    </button>
                  </div>

                  <div className="category-subCategory-wrapper">
                    {categoryData[selectedCategory].properties?.map(
                      (property, index) => (
                        <button
                          key={index}
                          className="category-subCategory"
                          onClick={() => handleFilter(property.name)}
                        >
                          {property.name}
                        </button>
                      )
                    )}
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
