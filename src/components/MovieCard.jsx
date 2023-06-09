import { Circle } from "rc-progress";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import poster from "../assets/Poster.png";

const MovieCard = ({ movie, show }) => {
  const { fetchGenres, genres } = useContext(GlobalContext);

  const Image_Path = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      to={`/details/${encodeURIComponent(show)}/${encodeURIComponent(
        movie.id
      )}`}
      className="text-decoration-none text-white"
    >
      <div className="card text-bg-dark rounded-4">
        <img
          src={movie.poster_path ? `${Image_Path}${movie.poster_path}` : poster}
          className="img-fluid card-img rounded-4 border border-4 border-white"
          alt="..."
          style={{ height: 400 }}
        />
        <div className="card-img-overlay p-2 ">
          {movie.genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return (
              <span
                key={genreId}
                className="badge rounded-pill m-1 fs-6"
                style={{
                  backgroundColor: "#FF2E06",
                  color: "#F1F1F1",
                }}
              >
                {genre ? genre.name : ""}
              </span>
            );
          })}
          <span
            className="position-absolute bottom-0 end-0 p-2 rounded-circle d-flex justify-content-center align-items-center"
            style={{
              height: "55px",
              width: "55px",
              backgroundColor: "#F1F1F1",
              color: "black",
              transform: "translate(30%, 30%)",
            }}
          >
            <Circle
              percent={movie.vote_average * 10}
              strokeWidth={10}
              strokeColor={
                movie.vote_average < 4
                  ? "#DC3545"
                  : movie.vote_average < 7
                  ? "#FFC107"
                  : "#198754"
              }
              className="position-absolute bottom-1 end-1"
              style={{ height: "50px", width: "50px" }}
            />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <h4 className="text-center px-4 m-0 mt-2">{movie.title || movie.name}</h4>
    </Link>
  );
};

export default MovieCard;
