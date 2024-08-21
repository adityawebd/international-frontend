import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter = ({ categories = [], onsubcategoryChange, onFilterChange, onPriceChange, onSortChange }) => {
  const [selectedsubcategory, setSelectedsubcategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState('');

  

  const handlesubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    const subcategory = categories.find(cat => cat._id === subcategoryId);
    setSelectedsubcategory(subcategory);
    onsubcategoryChange(subcategoryId);
  };

  const handlePropertyChange = (e, propertyName) => {
    const { value } = e.target;
    onFilterChange(propertyName, value);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onPriceChange(range);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedsubcategory(null);
    setPriceRange([0, 100000]);
    setSortOrder('');
    onsubcategoryChange('');
    onFilterChange('', '');
    onPriceChange([0, 100000]);
    onSortChange('');
  };

  return (
    <div className='filter_div'>
      <div className='categories'>
        <div className='subcategory_main'>
          <label>subcategory</label>
          <select onChange={handlesubcategoryChange}>
            <option value="">All</option>
            {categories.map(subcategory => (
              <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
            ))}
          </select>
        </div>

        {selectedsubcategory && selectedsubcategory.property.map(property => (
          <div className='subcategory_sub' key={property.name}>
            <label>{property.name}</label>
            <select onChange={(e) => handlePropertyChange(e, property.name)}>
              <option value="">All</option>
              {property.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className='price_div'>
        <label>Price Range</label>
        <Slider
          range
          min={0}
          max={10000}
          defaultValue={priceRange}
          onChange={handlePriceChange}
        />
        <div className='price_inputs'>
          <label>Min Price:
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
            />
          </label>
          <label>Max Price:
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
            />
          </label>
        </div>
      </div>

      <div className='sort_div'>
        <label>Sort By</label>
        <select onChange={handleSortChange}>
          <option value="">Newest</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <button className='reset_button' onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
  onsubcategoryChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Filter;
