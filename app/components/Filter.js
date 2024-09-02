// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const Filter = ({
//   categories = [],
//   onsubcategoryChange,
//   onFilterChange,
//   onFilterChanges,
//   onPriceChange,
//   onSortChange,
//   categori = [],
//   oncategoryChange,
// }) => {
//   const [selectedsubcategory, setSelectedsubcategory] = useState(null);
//   const [selectedcategory, setSelectedcategory] = useState(null);
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [sortOrder, setSortOrder] = useState("");
//   const [activeAccordions, setActiveAccordions] = useState({
//     category: true,
//     subcategory: true,
//     price: true,
//     sort: true,
//   });

//   useEffect(() => {
//     // Initially set all accordions to open
//     setActiveAccordions({
//       category: true,
//       subcategory: true,
//       price: true,
//       sort: true,
//     });
//   }, []);

//   const toggleAccordion = (accordion) => {
//     setActiveAccordions((prev) => ({
//       ...prev,
//       [accordion]: !prev[accordion],
//     }));
//   };

//   const handlecategoryChange = (e) => {
//     const categoryId = e.target.value;
//     const category = categori.find((cat) => cat._id === categoryId);
//     setSelectedcategory(category);
//     oncategoryChange(categoryId);
//   };

//   const handlePropertyChange = (e, propertyName) => {
//     const { value, checked } = e.target;
//     onFilterChange(propertyName, value, checked);
//   };

//   const handlePropertiesChange = (e, propertyName) => {
//     const { value, checked } = e.target;
//     onFilterChanges(propertyName, value, checked);
//   };

//   const handlePriceChange = (range) => {
//     setPriceRange(range);
//     onPriceChange(range);
//   };

//   const handleSortChange = (e) => {
//     onSortChange(e.target.value);
//   };

//   const handleResetFilters = () => {
//     setSelectedsubcategory(null);
//     setSelectedcategory(null);
//     setPriceRange([0, 5000]);
//     setSortOrder("");
//     onsubcategoryChange("");
//     onFilterChange("", "");
//     onFilterChanges("", "");
//     onPriceChange([0, 5000]);
//     onSortChange("");
//   };

//   return (
//     <div className="filter_div " onLoad={handleResetFilters}>
//       {/* Category Accordion */}
//       <div className="accordion">
//         <button
//           onClick={() => toggleAccordion("category")}
//           className="accordion-button flex justify-between items-center"
//         >
//           Category
//           <span className="accordion-arrow">
//             {activeAccordions.category ? "-" : "+"}
//           </span>
//         </button>
//         {activeAccordions.category && (
//           <div className="accordion-content">
//             <div>
//               {/* <label className="filter_label">Category</label> */}
//               <div className="checkbox-container">
//                 {categori.map((categorys) => (
//                   <div key={categorys._id} className="flex gap-2 justify-start items-start">
//                     <input
//                       type="checkbox"
//                       className="mt-1"
//                       value={categorys._id}
//                       onChange={handlecategoryChange}
//                     />
//                     <label>{categorys.name}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Subcategory Accordion */}
//       <div className="accordion">
//         <button
//           onClick={() => toggleAccordion("subcategory")}
//           className="accordion-button flex justify-between items-center"
//         >
//           Subcategory
//           <span className="accordion-arrow">
//             {activeAccordions.subcategory ? "-" : "+"}
//           </span>
//         </button>
//         {activeAccordions.subcategory && (
//           <div className="accordion-content">
//             <div>
//               {/* <label className="filter_label">Subcategory</label> */}
//               <div className="checkbox-container">
//                 {categories.map((subcategory) => (
//                   <div key={subcategory._id}>
//                   <div className="flex gap-2 justify-start items-start">
//                     <input
//                       type="checkbox"
//                       className="mt-1"
//                       value={subcategory._id}
//                       onChange={() => onsubcategoryChange(subcategory._id)}
//                     />
//                     <label>{subcategory.name}</label>
//                     </div>

