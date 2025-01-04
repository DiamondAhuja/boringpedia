import axios from "axios";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.ts"; // Adjust path if needed

// Function to fetch movie data from OMDb API
const getMovieData = async (movieTitle: string) => {
  const apiKey = '9e3e6e07'; // Your OMDb API key
  const baseUrl = "http://www.omdbapi.com/";

  try {
    const response = await axios.get(baseUrl, {
      params: {
        t: movieTitle,
        apikey: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

// Function to format movie data for Firebase
const formatMovieData = (movieData: any) => {
  if (!movieData || movieData.Response === "False") {
    console.error("Invalid movie data:", movieData);
    return null;
  }

  return {
    imdbId: movieData.imdbID, // Add unique IMDb ID
    title: movieData.Title,
    yearOfRelease: parseInt(movieData.Year, 10),
    genre: movieData.Genre?.split(", ") || [],
    poster: movieData.Poster,
    ratings: {
      IMDB: parseFloat(movieData.imdbRating) || 0,
      Rotten:
        movieData.Ratings?.find(
          (rating: any) => rating.Source === "Rotten Tomatoes"
        )?.Value?.replace("%", "") || null,
    },
    summary: movieData.Plot,
    trailer: "https://youtube.com/trailer", // Placeholder for trailer URL
    usersRated: {
      UID: 0, // Placeholder for user rating
    },
    actors: movieData.Actors?.split(", ") || [],
  };
};

// Function to check if movie already exists in Firestore
const movieExists = async (imdbId: string) => {
  const moviesRef = collection(db, "Movies");
  const q = query(moviesRef, where("imdbId", "==", imdbId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Function to add movie to Firestore
const addMovieToFirestore = async (movieData: any) => {
  if (!movieData) return;

  try {
    const exists = await movieExists(movieData.imdbId);
    if (exists) {
      console.log("Movie already exists in Firestore:", movieData.title);
      return;
    }

    const docRef = await addDoc(collection(db, "Movies"), movieData);
    console.log("Movie added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding movie to Firestore:", error);
  }
};

// Main function to fetch and store a movie
export const storeMovie = async (movieTitle: string) => {
  const movieData = await getMovieData(movieTitle);
  const formattedData = formatMovieData(movieData);
  await addMovieToFirestore(formattedData);
};
