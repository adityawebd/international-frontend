import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { select } from "@material-tailwind/react";

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
  const [selectedp, setSelectedp] = useState(null);

  // const handlePropertiesChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedp(selectedValue);
  // };

  console.log("onFilterChanges is ", onFilterChanges);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState("");

  const handlesubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    const subcategory = categories.find((cat) => cat._id === subcategoryId);
    setSelectedsubcategory(subcategory);
    onsubcategoryChange(subcategoryId);
  };

  const handlecategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categori.find((cat) => cat._id === categoryId);
    setSelectedcategory(category);
    oncategoryChange(categoryId);
  };

  // const handlePropertiesChange = (e) => {
  //   const pname = e.target.value;
  //   const pName = categori.find((cat) => cat.name === pname);
  //   setSelectedp(pName);
  // };

  const handlePropertyChange = (e, propertyName) => {
    const { value } = e.target;
    console.log("propertyName in",propertyName)
    onFilterChange(propertyName, value);
  };

  const handlePropertiesChange = (e, propertyName) => {
    const { value } = e.target;
    console.log("propertyName",propertyName)
    onFilterChange(propertyName, value);
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
    setPriceRange([0, 100000]);
    setSortOrder("");
    onsubcategoryChange("");
    onFilterChange("", "");
    onFilterChanges("")
    onPriceChange([0, 100000]);
    onSortChange("");
  };

  console.log("category is", categori);
  // console.log('categories is',categories)

  return (
    <div className="filter_div">
      <div className="categories">
        <div className="subcategory_main">
          <label>Filter</label>

          <select onChange={handlecategoryChange}>
            <option value="">All</option>
            {categori.map((categorys) => (
              <option key={categorys._id} value={categorys._id}>
                {categorys.name}
              </option>
            ))}
          </select>

          {selectedcategory &&
          selectedcategory.properties.map((property) => (
            <div className="subcategory_sub" key={property.name}>
              <label>{property.name}</label>
              <select onChange={(e) => handlePropertyChange(e, property.name)}>
                <option value="">All</option>
                {property.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          
            {/* {selectedcategory &&
              selectedcategory.properties.map((property) => (
                <select onChange={(e) => handlePropertiesChange(e,property.name)}
          >
            <option value="">All</option>
                <option key={property.name} value={property.name}>
                  {property.name}
                </option>
                </select>
              ))} */}
         

          <label>Sub filter</label>

          <select onChange={handlesubcategoryChange}>
            <option value="">All</option>
            {categories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        {selectedsubcategory &&
          selectedsubcategory.property.map((property) => (
            <div className="subcategory_sub" key={property.name}>
              <label>{property.name}</label>
              <select onChange={(e) => handlePropertyChange(e, property.name)}>
                <option value="">All</option>
                {property.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
      </div>

      <div className="price_div">
        <label>Price Range</label>
        <Slider
          range
          min={0}
          max={10000}
          defaultValue={priceRange}
          onChange={handlePriceChange}
        />
        <div className="price_inputs">
          <label>
            Min Price:
            <input
              type="number"
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
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceChange([priceRange[0], Number(e.target.value)])
              }
            />
          </label>
        </div>
      </div>

      <div className="sort_div">
        <label>Sort By</label>
        <select onChange={handleSortChange}>
          <option value="">Newest</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
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
