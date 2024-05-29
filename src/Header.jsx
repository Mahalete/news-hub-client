// Header.jsx

import React, { useState } from 'react';
import './Header.css'; // Import CSS file for styling
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import SearchBar from './SearchBar'; // Import SearchBar component
import LogoutButton from './LogoutButton'; // Import LogoutButton component
import UserRegistrationForm from './UserRegistrationForm'; // Import UserRegistrationForm component
import LoginForm from './LoginForm'; // Import LoginForm component

const Header = ({ onFilter, onSearch }) => {
  const [user, setUser] = useState(null); // State to store user information
  const [showSignUp, setShowSignUp] = useState(false); // State to control sign-up modal visibility
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control login form visibility

  const handleSignUpClick = () => {
    setShowSignUp(true); // Show the sign-up modal
  };

  const handleLoginClick = () => {
    setShowLoginForm(true); // Show the login form
  };

  const handleLogin = (email, password) => {
    // Implement login functionality here
    try {
      // Simulate successful login
      const username = email.substring(0, email.indexOf('@')); // Extract username from email
      const userObject = { email: email, displayName: username }; // Create user object
      setUser(userObject); // Set user state
      setShowLoginForm(false); // Hide the login form after successful login
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  const handleLogout = () => {
    setUser(null); // Reset user state to null
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
          {/* Conditionally render based on user state */}
          {user ? (
            <div className="user-info">
              <div>Welcome, {user.displayName}</div>
              <div className="logout-button-container">
                <LogoutButton onLogout={handleLogout} /> {/* Integrate LogoutButton component */}
              </div>
            </div>
          ) : (
            <>
              <button className="button" onClick={handleSignUpClick}>Sign Up</button>
              <button className="button" onClick={handleLoginClick}>Log In</button>
            </>
          )}
        </div>
      </div>
      {/* Conditionally render the UserRegistrationForm modal */}
      {showSignUp && (
        <div className="modal">
          {/* Render the UserRegistrationForm component */}
          <UserRegistrationForm />
          <button className="close-button" onClick={() => setShowSignUp(false)}>Close</button>
        </div>
      )}
      {/* Conditionally render the login form */}
      {showLoginForm && (
        <div className="modal">
          <LoginForm onLogin={handleLogin} onClose={() => setShowLoginForm(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
