import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";

const SearchResults = () => {
  const { searchRes, searchFun, resetSearch, searchPages } =
    useContext(GlobalContext);
  console.log("searchPages: ", searchPages);
  const { searchKey } = useParams();
  const [page, setPage] = useState(1);
  console.log("page: ", page);

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
        Search Result for {searchKey}
      </h1>
      <InfiniteScroll
        dataLength={searchRes.length}
        next={handleFetchMore}
        hasMore={page === searchPages ? false : true}
        loader=<div className="row m-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="col-md-3 py-2 px-4">
              <SkeletonCard />
            </div>
          ))}
        </div>
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
