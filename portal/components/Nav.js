import { useEffect, useState } from "react";
import styles from "../styles/Nav.module.scss";

export const Nav = () => {
  const [whiteNavbar, setWhiteNavbar] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      const scrollListener = () => {
        if (window.scrollY > 10) {
          setWhiteNavbar(true);
        } else {
          setWhiteNavbar(false);
        }
      };

      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    } else {
      setWhiteNavbar(true);
    }
  }, []);

  return (
    <>
      <nav
        className={`navbar fixed-top navbar-expand-lg ${
          whiteNavbar ? "navbar-light bg-light" : "navbar-dark"
        } ${styles.navheader}`}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontSize: "36px", fontWeight: "800" }}
          >
            APC<span style={{ color: "#eb1561" }}>Repo</span>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Documentation</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Organizations
                </a>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};
