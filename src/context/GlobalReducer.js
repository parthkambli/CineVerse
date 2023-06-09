// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    case "EMPTY_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        searchRes: [...state.searchRes, ...action.payload],
        searchPages: action.totalPages,
      };
    case "RESET_SEARCH":
      return {
        ...state,
        searchRes: action.payload,
      };
    case "MOVIE_DETAILS":
      return {
        ...state,
        movie: action.payload,
      };
    case "TRENDING":
      return {
        ...state,
        trending: action.payload,
      };
    case "NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.payload,
      };
    case "TOP_RATED":
      return {
        ...state,
        topRated: action.payload,
      };
    case "FETCH_GENRE":
      return {
        ...state,
        genres: action.payload,
      };
    case "FETCH_LANGUAGES":
      return {
        ...state,
        languages: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
