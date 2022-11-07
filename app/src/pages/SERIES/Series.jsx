import React from "react";
import { useState, useEffect } from "react";
import { getShows } from "../../services/API";
import "./styles.css";
/* import Popup from "../../components/Popup"; */

let limit = 20;
let page = 1;
const releaseYear = 2010;
const sortCriteria = "title";
const order = "asc"; // asc o desc

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [popupContent, setPopupContent] = useState([]);
  const [notMoreItems, setNotMoreItems] = useState(false);

  const changeContent = (serie) => {
    setPopupContent([serie]);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    (async () => {
      // Obtengo las películas usando el nuevo método del servicio API
      const series = await getShows(
        page,
        limit,
        sortCriteria,
        order,
        releaseYear
      );

      setSeriesList(series);
    })();
  }, []);

  const intGetMovies = async () => {
    // Obtengo las películas usando el nuevo método del servicio API
    const series = await getShows(
      page,
      limit,
      sortCriteria,
      order,
      releaseYear
    );

    setNotMoreItems(series.length < limit); //  las series pintadas deben ser inferiores al limite
    setSeriesList(series); //y una vez hecho el filtro las pinto
  };

  const onPreviousPage = async () => {
    if (page <= 1) {
      return; //si la pag es = o menor a 1 entonces me quedo igual
    }

    page--; //si no, una página menos

    await intGetMovies(); // no es necesario realmente que esta función sea asíncrona
  };

  const onNextPage = async () => {
    if (notMoreItems) return; //al no haber mas items, me quedo igual

    page++; //si no, una página más

    await intGetMovies();
  };

  const onChangeLimit = async (event) => {
    const value = event.target.value;

    page = 1; //es la primera pag porque me las pinta todas desde el principio
    limit = value;

    setSeriesList([]);
    await intGetMovies();
  };

  return (
    <>
      <div className="divseriestitle">
        <span className="seriesTitle"> Popular Series</span>
      </div>
      <div className="pager">
        <button onClick={onPreviousPage}>Prev Page</button>

        <select defaultValue={20} name="select" onChange={onChangeLimit}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <button onClick={onNextPage}>Next Page</button>
      </div>

      <div className="divList">
        <div className="seriesList">
          {seriesList.map((serie) => (
            <div className="divimg" key={serie.title}>
              <img
                src={serie.images["Poster Art"].url}
                alt={serie.title}
                onError={(e) => {
                  e.target.src = "/claqueta.png";
                }}
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
            </div>
          ))}
        </div>

        {/*   <Popup
          open={openModal}
          onClose={() => changeContent}
          items={popupContent}
        ></Popup> */}
        {openModal && (
          <div className="popupContainer" onClick={changeContent}>
            <div className="popupbody" onClick={(e) => e.stopPropagation()}>
              <div className="popupHeader">
                <button className="closePopupBtn" onClick={changeContent}>
                  X
                </button>
              </div>
              <div className="popupContent">
                {popupContent.map((pop) => {
                  return (
                    <div className="popupCard">
                      <h3> {pop.title}</h3>
                      <p>{pop.description}</p>
                      <p>Release Year:{pop.releaseYear}</p>
                      <img
                        src={pop.images["Poster Art"].url}
                        onError={(e) => {
                          e.target.src = "/claqueta.png";
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pager">
        <button onClick={onPreviousPage}>Prev Page</button>

        <button onClick={onNextPage}>Next Page</button>
      </div>
    </>
  );
};

export default Series;
