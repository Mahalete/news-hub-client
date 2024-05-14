// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => handleCategoryClick('all')}>All Categories</li>
        <li onClick={() => handleCategoryClick('business')}>Business</li>
        <li onClick={() => handleCategoryClick('technology')}>Technology</li>
        <li onClick={() => handleCategoryClick('entertainment')}>Entertainment</li>
        <li onClick={() => handleCategoryClick('politics')}>Politics</li>
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
