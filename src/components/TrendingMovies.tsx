import React from 'react';
import '../styles/TrendingMovies.css';

const TrendingMovies: React.FC = () => {
    return (
      <div className="trending-movies">
        <h2 className="section-title">Top Trending Movies</h2>
        <div className="scroll-container">
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="movie-card" key={index}>
              <div className="movie-image-placeholder">
                <p>Image {index + 1}</p>
              </div>
              <p className="movie-title">Movie {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TrendingMovies;
