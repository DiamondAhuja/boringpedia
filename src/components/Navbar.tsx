import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/boringpedia-logo.jpg";
import { auth } from "../services/firebaseConfig"; // Firebase auth instance
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      setDropdownVisible(false); // Hide dropdown after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Boringpedia" className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/rate">Rate</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div
          className="user-dropdown"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {user ? user.displayName || user.email : "Login/Signup"}
          <span className="dropdown-icon">▼</span>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {user ? (
                <ul>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
