import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div id="navbar">
        <NavLink className="navbar-link" to="/">
          Home
        </NavLink>
        <NavLink className="navbar-link" to="/snapshot">
          Snapshot by Date
        </NavLink>
        <NavLink className="navbar-link" to="/startstop">
          Start and Stop Times View
        </NavLink>
        <NavLink className="navbar-link" to="/duration">
          Sessions per Duration
        </NavLink>
        <NavLink className="navbar-link" to="/providers">
          Sessions per Provider
        </NavLink>
        <NavLink className="navbar-link" to="/clinic">
          Sessions per Clinic
        </NavLink>
        <NavLink className="navbar-link" to="/birthyear">
          Sessions per Birth Year
        </NavLink>
      </div>
    </>
  );
}
