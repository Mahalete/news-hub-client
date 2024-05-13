// FilterDropdown.js
import React from 'react';
import './FilterDropdown.css';

const FilterDropdown = () => {
  return (
    <select className="filter-dropdown">
      <option value="all">All Categories</option>
      <option value="business">Business</option>
      <option value="technology">Technology</option>
      <option value="entertainment">Entertainment</option>
      <option value="entertainment">Politics</option>
      {/* Add more categories as needed */}
    </select>
  );
};

export default FilterDropdown;
