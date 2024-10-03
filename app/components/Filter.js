import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoClose } from "react-icons/io5";

const Filter = ({
  categories,
  categori,
  oncategoryChange,
  onsubcategoryChange,
  onFilterChange,
  onFilterChanges,
  onPriceChange,
  onSortChange,
  onClose,
  responsive_filter_ID
}) => {
  //console.log("receiving category is", categories);

  // Set all main accordions open initially
  const [openAccordions, setOpenAccordions] = useState({
    colors: true,
    price: true,
    sort: true,
  });

// Set all nested accordions open initially
  const [openNestedAccordions, setOpenNestedAccordions] = useState({});
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({});

  const toggleAccordion = (accordion) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [accordion]: !prevState[accordion], // Toggle the state for the clicked accordion
    }));
  };

  const toggleNestedAccordion = (categoryIndex, propertyIndex) => {
    const accordionKey = `${categoryIndex}-${propertyIndex}`;
    setOpenNestedAccordions((prevState) => ({
      ...prevState,
      [accordionKey]: !prevState[accordionKey],
    }));
  };

  const handleCheckboxChange = (property, value, checked) => {
    if (checked) {
      onFilterChange(property, value);
    } else {
      onFilterChange(property, null);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onPriceChange(value);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    onSortChange(selectedSortOption);
  };

  const handleCategoryChange = (event) => {
    oncategoryChange(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    onsubcategoryChange(event.target.value);
  };

  const handleResetFilters = () => {
    setFilters({});
    setPriceRange([0, 5000]);
    setSortOption("");

    document.querySelectorAll('.filter-container input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    categories.forEach((category) => {
      category?.property?.forEach((property) => {
        onFilterChange(property.name, null);
      });
    });

    onPriceChange([0, 5000]);
    onSortChange("");
  };

  const allowedProperties = ["Color", "Occasion", "Item Type"];

  return (
    <div className="filter-container">
      <h4 className="text-black text-2xl font-semibold flex items-center justify-between">
        Filters
        <button onClick={onClose} className="d-md-none">
          <IoClose />
        </button>
      </h4>

      {/* Price Range Accordion */}
      <div>
        <div className="accordion border-0 accordion_fixed_div_name" onClick={() => toggleAccordion("price")}>
          <h5>Price Range</h5>
        </div>
        {openAccordions.price && (
          <div className="accordion-content pt-3 border-0 px-3">
            <Slider range min={0} max={5000} defaultValue={priceRange} onChange={handlePriceChange} />
            <div className="price_inputs flex justify-between w-full mt-2">
              <label>
                <span className="text-xs green_font">Min Price:</span>
                <input
                  type="number"
                  className="inline border rounded w-[80px] p-2 mt-2 outline-none"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                />
              </label>
              <label>
                <span className="text-xs green_font">Max Price:</span>
                <input
                  type="number"
                  className="inline border rounded w-[80px] p-2 mt-2 outline-none"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Sort Accordion */}
      <div>
        <div className="accordion border-0 accordion_fixed_div_name" onClick={() => toggleAccordion("sort")}>
          <h5>Sort By</h5>
        </div>
        {openAccordions.sort && (
          <div className="accordion-content border-0 px-3">
            <div className="checkbox-container">
              <select
                onChange={handleSortChange}
                className="select_div no-arrow border px-2 outline-none"
                value={sortOption}
              >
                <option value="">Newest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Category Properties Accordion */}
      <div>
        {categories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category-container">
            {category?.property?.map((property, propertyIndex) => {
              if (!allowedProperties.includes(property?.name)) {
                return null;
              }
              const nestedAccordionKey = `${categoryIndex}-${propertyIndex}`;
              
              return (
                <div key={propertyIndex} className="aditya1">
                  <div
                    className="nested-accordion flex items-center justify-between"
                    onClick={() => toggleNestedAccordion(categoryIndex, propertyIndex)}
                  >
                    <p className="accordion_fixed_div_name" id={responsive_filter_ID}>
                      {property?.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNestedAccordion(categoryIndex, propertyIndex);
                      }}
                      className="toggle-button outline-none"
                      id={propertyIndex}
                    >
                      {openNestedAccordions[nestedAccordionKey] ? "-" : "+"}
                    </button>
                  </div>
                  {openNestedAccordions[nestedAccordionKey] && (
                    <div className="accordion_fixed_div text-gray-500">
                      {property?.values?.map((value, valueIndex) => (
                        <div key={valueIndex} className="aditya2">
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              name={property.name}
                              value={value}
                              className="mt-1"
                              onChange={(e) => handleCheckboxChange(property.name, e.target.value, e.target.checked)}
                            />
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        onClick={handleResetFilters}
        className="reset-filters-button mt-4 px-4 py-2 bg_green text-white rounded"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
