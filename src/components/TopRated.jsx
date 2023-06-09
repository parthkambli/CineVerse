import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Slider from "./Slider";

const TopRated = () => {
  const { fetchTopRated, topRated } = useContext(GlobalContext);

  const [show, setShow] = useState("movie");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTopRated(show); // Pass the timeWindow as a parameter to fetchTrending
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleShowToggle = () => {
    setShow((prevShow) => (prevShow === "movie" ? "tv" : "movie"));
  };
  return (
    <div className="container">
      <div className="px-4 pb-2 d-flex justify-content-between align-items-end">
        <div className="align-items-end">
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: "bold",
            }}
          >
            Top Rated
          </h3>
        </div>
        <div
          className="btn-group rounded-pill justify-content-end p-1 m-2 "
          role="group"
          aria-label="Show"
          style={{ backgroundColor: "#F1F1F1" }}
        >
          <button
            type="button"
            className={"rounded-pill btn btn-sm"}
            style={
              show === "movie"
                ? {
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    backgroundImage:
                      "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                    color: "#F1F1F1",
                    border: "none",
                    cursor: "pointer",
                  }
                : {
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
            }
            onClick={handleShowToggle}
          >
            Movie
          </button>
          <button
            type="button"
            className={"rounded-pill btn btn-sm"}
            style={
              show === "tv"
                ? {
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    backgroundImage:
                      "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                    color: "#F1F1F1",
                    border: "none",
                    cursor: "pointer",
                  }
                : {
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
            }
            onClick={handleShowToggle}
          >
            TV
          </button>
        </div>
      </div>
      <Slider movies={topRated} show={show} loading={loading} />
    </div>
  );
};

export default TopRated;
