"use client";
import { Suspense, useEffect, useState, useContext, useRef } from "react";
import { CurrencyContext } from "../../CurrencyContext";
import { fetchCategoriesAndProducts } from "../../services/subcategoryService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewArrival from "../../components/NewArrival";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import FilterHorizontal from "../../components/FilterHorizontal";
import BackToTopButton from "../../components/BackToTopButton";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa6";

const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};

const ProductContent = ({ urldata }) => {
  const { currency, exchangeRates } = useContext(CurrencyContext);

  const [categories, setCategories] = useState([]);
  const [categori, setCategori] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedsubcategory, setSelectedsubcategory] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [properties, setProperties] = useState(null);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const data1 = searchParams.get("category");
  const data2 = searchParams.get("filter");

  //console.log("data in productss is ", data1, data2);
  const product = urldata;

  useEffect(() => {
    async function loadData() {
      try {
        const { categories, products, categori } =
          await fetchCategoriesAndProducts({ product });

        // Extract the subcategory IDs from the products
        const subcategoryIds = products.map((product) => product.subcategory);

        // Filter the categories to include only those that have products
        const filteredCategories = categories.filter((category) =>
          subcategoryIds.includes(category._id)
        );

        setCategories(filteredCategories); // Set only the filtered categories
        setCategori(categori);
        setProducts(products);
        setFilteredProducts(products);

        // Apply filters based on URL data
        if (data1 || data2) {
          if (data1) setSelectedsubcategory(data1);
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

  // const handleFilterChange = (propertyName, value  ) => {
  //   setFilters(prevFilters => ({ ...prevFilters, [propertyName]: value }));

  //   //console.log("data in handleFilterChange is ",propertyName, value)
  // };

  const handleFilterChange = (propertyName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [propertyName]: value,
    }));

    //console.log("Updated Filters: ", propertyName, value);
  };

  // const handleFilterChange = (propertyName, value) => {
  //   setFilters(prevFilters => {
  //     // Clone the previous state
  //     const updatedFilters = { ...prevFilters };

  //     // If the property already exists
  //     if (updatedFilters[propertyName]) {
  //       // If you want to allow only one value per property, replace the value
  //       updatedFilters[propertyName] = value;

  //       // Uncomment the below lines if you want to manage multiple values per property
  //       if (Array.isArray(updatedFilters[propertyName])) {
  //         // Toggle value or add it to the list if it doesn't exist
  //         if (updatedFilters[propertyName].includes(value)) {
  //           updatedFilters[propertyName] = updatedFilters[propertyName].filter(val => val !== value);
  //         } else {
  //           updatedFilters[propertyName].push(value);
  //         }
  //       } else {
  //         updatedFilters[propertyName] = [value];
  //       }
  //     } else {
  //       // Add the new property and value
  //       updatedFilters[propertyName] = value;
  //     }

  //     return updatedFilters;
  //   });

  //   //console.log("Updated Filters:", propertyName, value);
  // };

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

    // Object.keys(filters).forEach(propertyName => {
    //   if (filters[propertyName]) {
    //     filtered = filtered.filter(product => {
    //       //console.log("filterde property is",propertyName,filters[propertyName])
    //       return product.property?.[propertyName] === filters[propertyName];
    //     });
    //   }
    // });

    Object.keys(filters).forEach((propertyName) => {
      if (filters[propertyName]) {
        filtered = filtered.filter((product) => {
          const productValue = product.property?.[propertyName];

          // Log to debug and verify data
          //console.log("Filtering by property:", propertyName, "Filter value:", filters[propertyName], "Product value:", productValue);

          // Handle single value or array of values
          if (Array.isArray(filters[propertyName])) {
            // Check if productValue is included in filters[propertyName] array
            return filters[propertyName].includes(productValue);
          } else {
            // For single value, check direct equality
            return productValue === filters[propertyName];
          }
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

  //   const applyFilters = (filters) => {
  //   let filtered = products;

  //   if (selectedsubcategory) {
  //     filtered = filtered.filter(product => product.subcategory === selectedsubcategory);
  //   }

  //   if (selectedcategory) {
  //     filtered = filtered.filter(product => product.category === selectedcategory);
  //   }

  //   if (filters.color) {
  //     filtered = filtered.filter(product => product.color === filters.color);
  //   }

  //   if (filters.material) {
  //     filtered = filtered.filter(product => product.material === filters.material);
  //   }

  //   if (filters.occasion) {
  //     filtered = filtered.filter(product => product.occasion === filters.occasion);
  //   }

  //   if (filters.size) {
  //     filtered = filtered.filter(product => product.size === filters.size);
  //   }

  //   filtered = filtered.filter(product => {
  //     const price = convertPrice(product.discountedPrice, currency, exchangeRates);
  //     return price >= priceRange[0] && price <= priceRange[1];
  //   });

  //   if (sortOrder === 'asc') {
  //     filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
  //   } else if (sortOrder === 'desc') {
  //     filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
  //   }

  //   setFilteredProducts(filtered);
  // };

  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };
  useEffect(() => {
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const handleFilterClose = () => {
    setShowFilter(true); // Close the filter component
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 overflow-hidden overflow-x-auto">
          <div className="horizontal_filter flex items-center">
            <button
              className="reset_button d-md-none flex items-center gap-2 rounded my-4"
              onClick={toggleFilter}
            >
              {/* {showFilter ? "Hide Filter" : "Show Filter"} */}
              <FaFilter />
              Filter
            </button>
            <FilterHorizontal
              categories={categories}
              categori={categori}
              onFilterButtonClick={handleFilterClose}
              onClick={toggleFilter}
            />
          </div>
          <div
            ref={filterRef}
            className={`filter-page-container ${
              showFilter ? "show" : ""
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
              onClose={toggleFilter} // Pass the close handler
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
  );
};

const Page = ({ params }) => {
  const urldata = decodeURIComponent(params.productsid);
  return (
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
        <ProductContent urldata={urldata} />
      </Suspense>
      <NewArrival />
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default Page;
