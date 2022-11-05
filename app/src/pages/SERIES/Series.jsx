import React from "react";
import { useState, useEffect } from "react";
import { getMovie } from "../../services/API";
import { Link } from "react-router-dom";
import "./styles.css";
import { filterandsort } from "../../utils/filterandsort";
/* import Popup from "../../components/Popup"; */

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
    <div>
      <h1> SERIES</h1>
      <ul>
        {seriesList /* .slice(0, 20) */
          .map((serie) => (
            <li key={serie.title}>
              <button
                className="modalButton"
                onClick={() => {
                  setOpenModal(true);
                  setModalData(serie);
                }}
              >
                <h3>{serie.title}</h3>
              </button>
              {/*  <Link to={`/series/${serie.title}`}> */}
              <img
                src={serie.images["Poster Art"].url}
                alternative={serie.title}
              />
              <Popup
                item={serie}
                open={openModal}
                onClose={() => setOpenModal(false)}
              >
                <h1>{modalData.title}</h1>
                <img src={modalData.images["Poster Art"].url} />
              </Popup>
              {/*     </Link> */}
            </li>
          ))}
      </ul>
      {/* <button>al pulsar aquí me hace un slice(0,40)</button> */}
    </div>
  );
};

export default Series;
