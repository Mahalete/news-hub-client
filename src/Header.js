// Header.js
import React, { useState } from 'react';
import './Header.css'; // Import CSS file for styling
import SearchBar from './SearchBar'; // Import SearchBar component

const Header = ({ onSearch, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    onFilter(selectedCategory); // Call the onFilter function with the selected category
  };

  return (
    <header className="header">
      <h1 className="header-title">News Aggregator</h1>
      <div className="header-controls">
        <SearchBar onSearch={onSearch} />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
          {/* Add more categories as needed */}
        </select>
      </div>
    </header>
  );
};

export default Header;
