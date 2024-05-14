import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar'; // Import SearchBar component
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import './Header.css'; // Import CSS file for styling

const Header = ({ onSearch, onFilter }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    // Hide the filter dropdown when search bar is toggled
    setShowFilterDropdown(false);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
    // Hide the search bar when filter dropdown is toggled
    setShowSearchBar(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <header className="header">
      <div className="logo">News Hub</div>
      <div className="header-right">
        {/* Filter Icon or Filter Dropdown based on showFilterDropdown state */}
        {showFilterDropdown ? (
          <FilterDropdown onSelectCategory={handleCategoryChange} />
        ) : (
          <div className="filter-icon" onClick={toggleFilterDropdown}>
            <FontAwesomeIcon icon={faFilter} />
          </div>
        )}
        {/* Search Icon or SearchBar based on showSearchBar state */}
        {showSearchBar ? (
          <SearchBar onSearch={onSearch} />
        ) : (
          <div className="search-icon" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        )}
        <div className="buttons">
          <button className="button">Sign Up</button>
          <button className="button">Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
