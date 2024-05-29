import React from 'react';

const SignUpPrompt = ({ onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="signup-prompt">
      <p>You need to sign up or log in to save favorites.</p>
      <button onClick={handleConfirm}>Sign Up / Log In</button>
    </div>
  );
};

export default SignUpPrompt;
