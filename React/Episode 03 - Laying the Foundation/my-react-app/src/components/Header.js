import React from 'react';
import '../styles/Header.css';  // Import the CSS for styling
import logo from './icon.png'
import profile from './profile.png'
const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <img src="./icon.png" alt="Logo" className="logo" />
        <input type="text" className="search-bar" placeholder="Search..." />
        <img src={profile} alt="User Icon" className="user-icon" />
      </nav>
    </header>
  );
};

export default Header;
