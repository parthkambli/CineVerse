import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  const { movies, fetchMovies, emptyMovies } = useContext(GlobalContext);

  const [page, setPage] = useState(1);

  useEffect(() => {
    emptyMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMovies("tv", page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <h1
        className="px-5 m-0 mt-2"
        style={{
          fontFamily: "Playfair Display, serif",
          fontWeight: "bold",
        }}
      >
        TV Shows
      </h1>
      <InfiniteScroll
        dataLength={movies.length}
        next={handleFetchMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="row m-0">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-3 py-2 px-4">
              <MovieCard movie={movie} show="tv" />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TvShows;
