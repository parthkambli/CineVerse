import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Circle } from "rc-progress";
import { BiPlayCircle } from "react-icons/bi";
import Carousel from "react-multi-carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import profile from "../assets/Profile.png";
import poster from "../assets/Poster.png";
import { useParams } from "react-router-dom";

const Detail = (deviceType) => {
  const { movieDetail, movie, languages, fetchLanguages, loading } =
    useContext(GlobalContext);

  const Image_Path = "https://image.tmdb.org/t/p/original";
  const Cast_Image_Path = "https://image.tmdb.org/t/p/w500";

  const { show, id } = useParams();

  // const show = movie.episode_run_time ? "tv" : "movie";

  useEffect(() => {
    movieDetail(show, id);
    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(movie);

  const getLanguageName = (languageCode) => {
    const language = languages.find((lang) => lang.iso_639_1 === languageCode);
    return language ? language.english_name : languageCode;
  };

  const getDirectors = (credits) => {
    if (credits && credits.crew) {
      const directors = credits.crew.filter(
        (person) => person.job === "Director"
      );
      return directors.map((director) => director.name).join(", ");
    }
    return "Unknown";
  };

  const getWriters = (credits) => {
    if (credits && credits.crew) {
      const writers = credits.crew.filter(
        (person) => person.department === "Writing"
      );
      return writers.map((writer) => writer.name).join(", ");
    }
    return "Unknown";
  };

  const responsive = {
    xl: {
      breakpoint: { max: 4000, min: 1200 },
      items: 6,
    },
    lg: {
      breakpoint: { max: 1199, min: 992 },
      items: 5,
    },
    md: {
      breakpoint: { max: 991, min: 768 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 767, min: 576 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 575, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(8, 32, 50, 1)), url(${Image_Path}${movie.backdrop_path})`,
          height: "70vh",
          backgroundPosition: "center ",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container m-auto pt-4">
          <div className="row m-0">
            <div className="col-md-3 pb-3">
              {loading ? (
                <Skeleton
                  height={400}
                  className="img-fluid card-img border border-3 border-white rounded-4"
                />
              ) : (
                <img
                  src={
                    movie.poster_path
                      ? `${Image_Path}${movie.poster_path}`
                      : poster
                  }
                  className="img-fluid card-img border border-3 border-white rounded-4"
                  alt="poster"
                />
              )}
            </div>
            <div className="col-md-9 ">
              <h1
                className="px-2 m-0"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "bold",
                }}
              >
                {loading ? <Skeleton /> : movie.title || movie.name}
              </h1>
              {movie.title || movie.name ? <hr className="m-0" /> : null}
              {/* Genres */}
              <div className="py-2">
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="badge rounded-pill m-1 fs-6"
                      style={{
                        backgroundColor: "#FF2E06",
                        color: "#F1F1F1",
                      }}
                    >
                      {loading ? <Skeleton /> : genre.name}
                    </span>
                  ))}
              </div>

              {/* Details */}
              <div className="row">
                <div className="col-sm-6">
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Status: </strong>
                      {
                        <span style={{ color: "#B4B3B3" }}>
                          {movie.status ? movie.status : "Unknown"}
                        </span>
                      }
                    </div>
                  )}
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Release Date: </strong>
                      <span style={{ color: "#B4B3B3" }}>
                        {show === "movie"
                          ? movie.release_date
                            ? movie.release_date
                            : "Unknown"
                          : movie.first_air_date
                          ? movie.first_air_date
                          : "Unknown"}
                      </span>
                    </div>
                  )}
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Runtime: </strong>
                      <span style={{ color: "#B4B3B3" }}>
                        {show === "movie"
                          ? movie.runtime && movie.runtime > 0
                            ? `${Math.floor(movie.runtime / 60)}h ${
                                movie.runtime % 60
                              }m`
                            : "Unknown"
                          : movie.episode_run_time &&
                            movie.episode_run_time.length > 0
                          ? `${Math.floor(movie.episode_run_time[0] / 60)}h ${
                              movie.episode_run_time[0] % 60
                            }m`
                          : "Unknown"}
                      </span>
                    </div>
                  )}
                  {/* Rating & Trailer */}
                  <div className="d-flex justify-content-start">
                    <div className="p-3 d-flex align-items-center">
                      {movie.vote_average && (
                        <span
                          className="p-2 rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            height: "65px",
                            width: "65px",
                            backgroundColor: "#F1F1F1",
                            color: "black",
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
                            style={{ height: "60px", width: "60px" }}
                          />
                          {movie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="p-3 d-flex align-items-center">
                      {movie.videos && (
                        <BiPlayCircle
                          style={{
                            fontSize: "75px",
                            color: "#F1F1F1",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  {show === "tv" ? (
                    movie.created_by && movie.created_by.length > 0 ? (
                      <div className="p-2">
                        <strong>Created by: </strong>
                        <span style={{ color: "#B4B3B3" }}>
                          {movie.created_by.map((creator, index) => (
                            <span key={creator.id}>
                              {creator.name}
                              {index !== movie.created_by.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : (
                      <div className="p-2">
                        <strong>Created by: </strong>
                        Unknown
                      </div>
                    )
                  ) : null}
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Directors: </strong>
                      <span style={{ color: "#B4B3B3" }}>
                        {getDirectors(movie.credits) || "Unknown"}
                      </span>
                    </div>
                  )}
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Writers: </strong>
                      <span style={{ color: "#B4B3B3" }}>
                        {getWriters(movie.credits) || "Unknown"}
                      </span>
                    </div>
                  )}
                  {loading ? (
                    <div className="p-2">
                      <Skeleton />
                    </div>
                  ) : (
                    <div className="p-2">
                      <strong>Language : </strong>
                      <span style={{ color: "#B4B3B3" }}>
                        {getLanguageName(movie.original_language) || "Unknown"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Overview */}
              <div>
                <div className="p-2">
                  {loading ? (
                    <Skeleton width={"25%"} />
                  ) : (
                    <h5 className="fw-bold">Overview : </h5>
                  )}
                  {loading ? (
                    <Skeleton count={5} />
                  ) : (
                    <span style={{ color: "#B4B3B3" }}>{movie.overview}</span>
                  )}
                </div>
              </div>
            </div>
            {/* Cast */}
            <div className="col-12 pt-2">
              <h2
                className="p-2 pt-4"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "bold",
                }}
              >
                Cast:-
              </h2>
              <hr className="m-0" />
              {loading ? (
                <Carousel
                  responsive={responsive}
                  deviceType={deviceType}
                  removeArrowOnDeviceType={["md", "sm", "xs", "lg", "xl"]}
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className="cast-Skeleton p-2 pt-4 text-center"
                    >
                      <div className="p-2 d-flex justify-content-center align-items-center border border-3 rounded-circle">
                        <Skeleton
                          circle
                          width={150}
                          height={150}
                          className=""
                        />
                      </div>
                      <div className="p-2">
                        <Skeleton count={2} />
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                movie.credits &&
                movie.credits.cast && (
                  <Carousel
                    responsive={responsive}
                    deviceType={deviceType}
                    removeArrowOnDeviceType={["md", "sm", "xs"]}
                  >
                    {movie.credits.cast.map((cast, index) => (
                      <div key={index} className="p-2 pt-4">
                        <div className="p-2 d-flex justify-content-center align-items-center rounded-circle">
                          {cast.profile_path ? (
                            <img
                              src={`${Cast_Image_Path}${cast.profile_path}`}
                              alt={cast.name}
                              width={150}
                              height={150}
                              className="rounded-circle border border-5"
                            />
                          ) : (
                            <img
                              src={profile}
                              alt={cast.name}
                              width={150}
                              height={150}
                              className="rounded-circle border border-5"
                            />
                          )}
                        </div>
                        <div className="p-2">
                          <div className="text-center fw-bold fs-4">
                            {cast.name}
                          </div>
                          <div
                            className="text-center fs-5"
                            style={{ color: "#B4B3B3" }}
                          >
                            {cast.character}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
