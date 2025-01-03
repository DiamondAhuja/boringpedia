import React from 'react';
import Navbar from './components/Navbar';
import TrendingMovies from './components/TrendingMovies';
import TestFirebase from './components/TestFirebase';
import './styles/App.css'; 

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <TrendingMovies />
      <TestFirebase />
    </div>
  );
}

export default App;