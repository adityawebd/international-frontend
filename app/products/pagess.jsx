// pages/products/index.js
'use client'
import { useState, useEffect } from 'react';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    discountedPrice: '',
    category: '',
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        const products = response.data;

        // Fetch category details for each product
        const categories = await Promise.all(
          products.map((product) =>
            axios.get(`/api/category?_id=${product.category}`)
          )
        );

        const productsWithCategory = products.map((product, index) => ({
          ...product,
          categoryDetails: categories[index].data,
        }));

        setProducts(productsWithCategory);
        setFilteredProducts(productsWithCategory);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (filters.discountedPrice) {
        filtered = filtered.filter((product) =>
          Number(product.discountedPrice) <= Number(filters.discountedPrice)
        );
      }

      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.categoryDetails.name === filters.category
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products]);

  return (
    <div>
      <h1>Products</h1>
      <ProductFilter filters={filters} setFilters={setFilters} products={products} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
