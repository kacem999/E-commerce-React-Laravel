import { useState } from "react";
import { FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FilterArea({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true
  });

  const categories = ["Men's clothing", "Jewelery", "Electronics", "Women's clothing"];
  
  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Under $25", value: "under-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Above $100", value: "above-100" },
  ];
  
  const ratings = [
    { label: "All Ratings", value: "" },
    { label: "★★★★ & above", value: "4-above" },
    { label: "★★★ & above", value: "3-above" },
    { label: "★★ & above", value: "2-above" },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    let updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((b) => b !== value);

    setSelectedCategories(updatedCategories);
    onFilterChange({ 
      categories: updatedCategories, 
      price: selectedPrice, 
      rating: selectedRating 
    });
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
    onFilterChange({ 
      categories: selectedCategories, 
      price: value, 
      rating: selectedRating 
    });
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    onFilterChange({ 
      categories: selectedCategories, 
      price: selectedPrice, 
      rating: value 
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice("");
    setSelectedRating("");
    onFilterChange({ 
      categories: [], 
      price: "", 
      rating: "" 
    });
  };

  return (
    <div className="filter-area">
      <div className="filter-header">
        <FiFilter className="filter-icon" />
        <h2>Filters</h2>
        {(selectedCategories.length > 0 || selectedPrice || selectedRating) && (
          <button onClick={clearAllFilters} className="clear-all">
            Clear all
          </button>
        )}
      </div>

      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection('category')}>
          <h3>Category</h3>
          {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {expandedSections.category && (
          <div className="section-content">
            {categories.map((category) => (
              <div key={category} className="filter-option">
                <input
                  type="checkbox"
                  id={`cat-${category}`}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={`cat-${category}`}>
                  <span className="custom-checkbox"></span>
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection('price')}>
          <h3>Price Range</h3>
          {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {expandedSections.price && (
          <div className="section-content">
            {priceRanges.map(({ label, value }) => (
              <div key={value} className="filter-option">
                <input
                  type="radio"
                  id={`price-${value}`}
                  name="price"
                  value={value}
                  checked={selectedPrice === value}
                  onChange={() => handlePriceChange(value)}
                />
                <label htmlFor={`price-${value}`}>
                  <span className="custom-radio"></span>
                  {label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="section-header" onClick={() => toggleSection('rating')}>
          <h3>Rating</h3>
          {expandedSections.rating ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {expandedSections.rating && (
          <div className="section-content">
            {ratings.map(({ label, value }) => (
              <div key={value} className="filter-option">
                <input
                  type="radio"
                  id={`rating-${value}`}
                  name="rating"
                  value={value}
                  checked={selectedRating === value}
                  onChange={() => handleRatingChange(value)}
                />
                <label htmlFor={`rating-${value}`}>
                  <span className="custom-radio"></span>
                  {label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}