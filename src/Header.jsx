import React, { useState, useEffect, useContext } from 'react';
import './Header.css'; // Import CSS file for styling
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import SearchBar from './SearchBar'; // Import SearchBar component
import LogoutButton from './LogoutButton'; // Import LogoutButton component
import UserRegistrationForm from './UserRegistrationForm'; // Import UserRegistrationForm component
import LoginForm from './LoginForm'; // Import LoginForm component
import PropTypes from 'prop-types';
import { UserContext } from './UserContext'; // Import UserContext

const Header = ({ onFilter, onSearch }) => {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from UserContext
  const [showSignUp, setShowSignUp] = useState(false); // State to control sign-up modal visibility
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control login form visibility
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    setShowSignUp(true); // Show the sign-up modal
  };
 
  const handleLoginClick = () => {
    setShowLoginForm(true); // Show the login form
  };

  const handleLogout = () => {
    setUser(null); // Reset user state to null using the setUser function from context
    localStorage.removeItem('user'); // Remove user from localStorage
    console.log('Logout successful'); // Add console log for successful logout
  };


  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <header className="header">
      <div className="logo">News Hub</div>
      <div className="header-right">
        <div className="icons-container">
          <FilterDropdown onSelectCategory={onFilter} />
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="buttons">
          {user ? (
            // Inside the Header component
<div className="user-info">
  <div>Welcome, {user.username}</div> {/* Change user.displayName to user.email */}
  <div className="logout-button-container">
    <LogoutButton onLogout={handleLogout} />
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
      {showSignUp && (
        <div className="modal">
          <UserRegistrationForm onClose={() => setShowSignUp(false)} />
          <button className="close-button" onClick={() => setShowSignUp(false)}>Close</button>
        </div>
      )}
      {showLoginForm && (
        <div className="modal">
          <LoginForm onClose={() => setShowLoginForm(false)} />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </header>
  );
};

Header.propTypes = {
  onFilter: PropTypes.func.isRequired, // onFilter is a function and required
  onSearch: PropTypes.func.isRequired, //  onSearch is a function and required
};

export default Header;