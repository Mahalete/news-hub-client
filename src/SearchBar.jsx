// SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearchBar(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
      setShowSearchBar(false);
    }
  };

  return (
    <div className="search-bar">
      {showSearchBar ? (
        <input
          type="text"
          placeholder="Search..."
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <FaSearch className="search-icon" onClick={handleSearchIconClick} />
      )}
    </div>
  );
};

export default SearchBar;
