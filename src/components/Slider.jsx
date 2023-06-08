import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MovieCard from "./MovieCard";

const Slider = ({ movies, show, deviceType }) => {
  const { loading } = useContext(GlobalContext);

  const responsive = {
    xl: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
    },
    lg: {
      breakpoint: { max: 1199, min: 992 },
      items: 3,
    },
    md: {
      breakpoint: { max: 991, min: 768 },
      items: 2,
    },
    sm: {
      breakpoint: { max: 767, min: 576 },
      items: 1,
    },
    xs: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {loading ? (
        <Carousel
          responsive={responsive}
          keyBoardControl={true}
          deviceType={deviceType}
          removeArrowOnDeviceType={["md", "sm", "xs", "lg", "xl"]}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>
              <div className="p-3 d-flex justify-content-between">
                <div className="card text-bg-dark rounded-4 ">
                  <Skeleton
                    height={300}
                    width={300}
                    className="img-fluid card-img rounded-4"
                  />
                </div>
              </div>
              <h4 className="text-center px-4">
                <Skeleton />
              </h4>
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel
          responsive={responsive}
          deviceType={deviceType}
          infinite={true}
          removeArrowOnDeviceType={["md", "sm", "xs"]}
        >
          {movies.map((movie) => (
            <div key={movie.id} className=" px-4">
              <MovieCard movie={movie} show={show} />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Slider;
