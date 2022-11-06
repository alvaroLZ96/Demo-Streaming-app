import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
const Home = () => {
  return (
    <div className="homeDiv">
      <div className="popularTitles">Popular Titles</div>
      <ul>
        <li className="cardHome1">
          <div>
            <NavLink className={"link"} to="series">
              SERIES
            </NavLink>
          </div>
        </li>
        <li className="cardHome2">
          <div>
            <NavLink className={"link"} to="movies">
              MOVIES
            </NavLink>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
