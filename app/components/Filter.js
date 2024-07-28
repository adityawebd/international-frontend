// components/Filter.js

import React, { useState, useEffect } from 'react';

const Filter = ({ categories, onCategoryChange, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find(cat => cat._id === categoryId);
    setSelectedCategory(category);
    onCategoryChange(categoryId);
  };

  const handlePropertyChange = (e, propertyName) => {
    const { value } = e.target;
    onFilterChange(propertyName, value);
  };

  return (
    <div className='avi'>
      <div className='avi1'>
        <label>Category</label>
        <select onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      {selectedCategory && selectedCategory.properties.map(property => (
        <div className='avi1' key={property.name}>
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
  );
};

export default Filter;
