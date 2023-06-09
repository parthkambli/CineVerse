import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { GlobalContext } from "../context/GlobalState";

const Trending = () => {
  const { fetchTrending, trending } = useContext(GlobalContext);

  const [timeWindow, setTimeWindow] = useState("day");
  // const [show, setShow] = useState("movie");

  useEffect(() => {
    fetchTrending(timeWindow);
    console.log(trending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeWindow]);

  const handleTimeWindowToggle = () => {
    setTimeWindow((prevTimeWindow) =>
      prevTimeWindow === "day" ? "week" : "day"
    );
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
            Trending
          </h3>
        </div>
        <div className="justify-content-end">
          <div
            className="btn-group rounded-pill p-1 m-2 "
            role="group"
            aria-label="TimeWindow"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <button
              type="button"
              className={"rounded-pill btn"}
              style={
                timeWindow === "day"
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
              onClick={handleTimeWindowToggle}
            >
              Todayay
            </button>
            <button
              type="button"
              className={"rounded-pill btn"}
              style={
                timeWindow === "week"
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
              onClick={handleTimeWindowToggle}
            >
              This Week
            </button>
          </div>
        </div>
      </div>
      <Slider movies={trending} />
    </div>
  );
};

export default Trending;
