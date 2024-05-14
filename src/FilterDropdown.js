// FilterDropdown.js
import React, { useState } from 'react';
import './FilterDropdown.css';
import Sidebar from './Sidebar';

const FilterDropdown = ({ onSelectCategory }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-icon" onClick={handleSidebarToggle}>
        Filter
      </div>
      {showSidebar && <Sidebar onSelectCategory={onSelectCategory} />}
    </div>
  );
};

export default FilterDropdown;