//                     {/* Displaying all properties and their values by default */}
//                     {subcategory.property.map((property) => (
//                       <div className="subcategory_sub" key={property.name}>
//                         <label className="filter_label">{property.name}</label>
//                         <div className="checkbox-container">
//                           {property.values.map((value) => (
//                             <div key={value} className="flex gap-2 justify-start items-start">
//                               <input
//                                 type="checkbox"
//                                 className="mt-1"
//                                 value={value}
//                                 onChange={(e) =>
//                                   handlePropertyChange(e, property.name)
//                                 }
//                               />
//                               <label>{value}</label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Price Range Accordion */}
//       <div className="accordion">
//         <button
//           onClick={() => toggleAccordion("price")}
//           className="accordion-button flex justify-between items-center"
//         >
//           Price
//           <span className="accordion-arrow">
//             {activeAccordions.price ? "-" : "+"}
//           </span>
//         </button>
//         {activeAccordions.price && (
//           <div className="accordion-content pt-3">
//             {/* <label className="filter_label">Price Range</label> */}
//             <Slider
//               range
//               min={0}
//               max={5000}
//               defaultValue={priceRange}
//               onChange={handlePriceChange}
//             />
//             <div className="price_inputs flex justify-between w-full mt-2">
//               <label>
//                 Min Price:
//                 <input
//                   type="number"
//                   className="inline border rounded w-[80px] p-2 mt-2 outline-none"
//                   value={priceRange[0]}
//                   onChange={(e) =>
//                     handlePriceChange([Number(e.target.value), priceRange[1]])
//                   }
//                 />
//               </label>
//               <label>
//                 Max Price:
//                 <input
//                   type="number"
//                   className="inline border rounded w-[80px] p-2 mt-2 outline-none"
//                   value={priceRange[1]}
//                   onChange={(e) =>
//                     handlePriceChange([priceRange[0], Number(e.target.value)])
//                   }
//                 />
//               </label>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Sort Accordion */}
//       <div className="accordion">
//         <button
//           onClick={() => toggleAccordion("sort")}
//           className="accordion-button flex justify-between items-center"
//         >
//           Sort By
//           <span className="accordion-arrow">
//             {activeAccordions.sort ? "-" : "+"}
//           </span>
//         </button>
//         {activeAccordions.sort && (
//           <div className="accordion-content">
//             {/* <label className="filter_label">Sort By</label> */}
//             <div className="checkbox-container">
//               <select
//                 onChange={handleSortChange}
//                 className="select_div no-arrow"
//               >
//                 <option value="">Newest</option>
//                 <option value="asc">Price: Low to High</option>
//                 <option value="desc">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       <button className="reset_button" onClick={handleResetFilters}>
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// Filter.propTypes = {
//   categories: PropTypes.array.isRequired,
//   categori: PropTypes.array.isRequired,
//   onsubcategoryChange: PropTypes.func.isRequired,
//   onFilterChange: PropTypes.func.isRequired,
//   onFilterChanges: PropTypes.func.isRequired,
//   onPriceChange: PropTypes.func.isRequired,
//   onSortChange: PropTypes.func.isRequired,
// };

// export default Filter;
// import PropTypes from "prop-types";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = ({
  categories,
  categori,
  oncategoryChange,
  onsubcategoryChange,
  onFilterChange,
  onFilterChanges,
  onPriceChange,
  onSortChange,
}) => {
  console.log("receiving category is", categories);

  // Set all main accordions open initially
  const [openAccordions, setOpenAccordions] = useState({
    colors: true,
    price: true,
    sort: true,
  });

  // Set all nested accordions open initially
  const [openNestedAccordions, setOpenNestedAccordions] = useState({});

  // Price range state
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Sort state
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
      [accordionKey]: !prevState[accordionKey], // Toggle the state for the nested accordion
    }));
  };

  const handleCheckboxChange = (property, value) => {
    console.log("filter data sending", property, value);
    onFilterChange(property, value);
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
    onFilterChange({}); // Clear filters for parent component
    onPriceChange([0, 5000]); // Reset price filter in parent component
    onSortChange(""); // Reset sort option in parent component
  };

  return (
    <div className="filter-container">
      <h4 className="text-black text-2xl font-semibold">Filters</h4>


      {/* Price Range Accordion */}
      <div>
        <div
          className="accordion border-0 accordion_fixed_div_name"
          onClick={() => toggleAccordion("price")}
        >
          <h5>Price Range</h5>
        </div>
        {openAccordions.price && (
          <div className="accordion-content pt-3 border-0 px-3">
            <Slider
              range
              min={0}
              max={5000}
              defaultValue={priceRange}
              onChange={handlePriceChange}
            />
            <div className="price_inputs flex justify-between w-full mt-2">
              <label>
                <span className="text-xs green_font">Min Price:</span>
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
              <span className="text-xs green_font">Max Price:</span>
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
      <div>
        <div
          className="accordion border-0 accordion_fixed_div_name"
          onClick={() => toggleAccordion("sort")}
        >
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

      <div>
        <div
          className="accordion border-0 hidden"
          onClick={() => toggleAccordion("colors")}
        >
          {/* <h5>Color</h5> */}
        </div>
        {openAccordions.colors && (
          <div className="accordion-content border-0">
            {categories?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="aditya1">
                {category?.property?.map((property, propertyIndex) => {
                  const nestedAccordionKey = `${categoryIndex}-${propertyIndex}`;
                  return (
                    <div key={propertyIndex}>
                      <div
                        className="nested-accordion flex items-center justify-between"
                        onClick={() =>
                          toggleNestedAccordion(categoryIndex, propertyIndex)
                        }
                      >
                        <p className="accordion_fixed_div_name">
                          {property?.name}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering parent accordion toggle
                            toggleNestedAccordion(categoryIndex, propertyIndex);
                          }}
                          className="toggle-button outline-none"
                        >
                          {openNestedAccordions[nestedAccordionKey] ? "-" : "+"}
                        </button>
                      </div>
                      {openNestedAccordions[nestedAccordionKey] !== false && (
                        <div className="accordion_fixed_div text-gray-500">
                          {property?.values?.map((value, valueIndex) => (
                            <div key={valueIndex} className="aditya2">
                              <label className="flex items-start">
                                <input
                                  type="checkbox"
                                  name={property.name} // Use the property name as the checkbox name
                                  value={value} // Use the value from the values array
                                  className="mt-1"
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      property.name,
                                      e.target.value
                                    )
                                  }
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
        )}
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
