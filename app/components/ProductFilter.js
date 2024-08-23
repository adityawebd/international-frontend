// components/ProductFilter.js

import { useState } from 'react';

export default function ProductFilter({ filters, setFilters, products }) {
  return (
    <div className="filters">
      <label>
        Discounted Price:
        <input
          type="number"
          value={filters.discountedPrice}
          onChange={(e) =>
            setFilters({ ...filters, discountedPrice: e.target.value })
          }
        />
      </label>

      <label>
        Category:
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {Array.from(
            new Set(products.map((product) => product.category))
          ).map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
