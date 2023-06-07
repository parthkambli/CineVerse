import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [searchKey, steSearchKey] = useState("");
  const navigate = useNavigate();

  return (
    <nav
      className="navbar sticky-top navbar-expand-lg"
      style={{
        backgroundColor: "#00111E",
        boxShadow: "0 3px 10px black",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand p-0"
          to="/"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <img src={logo} alt="logo" height="35px" width="35px" />
          <span
            className="ps-1"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: "bold",
              background: "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            INEVERSE
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/tv">
                Tv Shows
              </Link>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            onSubmit={() =>
              navigate(`/search/${encodeURIComponent(searchKey)}`)
            }
          >
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              style={{ backgroundColor: "#f1f1f1" }}
              value={searchKey}
              onChange={(e) => steSearchKey(e.target.value)}
            />
            <button
              className="btn"
              type="submit"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                color: "#F1F1F1",
                border: "1px solid white",
                cursor: "pointer",
              }}
            >
              <FaSearch className="fs-4" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
