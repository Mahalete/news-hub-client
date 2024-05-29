import React, { useState } from 'react';
import './LoginForm.css'; // Import CSS file for styling

const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Call the onLogin function with email and password
    onLogin(email, password);
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
      <button className="button" onClick={handleLogin}>Log In</button> {/* Use button JSX directly */}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default LoginForm;
