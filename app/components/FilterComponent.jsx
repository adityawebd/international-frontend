import { useState } from 'react';
import { categories, subCategories } from '../categories';
import { priceRanges } from '../priceFilter';
import { colors } from '../colors';

const FilterComponent = ({ onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);

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
            <h3 className='text-2xl font-semibold light_black_font'>Categories</h3>
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
                    <h4 className='text-2xl font-semibold light_black_font'>Subcategories</h4>
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

            <h3 className='text-2xl font-semibold light_black_font'>Price</h3>
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

            <h3 className='text-2xl font-semibold light_black_font'>Colors</h3>
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