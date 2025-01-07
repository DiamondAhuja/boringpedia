import axios from "axios";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.ts"; // Adjust path if needed

const getTMDbTrailer = async (movieTitle: string): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Add TMDb API key in your .env file
  const searchUrl = "https://api.themoviedb.org/3/search/movie";
  const movieDetailsUrl = "https://api.themoviedb.org/3/movie";

  try {
    // Search for the movie
    const searchResponse = await axios.get(searchUrl, {
      params: {
        api_key: apiKey,
        query: movieTitle,
      },
    });

    const searchResults = searchResponse.data as { results: any[] };
    if (searchResults.results.length === 0) {
      console.error("Movie not found on TMDb:", movieTitle);
      return null;
    }

    // Get the first movie result
    const movie = (searchResponse.data as { results: any[] }).results[0];

    // Fetch the movie's videos (trailers)
    const detailsResponse = await axios.get(`${movieDetailsUrl}/${movie.id}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });

    // Find the trailer in the videos
    const trailer = (detailsResponse.data as { videos: { results: any[] } }).videos.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error fetching trailer from TMDb:", error);
    return null;
  }
};

// Function to fetch movie data from OMDb API
const getMovieData = async (movieTitle: string) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const baseUrl = "https://www.omdbapi.com/";

  try {
    const response = await axios.get(baseUrl, {
      params: {
        t: movieTitle,
        apikey: apiKey,
      },
    });
    const trailer = await getTMDbTrailer(movieTitle);
    (response.data as any).Trailer = trailer || null;
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
    trailer: movieData.Trailer, // Placeholder for trailer URL
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
