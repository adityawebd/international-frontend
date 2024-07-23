'use client'
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/categoryService';
import { fetchProducts } from '../../services/productService';

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      if (selectedCategory) {
        const filteredProducts = productsData.filter(
          product => product.category === selectedCategory
        );
        setProducts(filteredProducts);
      } else {
        setProducts(productsData);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <select
        className="mb-4 p-2 border rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value=''>All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="mb-2">{product.description}</p>
            <p className="mb-2">Price: ${product.price}</p>
            <div className="mb-2">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={product.title} className="w-full h-auto mb-2" />
              ))}
            </div>
            <div>
              {product.reviews && product.reviews.map((review, index) => (
                <div key={index} className="border-t pt-2 mt-2">
                  <strong>{review.name}</strong>
                  <p>Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
