import axios from "axios";

const KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_API_BASE = "https://api.themoviedb.org/3/";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export const movieImageUrl = (movie) =>
  `${TMDB_IMAGE_URL}${movie.poster_path}`;

export const fullTextSearch = async (text) => {
  const response = await axios.get(
    `${TMDB_API_BASE}search/movie?query=${text}&api_key=${KEY}`
  );
  return response.data;
};

export const fetchMovieById = async (movie_id) => {
  const response = await axios.get(
    `${TMDB_API_BASE}movie/${movie_id}?api_key=${KEY}`
  );
  return response.data;
};


export const fetchMovieCreditsById = async (movie_id) => {
  const response = await axios.get(
    `${TMDB_API_BASE}movie/${movie_id}/credits?api_key=${KEY}`
  );
  return response.data;
};

export const fetchPopularMovies = async (movie_id) => {
  const response = await axios.get(
    `${TMDB_API_BASE}movie/popular?api_key=${KEY}&page=1`
  );
  return response.data;
};

