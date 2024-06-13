import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPrompt.css'; // Ensure to import your CSS file

const SignUpPrompt = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      if (response.status === 201) {
        setMessage('Sign up successful! Now log in.');
        localStorage.removeItem('user'); // Clear local storage on sign up
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="signup-form-container">
      <div className="form-header">
        <h2>Sign Up</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
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
      <button className="button" onClick={handleSignUp}>Sign Up</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignUpPrompt;
