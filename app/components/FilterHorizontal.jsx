import React, { useState, useMemo } from "react";
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
  onClose,
  responsive_filter_ID,
  onFilterButtonClick,
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

  const handleCheckboxChange = (property, value, checked) => {
    if (checked) {
      //console.log("filter data sending", property, value, checked);
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

    document
      .querySelectorAll('.filter-container input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    categories.forEach((category) => {
      category?.property?.forEach((property) => {
        onFilterChange(property.name, null); // Clear filters for each property in the parent component
      });
    }); // Clear filters for parent component
    onPriceChange([0, 5000]); // Reset price filter in parent component
    onSortChange(""); // Reset sort option in parent component
  };

  const allowedProperties = ["Color", "Occasion", "Item Type"];

  // Remove duplicate properties and categories
  const uniqueCategories = useMemo(() => {
    const seenProperties = new Set();
    return categories.map((category) => {
      // Filter out duplicate properties within each category
      const filteredProperties = category?.property?.filter((property) => {
        if (!allowedProperties.includes(property?.name)) {
          return false;
        }
        if (seenProperties.has(property?.name)) {
          return false; // Skip if property has already been seen
        }
        seenProperties.add(property?.name);
        return true;
      });

      // Return the category with filtered properties
      return { ...category, property: filteredProperties };
    });
  }, [categories]);

  return (
    <div className="hori_filter_container d-md-none">
      <div>
        {/* {openAccordions.colors && (
          <div className="accordion-content border-0">
            {categories?.map((category, categoryIndex) => (
              <div key={categoryIndex} className=" 1">
                {category?.property?.map((property, propertyIndex) => {
                  if (!allowedProperties.includes(property?.name)) {
                    return null; 
                  }
                  const nestedAccordionKey = `${categoryIndex}-${propertyIndex}`;
                  return (
                    <>
                      <a
                        href={`#${propertyIndex}`}
                        key={propertyIndex}
                        className=" inline mr-3 rounded reset_button"
                        onClick={onFilterButtonClick}
                      >
                        {property?.name}
                      </a>
                    </>
                  );
                })}
              </div>
            ))}
          </div>
        )} */}

        {openAccordions.colors && (
          <div className="accordion-content border-0">
            {uniqueCategories?.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className=" 1 flex items-center w-[auto]"
              >
                {category?.property?.map((property, propertyIndex) => {
                  // Check if the property name is one of the allowed names
                  if (!allowedProperties.includes(property?.name)) {
                    return null; // Skip this property if it's not allowed
                  }
                  const nestedAccordionKey = `${categoryIndex}-${propertyIndex}`;
                  return (
                    <a
                      href={`#${propertyIndex}`}
                      key={propertyIndex}
                      className="inline mr-3 rounded reset_button"
                      onClick={onFilterButtonClick}
                    >
                      {property?.name}
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
