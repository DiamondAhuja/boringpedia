import React from 'react';
import Navbar from './components/Navbar';
import TrendingMovies from './components/TrendingMovies';
import './styles/App.css'; // Import the CSS file

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <TrendingMovies />
    </div>
  );
}

export default App;