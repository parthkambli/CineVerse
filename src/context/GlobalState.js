import { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";

// Initial State
const initialState = {
  movies: [],
  movie: [],
  trendingMovies: [],
  nowPlaying: [],
  topRated: [],
  genres: [],
  languages: [],
  loading: false,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const API_URL = "https://api.themoviedb.org/3";

  // Actions
  const fetchMovies = async (Show) => {
    // dispatch({ type: "FETCH_MOVIES", payload: [] });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/discover/${Show}`, {
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const movieDetail = async (Show, Id) => {
    dispatch({ type: "MOVIE_DETAILS", payload: [] });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/${Show}/${Id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: "videos,credits",
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      dispatch({
        type: "MOVIE_DETAILS",
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchTrendingMovies = async (timeWindow, show) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchNowPlaying = async (show) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchTopRated = async (show) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/${show}/top_rated`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      dispatch({
        type: "TOP_RATED",
        payload: res.data.results,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchGenres = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchLanguages = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/configuration/languages`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      dispatch({
        type: "FETCH_LANGUAGES",
        payload: res.data,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        trendingMovies: state.trendingMovies,
        nowPlaying: state.nowPlaying,
        topRated: state.topRated,
        genres: state.genres,
        languages: state.languages,
        loading: state.loading,
        fetchMovies,
        fetchTrendingMovies,
        fetchNowPlaying,
        fetchTopRated,
        movieDetail,
        fetchGenres,
        fetchLanguages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
