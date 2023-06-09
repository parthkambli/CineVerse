import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { GlobalContext } from "../context/GlobalState";

const NowPlaying = () => {
  const { fetchNowPlaying, nowPlaying } = useContext(GlobalContext);

  const [show, setShow] = useState("/movie/now_playing");
  const [s, setS] = useState("movie");

  useEffect(() => {
    fetchNowPlaying(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleShowToggle = () => {
    setShow((prevShow) =>
      prevShow === "/movie/now_playing"
        ? "/tv/on_the_air"
        : "/movie/now_playing"
    );
    setS((prevS) => (prevS === "movie" ? "tv" : "movie"));
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
            Now Playing
          </h3>
        </div>
        <div className="justify-content-end">
          <div
            className="btn-group rounded-pill p-1 m-2 "
            role="group"
            aria-label="Show"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <button
              type="button"
              className={"rounded-pill btn btn-sm"}
              style={
                show === "/movie/now_playing"
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
                show === "/tv/on_the_air"
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
      </div>
      <Slider movies={nowPlaying} show={s} />
    </div>
  );
};

export default NowPlaying;
