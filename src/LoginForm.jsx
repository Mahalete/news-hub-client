// LoginForm.jsx

import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
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
        localStorage.setItem('user', JSON.stringify({ email }));
        console.log('User logged in successfully:', email);
        onLogin(email, password); // Call the onLogin prop
        onClose(); // Close the modal on successful login
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
      {error && <p className="error">{error}</p>}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default LoginForm;
