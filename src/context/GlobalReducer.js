// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.payload,
        loading: false,
      };
    case "NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.payload,
        loading: false,
      };
    case "FETCH_GENRE":
      return {
        ...state,
        genres: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
