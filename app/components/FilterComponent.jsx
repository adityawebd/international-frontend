import { useState, useEffect } from 'react';
import axios from 'axios';

// Define your static data
const priceRanges = [
    { label: 'Below $10', value: [0, 10] },
    { label: '$10 - $50', value: [10, 50] },
    { label: '$50 - $100', value: [50, 100] },
    { label: 'Above $100', value: [100, Infinity] },
];

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'];

// Custom hook to fetch categories and subcategories
const useCategoriesAndSubCategories = () => {
    const [categories, setCategories] = useState(['All']);
    const [subCategories, setSubCategories] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/cat');
                const productData = response.data;

                const categoryNames = productData.map(item => item.name);
                setCategories(['All', ...categoryNames]);

                const subCategoryMap = productData.reduce((acc, item) => {
                    acc[item.name] = item.properties.map(property => property.name);
                    return acc;
                }, {});
                setSubCategories(subCategoryMap);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    return { categories, subCategories };
};

// Main filter component
const FilterComponent = ({ onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const { categories, subCategories } = useCategoriesAndSubCategories();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
        onFilterChange({ category, subCategory: null, priceRange: selectedPriceRange, colors: selectedColors });
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
                    <label key={category}>
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                    </label>
                ))}
            </div>

            {selectedCategory !== 'All' && subCategories[selectedCategory] && (
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
                        {subCategories[selectedCategory].map(sub => (
                            <label key={sub}>
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value={sub}
                                    checked={selectedSubCategory === sub}
                                    onChange={() => handleSubCategoryChange(sub)}
                                />
                                {sub}
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
                            checked={selectedPriceRange === range}
                            onChange={() => handlePriceRangeChange(range)}
                        />
                        {range.label}
                    </label>
                ))}
            </div>

            <h3 className="text-2xl font-semibold light_black_font">Colors</h3>
            <div>
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
            </div>

            <button onClick={resetFilters}>Reset Filters</button>
        </div>
    );
};

export default FilterComponent;
