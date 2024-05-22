import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './FilterDropdown.css';
import Sidebar from './Sidebar';

const FilterDropdown = ({ onSelectCategory }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCategoryChange = (category) => {
    onSelectCategory(category);
    setShowSidebar(false); // Close the sidebar after selecting a category
  };

  return (
    <div className="filter-dropdown">
      {/* Filter Icon */}
      <div className="filter-icon" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      {/* Sidebar */}
      {showSidebar && <Sidebar onSelectCategory={handleCategoryChange} />}
    </div>
  );
};

export default FilterDropdown;
