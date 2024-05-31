import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    setShowSignUp(true); // Show the sign-up modal
  };

  const handleLoginClick = () => {
    setShowLoginForm(true); // Show the login form
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
        const userObject = { email: email, displayName: username }; // Create user object
        setUser(userObject); // Set user state
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

  const handleLogout = () => {
    setUser(null); // Reset user state to null
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
          <UserRegistrationForm onClose={() => setShowSignUp(false)} />
          <button className="close-button" onClick={() => setShowSignUp(false)}>Close</button>
        </div>
      )}
      {/* Conditionally render the login form */}
      {showLoginForm && (
        <div className="modal">
          <LoginForm onLogin={handleLogin} onClose={() => setShowLoginForm(false)} />
        </div>
      )}
      {/* Display error message */}
      {error && <p className="error">{error}</p>}
    </header>
  );
};

export default Header;
