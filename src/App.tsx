import Navbar from './components/Navbar';
import TrendingMovies from './components/TrendingMovies';
import TestFirebase from './components/TestFirebase';
import AddMovies from './components/AddMovies';
import './styles/App.css'; 

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <TrendingMovies />
      <TestFirebase />
      <AddMovies />
    </div>
  );
}

export default App;