import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { searchRes, searchFun, resetSearch } = useContext(GlobalContext);
  const { searchKey } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    resetSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchFun(searchKey, page);
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
        Search Result
      </h1>
      <InfiniteScroll
        dataLength={searchRes.length}
        next={handleFetchMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="row m-0">
          {searchRes &&
            searchRes.map((movie) => (
              <div key={movie.id} className="col-md-3 py-2 px-4">
                <MovieCard movie={movie} show="movie" />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchResults;
