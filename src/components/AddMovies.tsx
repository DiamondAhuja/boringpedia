import { useState } from 'react';
import { storeMovie } from '../services/addMovies'; // Adjust path as needed

const AddMovies = () => {
  const [movieTitle, setMovieTitle] = useState('');

  const handleAddMovie = async () => {
    if (!movieTitle) {
      alert('Please enter a movie title');
      return;
    }

    try {
      await storeMovie(movieTitle);
      alert(`Movie "${movieTitle}" has been added.`);
      setMovieTitle('');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
};

export default AddMovies;
