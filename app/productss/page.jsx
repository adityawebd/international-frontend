'use client'
import { useEffect, useState, useContext } from 'react';
import { CurrencyContext } from '../CurrencyContext';
import { fetchCategoriesAndProducts } from '../../app/services/categoryService'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewArrival from '../components/NewArrival';
import Breadcrumbs from '../components/Breadcrumbs';
import Filter from '../components/Filter';
import { useRouter, useSearchParams } from 'next/navigation';

const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const Page = () => {
  const { currency, exchangeRates } = useContext(CurrencyContext);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const data1 = searchParams.get('category');
  const data2 = searchParams.get('filter');
  
  console.log("data in productsss is ", data1,data2);

  useEffect(() => {
    async function loadData() {
      try {
        const { categories, products } = await fetchCategoriesAndProducts();
        setCategories(categories);
        setProducts(products);
        setFilteredProducts(products);

        // Apply filters based on URL data
        if (data1,data2) {
          // const parsedData = JSON.parse(data); // Assuming `data` is JSON string
          if (data1) setSelectedCategory(data1) 
          // if (data2) setFilters(data1);
          // if (parsedData.priceRange) setPriceRange(parsedData.priceRange);
          // if (parsedData.sortOrder) setSortOrder(parsedData.sortOrder);
          console.log("url id is",data1,data2)
        }
      } catch (error) {
        console.error('Failed to fetch categories and products:', error);
      }
    }

    loadData();
  }, [data1,data2]);

  useEffect(() => {
    applyFilters(filters);
  }, [selectedCategory, filters, products, priceRange, sortOrder]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters({});
  };

  const handleFilterChange = (propertyName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [propertyName]: value }));
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
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

    filtered = filtered.filter(product => {
      const price = convertPrice(product.discountedPrice, currency, exchangeRates);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs page_title="All Product" />
      <div className='container'>
        <div className="row">
          <div className="col-md-3 py-4">
            <Filter
              categories={categories}
              onCategoryChange={handleCategoryChange}
              onFilterChange={handleFilterChange}
              onPriceChange={handlePriceChange}
              onSortChange={handleSortChange}
            />
          </div>
          <div className="col-md-9">
            <div className="container py-4">
              <div className="row">
                <div className="col-md-12 p-0">
                  <div className='all_products_container'>
                    <div className="product-list">
                      {filteredProducts.map(product => (
                        <div key={product._id} className="products_card">
                          <a href={`/product/${product._id}`}>
                            <figure>
                              <img className='rounded-2xl' src={product.images[0]} alt={product.title} />
                            </figure>
                            <div className='card_content'>
                              <div className="title">{product.title}</div>
                              <div className="price">
                                {currency === 'INR' ? '₹' : '$'} {convertPrice(product.discountedPrice, currency, exchangeRates).toFixed(2)} &nbsp;
                                <span>{currency === 'INR' ? '₹' : '$'} {convertPrice(product.price, currency, exchangeRates).toFixed(2)}</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
