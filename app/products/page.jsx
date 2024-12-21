"use client";
import { Suspense, useEffect, useState, useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";
import { fetchCategoriesAndProducts } from "../services/subcategoryService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewArrival from "../components/NewArrival";
import Breadcrumbs from "../components/Breadcrumbs";
import Filter from "../components/Filter";
import BackToTopButton from "../components/BackToTopButton";
import { useRouter, useSearchParams } from "next/navigation";

const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const ProductContent = () => {
  const { currency, exchangeRates } = useContext(CurrencyContext);

  const [categories, setCategories] = useState([]);
  const [categori, setCategori] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedsubcategory, setSelectedsubcategory] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [properties, setProperties] = useState(null);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const data1 = searchParams.get("category");
  const data2 = searchParams.get("filter");

  //console.log("data in productss is ", data1, data2);
  const product = "data 1";

  useEffect(() => {
    async function loadData() {
      try {
        const { categories, products, categori } =
          await fetchCategoriesAndProducts({ product });
        setCategories(categories);
        setCategori(categori);
        setProducts(products);
        setFilteredProducts(products);

        // Apply filters based on URL data
        if (data1 || data2) {
          // const parsedData = JSON.parse(data); // Assuming data is JSON string
          if (data1) setSelectedsubcategory(data1);
          // if (data2) setProperties(data2);
          // if (parsedData.priceRange) setPriceRange(parsedData.priceRange);
          // if (parsedData.sortOrder) setSortOrder(parsedData.sortOrder);
          //console.log("url id is", data1, data2);
        }
      } catch (error) {
        console.error("Failed to fetch categories and products:", error);
      }
    }

    loadData();
  }, [data1, data2]);

  //console.log("data from api",categori)

  useEffect(() => {
    applyFilters(filters);
  }, [
    selectedsubcategory,
    selectedcategory,
    properties,
    filters,
    products,
    priceRange,
    sortOrder,
  ]);

  const handlesubcategoryChange = (subcategoryId) => {
    setSelectedsubcategory(subcategoryId);
    setFilters({});
  };

  const handlecategoryChange = (categoryId) => {
    setSelectedcategory(categoryId);
    setFilters({});
  };

  const handleFilterChanges = (value) => {
    setProperties(value);
    setFilters({});
  };

  const handleFilterChange = (propertyName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [propertyName]: value }));

    //console.log("data in handleFilterChange is ",propertyName, value)
  };

  // const handleFilterChanges = ( value  ) => {

  //   //console.log("data in handleFilterChanges is ", value )
  //   setFilters(prevFilters => ({ ...prevFilters, value }));

  // };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const applyFilters = (filters) => {
    let filtered = products;

    if (selectedsubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedsubcategory
      );
    }

    if (selectedcategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedcategory
      );
    }

    if (properties) {
      filtered = filtered.filter(
        (product) => product.properties === properties
      );
    }

    Object.keys(filters).forEach((propertyName) => {
      if (filters[propertyName]) {
        filtered = filtered.filter((product) => {
          //console.log("filterde property is",propertyName)
          return product.property?.[propertyName] === filters[propertyName];
        });
      }
    });

    filtered = filtered.filter((product) => {
      const price = convertPrice(
        product.discountedPrice,
        currency,
        exchangeRates
      );
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    setFilteredProducts(filtered);
  };

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 py-4">
            <button className="btn btn-primary" onClick={toggleFilter}>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
            <div
              className={`filter-page-container ${
                showFilter ? "d-block" : "d-none"
              } d-md-block`}
            >
              <Filter
                categories={categories}
                categori={categori}
                oncategoryChange={handlecategoryChange}
                onsubcategoryChange={handlesubcategoryChange}
                onFilterChange={handleFilterChange}
                onFilterChanges={handleFilterChanges}
                onPriceChange={handlePriceChange}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
          <div className="col-md-10">
            <div className="container py-4">
              <div className="row">
                <div className="col-md-12 p-0">
                  <div className="all_products_container">
                    <div className="product-list">
                      {filteredProducts.map((product) => (
                        <div key={product._id} className="products_card">
                          <a href={`/product/${product._id}`}>
                            <figure>
                              <img
                                loading="lazy"
                                className="rounded-2xl"
                                src={product.images[0]}
                                alt={product.title}
                              />
                            </figure>
                            <div className="card_content">
                              <div className="title">{product.title}</div>
                              <div className="price">
                                {currency === "INR" ? "₹" : "$"}{" "}
                                {convertPrice(
                                  product.discountedPrice,
                                  currency,
                                  exchangeRates
                                ).toFixed(2)}{" "}
                                &nbsp;
                                <span>
                                  {currency === "INR" ? "₹" : "$"}{" "}
                                  {convertPrice(
                                    product.price,
                                    currency,
                                    exchangeRates
                                  ).toFixed(2)}
                                </span>
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
    </>
  );
};

const Page = () => (
  <>
    <Navbar />
    <Breadcrumbs page_title="All Product" />
    <Suspense
      fallback={
        <div className="flex gap-2 justify-center items-center h-64">
          <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
          <p className="ml-4 green_font text-sm mt-1">Loading...</p>
        </div>
      }
    >
      <ProductContent />
    </Suspense>
    <NewArrival />
    <Footer />
    <BackToTopButton />
  </>
);

export default Page;
