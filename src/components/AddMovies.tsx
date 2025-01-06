import { useState } from 'react';
import { storeMovie } from '../services/addMovies'; // Adjust path as needed

const AddMovies = () => {
  const [movieTitles, setMovieTitles] = useState('');

  const handleAddMovies = async () => {
    if (!movieTitles) {
      alert('Please enter at least one movie title');
      return;
    }

    const titlesArray = movieTitles.split(',').map((title) => title.trim());
    if (titlesArray.length === 0) {
      alert('Invalid input. Please provide valid movie titles.');
      return;
    }

    try {
      for (const title of titlesArray) {
        await storeMovie(title);
        console.log(`Movie "${title}" has been processed.`);
      }
      alert('Movies have been added successfully.');
      setMovieTitles('');
    } catch (error) {
      console.error('Error adding movies:', error);
      alert('Failed to add one or more movies.');
    }
  };

  return (
    <div>
      <textarea
        value={movieTitles}
        onChange={(e) => setMovieTitles(e.target.value)}
        placeholder="Enter movie titles separated by commas (e.g., The Avengers, Iron Man, Thor)"
        rows={5}
        cols={50}
      />
      <button onClick={handleAddMovies}>Add Movies</button>
    </div>
  );
};

export default AddMovies;
