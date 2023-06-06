import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const { movies, fetchMovies } = useContext(GlobalContext);

  useEffect(() => {
    fetchMovies("movie");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1
        className="px-5 m-0 mt-2"
        style={{
          fontFamily: "Playfair Display, serif",
          fontWeight: "bold",
        }}
      >
        Movies
      </h1>
      <div className="row m-0">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 py-2 px-4">
            <MovieCard  movie={movie} show="movie" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
