import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <span>B</span>
        </a>
        <ul className="nav-links">
          <li>Home</li>
          <li>Movies</li>
          <li>Shows</li>
          <li>Rate</li>
        </ul>
      </div>
      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="profile">
          <img
            src="https://via.placeholder.com/30" // Replace with actual profile image URL
            alt="Profile"
            className="profile-img"
          />
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;