import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div id="nav">
        <div id="navbar">
          <NavLink className="navbar-link" to="/">
            Home
          </NavLink>
          <NavLink className="navbar-link" to="/day">
            Day View
          </NavLink>
          <NavLink className="navbar-link" to="/graphs">
            Distributions
          </NavLink>
        </div>
      </div>
    </>
  );
}
