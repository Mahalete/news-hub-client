// LogoutButton.jsx

import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="button logout-button" onClick={onLogout}>Log Out</button>
  );
};

export default LogoutButton; 
