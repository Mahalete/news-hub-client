// Header.js
import React from 'react';
import SearchBar from './SearchBar'; // Assuming you have a SearchBar component

const Header = ({ onSearch }) => {
  return (
    <header>
      <h1>News HUB</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
