'use client'
import { useEffect, useState, useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';
import { fetchCategories } from '../../services/categoryService';
import { fetchProducts } from '../../services/productService';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewArrival from '../components/NewArrival'
import Breadcrumbs from '../components/Breadcrumbs'

const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { currency, exchangeRates } = useContext(CurrencyContext);
  const convertedPrice = convertPrice(products.discountedPrice, currency, exchangeRates);
  const convertedActualPrice = convertPrice(products.price, currency, exchangeRates);

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
    <>
      <Navbar />
      <Breadcrumbs page_title="All Product" />

      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="filters_wrapper">
              <select
                className="mb-4"
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
            </div>

            <div className="all_products_container">
              {products.map((product) => (
                <div className="products_card">
                  <a href='' key={product._id}>
                    <figure>
                      <img src={product.images[0]} alt={product.title} />
                    </figure>

                    <div className="card_content">
                      <div className="title">{product.title}</div>
                      {/* <p className="price">Price: ₹{product.price}</p> */}
                      <div className="price">
                        {currency === 'INR' ? '₹' : '$'} {convertPrice(product.discountedPrice, currency, exchangeRates).toFixed(2)} &nbsp;
                        <span>{currency === 'INR' ? '₹' : '$'} {convertPrice(product.price, currency, exchangeRates).toFixed(2)}</span>
                      </div>
                    </div>


                    {/* <p className="mb-2">{product.description}</p> */}
                    {/* {product.images.map((image, index) => ( */}
                    {/* <img key={index} src={image} alt={product.title} className="w-full h-auto mb-2" /> */}
                    {/* ))} */}
                    {/* <div>
                {product.reviews && product.reviews.map((review, index) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <strong>{review.name}</strong>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
                </div> */}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewArrival />
      <Footer />
    </>
  );
};

export default Page;
