import React from "react";
import { useState, useEffect } from "react";
import { getMovie } from "../../services/API";
import { Link } from "react-router-dom";
import "./styles.css";

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch(`http://localhost:8080/entries`);
      const res = await data.json();
      const series = res.filter((serie) => serie.programType == "series");
      setSeriesList(series);
    })();
  }, []);
  return (
    <div>
      <h1> SERIES</h1>
      <ul>
        {seriesList.map((serie) => (
          <li key={serie.title}>
            <h3>{serie.title}</h3>
            <Link to={`/series/${serie.title}`}>
              <img
                src={serie.images["Poster Art"].url}
                alternative={serie.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Series;
