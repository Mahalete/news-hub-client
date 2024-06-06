import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css'; // Import CSS file for styling
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown component
import SearchBar from './SearchBar'; // Import SearchBar component
import UserRegistrationForm from './UserRegistrationForm'; // Import UserRegistrationForm component
import LoginForm from './LoginForm'; // Import LoginForm component

const Header = ({ onFilter, onSearch }) => {
  const [user, setUser] = useState(null); // State to store user information
  const [showSignUp, setShowSignUp] = useState(false); // State to control sign-up modal visibility
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control login form visibility
  const [error, setError] = useState('');

  // Function to handle user login
  const handleLogin = async (email, password) => {
    try {
      console.log('Login button clicked');
      console.log('Attempting login with:', { email, password });

      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log('Response status:', response.status);

      if (response.status === 200) {
        const responseData = response.data;
        console.log('Response data:', responseData);
        const username = email.substring(0, email.indexOf('@')); // Extract username from email
        const userObject = { email: email, displayName: username }; // Create user object
        setUser(userObject); // Set user state
        localStorage.setItem('user', JSON.stringify(userObject)); // Save user to localStorage
        localStorage.setItem('firebaseToken', responseData.token); // Store Firebase ID token in localStorage
        console.log('User logged in successfully:', userObject);
        setShowLoginForm(false); // Hide the login form after successful login
      } else {
        const responseData = response.data;
        console.log('Login failed:', responseData);
        setError(responseData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      console.log('Logout button clicked');
      
      // Get the Firebase ID token from localStorage
      const token = localStorage.getItem('firebaseToken');

      // Check if the token exists
      if (!token) {
        console.error('Firebase ID token not found');
        return;
      }

      // Set the Authorization header with the Firebase ID token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Send a POST request to the logout endpoint with the Authorization header
      const response = await axios.post('http://localhost:5000/api/logout', {}, config);

      // Check the response status
      if (response.status === 200) {
        setUser(null); // Reset user state
        localStorage.removeItem('user'); // Remove user from localStorage
        localStorage.removeItem('firebaseToken'); // Remove Firebase ID token from localStorage
        console.log('User logged out successfully');
      } else {
        console.error('Failed to log out:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Function to handle sign-up modal visibility
  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  // Function to handle login form visibility
  const handleLoginClick = () => {
    setShowLoginForm(true);
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
        <FilterDropdown onSelectCategory={onFilter} />
        <div className="search-bar-container">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="buttons">
          {user ? (
            <div className="user-info">
              <div>Welcome, {user.displayName}</div>
              <div className="logout-button-container">
                <button className="button" onClick={handleLogout}>Logout</button>
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
          <LoginForm onLogin={handleLogin} onClose={() => setShowLoginForm(false)} />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </header>
  );
};

export default Header;
