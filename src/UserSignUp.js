import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  // Your Firebase config here
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get the Auth object
      const auth = getAuth(firebaseApp);
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // Reset form after successful sign-up
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div className="user-sign-up">
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        <input 
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default UserSignUp;
