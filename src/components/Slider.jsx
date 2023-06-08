import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

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
    <Carousel
      responsive={responsive}
      deviceType={deviceType}
      removeArrowOnDeviceType={["md", "sm", "xs"]}
    >
      {loading
        ? Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className=" px-4">
              <SkeletonCard />
            </div>
          ))
        : movies.map((movie) => (
            <div key={movie.id} className=" px-4">
              <MovieCard movie={movie} show={show} />
            </div>
          ))}
    </Carousel>
  );
};

export default Slider;
