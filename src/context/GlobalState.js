import { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";

// Initial State
const initialState = {
  movies: [],
  trendingMovies: [],
  nowPlaying: [],
  genres: [],
  loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const API_URL = "https://api.themoviedb.org/3";

  // Actions
  const fetchMovies = async () => {
    const res = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    dispatch({
      type: "FETCH_MOVIES",
      payload: res.data.results,
    });
  };

  const fetchTrendingMovies = async (timeWindow, show) => {
    const res = await axios.get(`${API_URL}/trending/${show}/${timeWindow}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    dispatch({
      type: "TRENDING_MOVIES",
      payload: res.data.results,
    });
  };

  const fetchNowPlaying = async (show) => {
    const res = await axios.get(`${API_URL}${show}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    dispatch({
      type: "NOW_PLAYING",
      payload: res.data.results,
    });
  };

  const fetchGenres = async () => {
    const res = await axios.get(`${API_URL}/genre/movie/list`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
    dispatch({
      type: "FETCH_GENRE",
      payload: res.data.genres,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        trendingMovies: state.trendingMovies,
        nowPlaying: state.nowPlaying,
        genres: state.genres,
        loading: state.loading,
        fetchMovies,
        fetchGenres,
        fetchTrendingMovies,
        fetchNowPlaying,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
