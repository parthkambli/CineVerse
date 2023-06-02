import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Circle } from "rc-progress";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Slider = ({ movies, deviceType }) => {
  const { fetchGenres, genres } = useContext(GlobalContext);

  const Image_Path = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    xl: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 1199, min: 992 },
      items: 4,
    },
    md: {
      breakpoint: { max: 991, min: 768 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 767, min: 576 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      deviceType={deviceType}
      infinite={true}
      removeArrowOnDeviceType={["md", "sm", "xs"]}
    >
      {movies &&
        movies.map((movie) => (
          <div key={movie.id}>
            <div className="p-3 d-flex justify-content-between">
              <div className="card text-bg-dark border border-3 border-white rounded-4 ">
                <img
                  src={`${Image_Path}${movie.poster_path}`}
                  className="card-img rounded-4"
                  alt="..."
                />
                <div className="card-img-overlay p-2">
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
                    className="rating position-absolute bottom-0 end-0 p-2 rounded-circle d-flex justify-content-center align-items-center"
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
            </div>
            <h4 className="text-center px-4">{movie.title}</h4>
          </div>
        ))}
    </Carousel>
  );
};

export default Slider;