import React from "react";
import { useState, useEffect } from "react";
import { getMovie } from "../../services/API";
import { Link } from "react-router-dom";
import "./styles.css";
import { filterandsort } from "../../utils/filterandsort";

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [popupContent, setPopupContent] = useState([]);

  const changeContent = (serie) => {
    setPopupContent([serie]);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `http://localhost:8080/entries ` /* ?programType=series` */
      );
      const res = await data.json();
      const newFilter = filterandsort(res, "series");
      setSeriesList(newFilter);
    })();
  }, []);
  return (
    <>
      <h1 className="seriesTitle"> POPULAR SERIES</h1>
      <div className="divList">
        <ul className="seriesList">
          {seriesList /* .slice(0, 20) */
            .map((serie) => (
              <li key={serie.title}>
                <img
                  src={serie.images["Poster Art"].url}
                  alternative={serie.title}
                />
                <button
                  className="modalButton"
                  onClick={() => {
                    changeContent(serie);
                    //setOpenModal(true);
                  }}
                >
                  <h3>{serie.title}</h3>
                </button>
              </li>
            ))}
        </ul>
        {openModal && (
          <div className="popupContainer" onClick={changeContent}>
            <div className="popupbody" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <button onClick={changeContent}>X</button>
              </div>
              <div className="popupContent">
                {popupContent.map((pop) => {
                  return (
                    <div className="popupCard">
                      <h3>Name: {pop.title}</h3>
                      <p>Description:{pop.description}</p>
                      <p>Release Year:{pop.releaseYear}s</p>
                      <img src={pop.images["Poster Art"].url} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/*  <Link to={`/series/${serie.title}`}> */}
        {/* <Popup item={serie} open={openModal} onClose={() => setOpenModal(false)}>
        <h1>{serie.title}</h1>
        <img src={serie.images["Poster Art"].url} />
      </Popup> */}
        {/* <button>al pulsar aquí me hace un slice(0,40)</button> */}
      </div>
    </>
  );
};

export default Series;
