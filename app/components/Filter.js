import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = ({
  categories = [],
  onsubcategoryChange,
  onFilterChange,
  onFilterChanges,
  onPriceChange,
  onSortChange,
  categori = [],
  oncategoryChange,
}) => {
  const [selectedsubcategory, setSelectedsubcategory] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState("");
  const [activeAccordions, setActiveAccordions] = useState({
    category: true,
    subcategory: true,
    price: true,
    sort: true,
  });

  useEffect(() => {
    // Initially set all accordions to open
    setActiveAccordions({
      category: true,
      subcategory: true,
      price: true,
      sort: true,
    });
  }, []);

  const toggleAccordion = (accordion) => {
    setActiveAccordions((prev) => ({
      ...prev,
      [accordion]: !prev[accordion],
    }));
  };

  const handlecategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categori.find((cat) => cat._id === categoryId);
    setSelectedcategory(category);
    oncategoryChange(categoryId);
  };

  const handlePropertyChange = (e, propertyName) => {
    const { value, checked } = e.target;
    onFilterChange(propertyName, value, checked);
  };

  const handlePropertiesChange = (e, propertyName) => {
    const { value, checked } = e.target;
    onFilterChanges(propertyName, value, checked);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onPriceChange(range);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedsubcategory(null);
    setSelectedcategory(null);
    setPriceRange([0, 5000]);
    setSortOrder("");
    onsubcategoryChange("");
    onFilterChange("", "");
    onFilterChanges("", "");
    onPriceChange([0, 5000]);
    onSortChange("");
  };

  return (
    <div className="filter_div">
      {/* Category Accordion */}
      <div className="accordion">
        <button
          onClick={() => toggleAccordion("category")}
          className="accordion-button flex justify-between items-center"
        >
          Category
          <span className="accordion-arrow">
            {activeAccordions.category ? "-" : "+"}
          </span>
        </button>
        {activeAccordions.category && (
          <div className="accordion-content">
            <div>
              {/* <label className="filter_label">Category</label> */}
              <div className="checkbox-container">
                {categori.map((categorys) => (
                  <div key={categorys._id} className="flex gap-2 justify-start items-start">
                    <input
                      type="checkbox"
                      className="mt-1"
                      value={categorys._id}
                      onChange={handlecategoryChange}
                    />
                    <label>{categorys.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subcategory Accordion */}
      <div className="accordion">
        <button
          onClick={() => toggleAccordion("subcategory")}
          className="accordion-button flex justify-between items-center"
        >
          Subcategory
          <span className="accordion-arrow">
            {activeAccordions.subcategory ? "-" : "+"}
          </span>
        </button>
        {activeAccordions.subcategory && (
          <div className="accordion-content">
            <div>
              {/* <label className="filter_label">Subcategory</label> */}
              <div className="checkbox-container">
                {categories.map((subcategory) => (
                  <div key={subcategory._id}>
                  <div className="flex gap-2 justify-start items-start">
                    <input
                      type="checkbox"
                      className="mt-1"
                      value={subcategory._id}
                      onChange={() => onsubcategoryChange(subcategory._id)}
                    />
                    <label>{subcategory.name}</label>
                    </div>

                    {/* Displaying all properties and their values by default */}
                    {subcategory.property.map((property) => (
                      <div className="subcategory_sub" key={property.name}>
                        <label className="filter_label">{property.name}</label>
                        <div className="checkbox-container">
                          {property.values.map((value) => (
                            <div key={value} className="flex gap-2 justify-start items-start">
                              <input
                                type="checkbox"
                                className="mt-1"
                                value={value}
                                onChange={(e) =>
                                  handlePropertyChange(e, property.name)
                                }
                              />
                              <label>{value}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="accordion">
        <button
          onClick={() => toggleAccordion("price")}
          className="accordion-button flex justify-between items-center"
        >
          Price
          <span className="accordion-arrow">
            {activeAccordions.price ? "-" : "+"}
          </span>
        </button>
        {activeAccordions.price && (
          <div className="accordion-content pt-3">
            {/* <label className="filter_label">Price Range</label> */}
            <Slider
              range
              min={0}
              max={5000}
              defaultValue={priceRange}
              onChange={handlePriceChange}
            />
            <div className="price_inputs flex justify-between w-full mt-2">
              <label>
                Min Price:
                <input
                  type="number"
                  className="inline border rounded w-[80px] p-2 mt-2 outline-none"
                  value={priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange([Number(e.target.value), priceRange[1]])
                  }
                />
              </label>
              <label>
                Max Price:
                <input
                  type="number"
                  className="inline border rounded w-[80px] p-2 mt-2 outline-none"
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange([priceRange[0], Number(e.target.value)])
                  }
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Sort Accordion */}
      <div className="accordion">
        <button
          onClick={() => toggleAccordion("sort")}
          className="accordion-button flex justify-between items-center"
        >
          Sort By
          <span className="accordion-arrow">
            {activeAccordions.sort ? "-" : "+"}
          </span>
        </button>
        {activeAccordions.sort && (
          <div className="accordion-content">
            {/* <label className="filter_label">Sort By</label> */}
            <div className="checkbox-container">
              <select
                onChange={handleSortChange}
                className="select_div no-arrow"
              >
                <option value="">Newest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button className="reset_button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

Filter.propTypes = {
  categories: PropTypes.array.isRequired,
  categori: PropTypes.array.isRequired,
  onsubcategoryChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterChanges: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Filter;
