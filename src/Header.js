import React from 'react';
import './Header.css'; // Import CSS file for styling
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import SearchBar from './SearchBar'; // Import SearchBar component

const Header = ({ onFilter, onSearch }) => {
  return (
    <header className="header">
      <div className="logo">News Hub</div>
      <div className="header-right">
        {/* Render the FilterDropdown component */}
        <FilterDropdown onSelectCategory={onFilter} />
        {/* Render the SearchBar component */}
        <div className="search-bar-container">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="buttons">
          <button className="button">Sign Up</button>
          <button className="button">Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
