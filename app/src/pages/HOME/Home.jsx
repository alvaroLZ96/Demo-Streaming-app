import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
const Home = () => {
  return (
    <div className="homeDiv">
      <ul>
        <li className="cardHome1">
          <div>
            <NavLink to="series">Series</NavLink>
          </div>
        </li>
        <li className="cardHome2">
          <NavLink to="movies">Movies</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Home;
