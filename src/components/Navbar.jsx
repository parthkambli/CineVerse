import logo from "../assets/Logo.png";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      data-bs-theme="dark"
      style={{ backgroundColor: "#082032" }}
    >
      <div className="container">
        <a
          className="navbar-brand p-0"
          href="/"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <img src={logo} alt="logo" height="35px" width="35px" />
          <span
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
        </a>
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
              <a className="nav-link active" aria-current="page" href="/">
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Tv Shows
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              style={{ backgroundColor: "#f1f1f1" }}
            />
            <button
              className="btn"
              type="submit"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #FF2E06, #F1D00A)",
                color: "#ffffff",
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
