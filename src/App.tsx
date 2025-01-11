import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TrendingMovies from "./components/TrendingMovies";
import TestFirebase from "./components/TestFirebase";
import AddMovies from "./components/AddMovies";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<TrendingMovies />} />
          <Route path="/test-firebase" element={<TestFirebase />} />
          <Route path="/add-movies" element={<AddMovies />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
