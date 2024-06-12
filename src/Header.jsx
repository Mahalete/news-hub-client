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
  // TODO: Remove login handler from Header.jsx
  const handleLoginClick = () => {
    setShowLoginForm(true); // Show the login form
  };

  const handleLogout = () => {
    setUser(null); // Reset user state to null using the setUser function from context
    localStorage.removeItem('user'); // Remove user from localStorage
    console.log('Logout successful'); // Add console log for successful logout
  };

  const handleLogin = async (email, password) => {
    try {
      console.log('Login button clicked');
      console.log('Attempting login with:', { email, password });

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        const username = email.substring(0, email.indexOf('@')); // Extract username from email
        const userObject = {...responseData.user, displayName: username }; // Create user object
        setUser(userObject); // Set user state using the setUser function from context
        localStorage.setItem('user', JSON.stringify(userObject)); // Save user to localStorage
        console.log('User logged in successfully:', userObject);
        setShowLoginForm(false); // Hide the login form after successful login
      } else {
        const responseData = await response.json();
        console.log('Login failed:', responseData);
        setError(responseData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
    }
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
  onFilter: PropTypes.func.isRequired, // Assuming onFilter is a function and required
  onSearch: PropTypes.func.isRequired, // Assuming onSearch is a function and required
};

export default Header;
