// pages/index.js or pages/products.js

import React, { useState } from "react";
import Filter from "../app/components/Filter";

export async function getStaticProps() {
  const categoryRes = await fetch("http://localhost:3001/api/categories");
  const productRes = await fetch("http://localhost:3001/api/products");

  const categories = await categoryRes.json();
  const products = await productRes.json();

  return {
    props: {
      categories,
      products,
    },
  };
}
const ProductsPage = ({ categories, products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (propertyName, value) => {
    const newFilters = { ...filters, [propertyName]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = products;
    Object.keys(filters).forEach((propertyName) => {
      if (filters[propertyName]) {
        filtered = filtered.filter((product) => {
          return product.properties?.[propertyName] === filters[propertyName];
        });
      }
    });
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="avi">
        <Filter categories={categories} onFilterChange={handleFilterChange} />
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
