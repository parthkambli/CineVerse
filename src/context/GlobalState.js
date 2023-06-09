import { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";

// Initial State
const initialState = {
  movies: [],
  movie: [],
  searchRes: [],
  trending: [],
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
  const fetchMovies = async (Show, page = 1) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/discover/${Show}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: page,
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

  const emptyMovies = async () => {
    dispatch({
      type: "EMPTY_MOVIES",
      payload: [],
    });
  };

  const searchFun = async (searchKey, page = 1) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/search/multi`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query: searchKey,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      const results = res.data.results.filter(
        (item) => item.media_type !== "person"
      );
      dispatch({
        type: "SEARCH",
        payload: results,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const resetSearch = async () => {
    dispatch({
      type: "RESET_SEARCH",
      payload: [],
    });
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
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchTrending = async (timeWindow) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`${API_URL}/trending/all/${timeWindow}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });
      dispatch({
        type: "TRENDING",
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
          media_type: "movie,tv",
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
        searchRes: state.searchRes,
        trending: state.trending,
        nowPlaying: state.nowPlaying,
        topRated: state.topRated,
        genres: state.genres,
        languages: state.languages,
        loading: state.loading,
        fetchMovies,
        emptyMovies,
        searchFun,
        resetSearch,
        fetchTrending,
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
