import { memo, useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaSearch } from "react-icons/fa";
import Trending from "../components/Trending";
import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { fetchMovies, movies, emptyMovies } = useContext(GlobalContext);
  const navigate = useNavigate();

  const Image_Path = "https://image.tmdb.org/t/p/original";

  const [searchKey, steSearchKey] = useState("");

  useEffect(() => {
    emptyMovies();
    fetchMovies("movie");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomMovie = useMemo(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      return movies[randomIndex];
    }
    return null;
  }, [movies]);

  return (
    <>
      <div
        className="d-flex d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(8, 32, 50, 1)), url(${Image_Path}${
            randomMovie && randomMovie.backdrop_path
          })`,
          height: "60vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <p
            className="display-2 m-2 mb-1"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Welcome
          </p>
          <p
            className="fs-5 m-2 mt-1"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Movies, Tv Shows & much more to discover. Explore now
          </p>
          {/* Search */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control rounded-start-pill fs-4"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-button"
              value={searchKey}
              onChange={(e) => steSearchKey(e.target.value)}
            />
            <button
              className="btn rounded-end-pill fs-4 py-2 px-4"
              type="button"
              id="search-button"
              onClick={() =>
                navigate(`/search/${encodeURIComponent(searchKey)}`)
              }
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                color: "#F1F1F1",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaSearch className="fs-1 d-flex align-items-center" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <TrendingMemo />
        <NowPlayingMemo />
        <TopRatedMemo />
      </div>
    </>
  );
};

const TrendingMemo = memo(Trending);
const NowPlayingMemo = memo(NowPlaying);
const TopRatedMemo = memo(TopRated);

export default Home;
