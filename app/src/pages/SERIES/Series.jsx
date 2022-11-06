import React from "react";
import { useState, useEffect } from "react";
import { getShows } from "../../services/API";
import "./styles.css";
import { filterandsort } from "../../utils/filterandsort";
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
    ); // luego en el useeffect se trae las series y mete por parametros todos los declarados anteriormente en la api con @

    setNotMoreItems(series.length < limit); //  las series pintadas deben ser inferiores al limite
    setSeriesList(series); //y una vez hecho el filtro las pinto(?)
  };

  const onPreviousPage = async () => {
    if (page <= 1) {
      return; //si la pag es = o menor a 1 entonces me quedo igual
    }

    page--; //si no, una página menos

    await intGetMovies(); //dudas con el await
  };

  const onNextPage = async () => {
    if (notMoreItems)
      //aquí not moreitems inlcuye a todas las series? es true?
      return; //al no haber mas items, me quedo igual

    page++; //si no, una página más

    await intGetMovies();
  };

  const onChangeLimit = async (event) => {
    const value = event.target.value;

    page = 1; //por que tiene que ser la página 1?
    limit = value; //si meto 20 el límite tendrá que ser 20. al cambiar este límite accedo a la función de inget que cambia la condicion de setNotMoreitems o directamente el useffect?

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
          {seriesList /* .slice(0, 20) */
            .map((serie) => (
              <div className="divimg" key={serie.title}>
                <img src={serie.images["Poster Art"].url} alt={serie.title} />
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
                      <h3>Name: {pop.title}</h3>
                      <p>Description:{pop.description}</p>
                      <p>Release Year:{pop.releaseYear}</p>
                      <img src={pop.images["Poster Art"].url} />
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
