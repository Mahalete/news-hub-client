// FilterDropdown.js
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
    // Do not close the sidebar here
  };

  return (
    <div className="filter-dropdown">
      {/* Filter Icon */}
      <div className="filter-icon" onClick={toggleSidebar} data-testid="filter-icon">
  <FontAwesomeIcon icon={faFilter} />
</div>
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          onSelectCategory={handleCategoryChange}
          onCloseSidebar={toggleSidebar} // Pass toggleSidebar as onCloseSidebar
        />
      )}
    </div>
  );
};

export default FilterDropdown;
