// pages/index.js or pages/products.js

import React, { useState,useEffect  } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    applyFilters(filters);
  }, [selectedCategory, filters]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters({});
  };

  const handleFilterChange = (propertyName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [propertyName]: value }));
  };

  const applyFilters = (filters) => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    Object.keys(filters).forEach(propertyName => {
      if (filters[propertyName]) {
        filtered = filtered.filter(product => {
          return product.properties?.[propertyName] === filters[propertyName];
        });
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Filter categories={categories} onCategoryChange={handleCategoryChange} onFilterChange={handleFilterChange} />
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <ul>
              {product.properties && Object.entries(product.properties).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
