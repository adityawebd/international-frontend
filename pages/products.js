'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductsPage({ initialProducts, initialCategories }) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange]);

  const filterProducts = () => {
    let filtered = initialProducts;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange(prevRange => 
      name === 'min' ? [Number(value), prevRange[1]] : [prevRange[0], Number(value)]
    );
  };

  return (
    <div className="flex">
      <aside className="w-1/4 p-4">
        <h2 className="text-xl mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="w-full p-2 border"
          >
            <option value="">All</option>
            {initialCategories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Price Range</label>
          <div className="flex space-x-2">
            <input 
              type="number" 
              name="min" 
              value={priceRange[0]} 
              onChange={handlePriceChange} 
              className="w-1/2 p-2 border"
            />
            <input 
              type="number" 
              name="max" 
              value={priceRange[1]} 
              onChange={handlePriceChange} 
              className="w-1/2 p-2 border"
            />
          </div>
        </div>
      </aside>
      <main className="w-3/4 p-4">
        <h1 className="text-2xl mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="border p-4">
              <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-4"/>
              <h2 className="text-xl">{product.title}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-bold">${product.discountedPrice}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from your API
  const productsResponse = await axios.get('http://194.238.19.190:3001/api/product');
  const categoriesResponse = await axios.get('http://194.238.19.190:3001/api/cat');

  return {
    props: {
      initialProducts: productsResponse.data,
      initialCategories: categoriesResponse.data
    }
  };
}
