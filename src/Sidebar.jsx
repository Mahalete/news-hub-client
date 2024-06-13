import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelectCategory, onCloseSidebar }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    onCloseSidebar(); // Close sidebar after selecting a category
  };

  return (
    <div className="sidebar">
      <button className="close-button" onClick={onCloseSidebar}>X</button>
      <ul className="sidebar-categories">
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
