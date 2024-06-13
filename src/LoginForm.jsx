import React, { useState, useContext } from 'react';
import './LoginForm.css';
import { UserContext } from './UserContext'; // Import the UserContext

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext); // Access setUser from the context

  // Function to validate email format (client-side)
  const validateEmail = (email) => {
    // Simple check: Email should contain '@' and at least one dot ('.') after '@'
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate password format (client-side)
  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };

  const handleLogin = async () => {
    try {
      // Client-side validation checks
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }

      if (!validateEmail(email)) {
        setError('Invalid email format. Please enter a valid email address.');
        return;
      }

      if (!validatePassword(password)) {
        setError('Invalid password format. Password must be at least 8 characters long.');
        return;
      }

      console.log('Login button clicked');
      console.log('Attempting login with:', { email, password });

      // Proceed with server login if client-side checks pass
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
        const user = {
          ...responseData.user,
          username: responseData.user.email.split('@')[0]
        };
        // Extract username from email
        setUser(user); // Set user state using the setUser function from context
        localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
        console.log('User logged in successfully:', user);

        onClose(); // Close the modal on successful login
      } else {
        const responseData = await response.json();
        console.log('Login failed:', responseData);
        if (response.status === 401) {
          setError('Please sign up before logging in');
        } else {
          setError(responseData.error || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
    }
  };

  // Function to handle closing modal and resetting form
  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleLogin}>Log In</button>
      {error && <p className="error-message">{error}</p>}
      <button className="close-button" onClick={handleClose}>Close</button>
    </div>
  );
};

export default LoginForm;
