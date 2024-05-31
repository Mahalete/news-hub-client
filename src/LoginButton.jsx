import React from 'react';

const LoginButton = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>Log In</button>
  );
};

export default LoginButton;