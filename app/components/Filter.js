// components/Filter.js

import React from 'react';

const Filter = ({ categories, onFilterChange }) => {
  const handleFilterChange = (e, propertyName) => {
    const { value } = e.target;
    onFilterChange(propertyName, value);
  };

  return (
    <div className='flex avi'>
      {categories.map(category => (
        category.properties.map(property => (
          <div className='avi1' key={property.name}>
            <label>{property.name}</label>
            <select onChange={(e) => handleFilterChange(e, property.name)}>
              <option value="">All</option>
              {property.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))
      ))}
    </div>
  );
};

export default Filter;
