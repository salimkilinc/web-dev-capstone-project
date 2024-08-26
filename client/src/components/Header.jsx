import React from "react";
import { NavLink } from "react-router-dom";
import SquareIcon from "@mui/icons-material/Square";

function Header() {
  return (
    <header>
      <div className="name-quote">
        <NavLink to="/">
          <h1 className="name">
            <SquareIcon className="box" /> Salim Kılınç{" "}
            <span className="job"> / WEB DEVELOPER</span>
          </h1>
        </NavLink>
        <p className="quote">
          <SquareIcon className="box" style={{ height: "0px" }} /> Good artists
          borrow, great artists steal.
        </p>
      </div>
      <div className="nav">
        <ul className="menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "current-page" : "")}
            >
              ABOUT ME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cv"
              className={({ isActive }) => (isActive ? "current-page" : "")}
            >
              CV
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "current-page" : "")}
            >
              PROJECTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "current-page" : "")}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
      <hr className="header-hr" />
    </header>
  );
}

export default Header;
