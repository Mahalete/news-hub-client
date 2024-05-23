import React, { useState } from 'react';
import './Header.css'; // Import CSS file for styling
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import SearchBar from './SearchBar'; // Import SearchBar component
import UserRegistrationForm from './UserRegistrationForm'; // Import UserRegistrationForm component

const Header = ({ onFilter, onSearch }) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

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
          <button className="button" onClick={handleSignUpClick}>Sign Up</button>
          <button className="button">Log In</button>
        </div>
      </div>
      {showSignUp && (
        <div className="modal">
          <UserRegistrationForm />
        </div>
      )}
    </header>
  );
};

export default Header;
