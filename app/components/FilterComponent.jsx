import { useState, useEffect } from 'react';
import axios from 'axios';

const FilterComponent = ({ onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);

    useEffect(() => {
        axios.get('/api/cat').then(response => {
            setCategories(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedCategory !== 'All') {
            const category = categories.find(cat => cat.name === selectedCategory);
            if (category) {
                setSubCategories(category.properties);
            } else {
                setSubCategories([]);
            }
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        if (selectedSubCategory) {
            const category = categories.find(cat => cat.name === selectedCategory);
            const subCategory = category?.properties.find(prop => prop.name === selectedSubCategory);
            setProperties(subCategory?.values || []);
        } else {
            setProperties([]);
        }
    }, [selectedSubCategory, categories, selectedCategory]);

    useEffect(() => {
        // Fetch products to determine price ranges
        axios.get('/api/product').then(response => {
            const products = response.data;
            const minPrice = Math.min(...products.map(product => product.price));
            const maxPrice = Math.max(...products.map(product => product.price));

            // Set price ranges. Adjust this range as needed.
            setPriceRanges([
                { label: 'Under ₹200', min: 0, max: 100 },
                { label: '₹200 to ₹500', min: 200, max: 500 },
                { label: '₹500 to ₹1000', min: 500, max: 1000 },
                { label: '₹1000 to ₹5000', min: 1000, max: 5000 },
                { label: 'Above ₹5000', min: 5000, max: maxPrice }
            ]);
        });
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
        setSelectedPriceRange(null);
        setSelectedColors([]);
        onFilterChange({ category, subCategory: null, priceRange: null, colors: [] });
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        onFilterChange({ category: selectedCategory, subCategory, priceRange: selectedPriceRange, colors: selectedColors });
    };

    const handlePriceRangeChange = (priceRange) => {
        setSelectedPriceRange(priceRange);
        onFilterChange({ category: selectedCategory, subCategory: selectedSubCategory, priceRange, colors: selectedColors });
    };

    const handleColorChange = (color) => {
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter(c => c !== color)
            : [...selectedColors, color];
        setSelectedColors(newColors);
        onFilterChange({ category: selectedCategory, subCategory: selectedSubCategory, priceRange: selectedPriceRange, colors: newColors });
    };

    const resetFilters = () => {
        setSelectedCategory('All');
        setSelectedSubCategory(null);
        setSelectedPriceRange(null);
        setSelectedColors([]);
        onFilterChange({ category: 'All', subCategory: null, priceRange: null, colors: [] });
    };

    return (
        <div className="filter-component">
            <h3 className="text-2xl font-semibold light_black_font">Categories</h3>
            <div>
                {categories.map(category => (
                    <label key={category._id}>
                        <input
                            type="radio"
                            name="category"
                            value={category.name}
                            checked={selectedCategory === category.name}
                            onChange={() => handleCategoryChange(category.name)}
                        />
                        {category.name}
                    </label>
                ))}
            </div>

            {selectedCategory !== 'All' && (
                <>
                    <h4 className="text-2xl font-semibold light_black_font">Subcategories</h4>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="subcategory"
                                value=""
                                checked={selectedSubCategory === null}
                                onChange={() => handleSubCategoryChange(null)}
                            />
                            All
                        </label>
                        {subCategories.map(prop => (
                            <label key={prop.name}>
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value={prop.name}
                                    checked={selectedSubCategory === prop.name}
                                    onChange={() => handleSubCategoryChange(prop.name)}
                                />
                                {prop.name}
                            </label>
                        ))}
                    </div>
                </>
            )}

            {selectedSubCategory && properties.length > 0 && (
                <>
                    <h4 className="text-2xl font-semibold light_black_font">Properties</h4>
                    <div>
                        {properties.map(value => (
                            <label key={value}>
                                <input
                                    type="checkbox"
                                    checked={selectedColors.includes(value)}
                                    onChange={() => handleColorChange(value)}
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                </>
            )}

            <h3 className="text-2xl font-semibold light_black_font">Price</h3>
            <div>
                {priceRanges.map(range => (
                    <label key={range.label}>
                        <input
                            type="radio"
                            name="price"
                            value={range.label}
                            checked={selectedPriceRange?.label === range.label}
                            onChange={() => handlePriceRangeChange(range)}
                        />
                        {range.label}
                    </label>
                ))}
<<<<<<< HEAD
            </div> */}

            <h3 className="text-2xl font-semibold light_black_font">Colors</h3>
            {/* <div>
                {colors.map(color => (
                    <label key={color}>
                        <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => handleColorChange(color)}
                        />
                        {color}
                    </label>
                ))}
            </div> */}
=======
            </div>
>>>>>>> 91f9c42de19bd4225224f1ccf5b7a4b52d906e5e

            <button onClick={resetFilters}>Reset Filters</button>
        </div>
    );
};

export default FilterComponent;
