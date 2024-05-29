import React, { useState } from 'react';
import './UserRegistrationForm.css'; // Import CSS file for styling
import LoginForm from './LoginForm'; // Import LoginForm component

const UserRegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // State to control login form visibility

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (response.status === 500) {
          setError('It appears you are already signed up. Please log in.');
        } else {
          const errorMessage = responseData.message || 'Sign-up failed';
          setError(errorMessage);
        }
      } else {
        setSuccess('Sign-up successful!');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Failed to sign up');
    }
  };

  return (
    <div className="registration-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      {error && error.includes('already signed up') && (
        <p className="login-instead">Already have an account? Please log in instead.</p>
      )}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  );
};

export default UserRegistrationForm;
