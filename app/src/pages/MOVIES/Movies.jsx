import React from "react";
import { useState, useEffect } from "react";
import { getMovies } from "../../services/API";
import "./styles.css";

let limit = 20;
let page = 1;
const releaseYear = 2010;
const sortCriteria = "title";
const order = "asc"; // asc o desc

const Movies = () => {
  const [moviesList, setMovieList] = useState([]);
  const [notMoreItems, setNotMoreItems] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popupContent, setPopupContent] = useState([]);

  const changeContent = (serie) => {
    setPopupContent([serie]);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    //aquí hace la primera llamada que devuelve los primeros 20 items
    (async () => {
      // Obtengo las películas usando el nuevo método del servicio API
      const movies = await getMovies(
        page,
        limit,
        sortCriteria,
        order,
        releaseYear
      );
      setNotMoreItems(movies.length < limit); //  las movies pintadas deben ser inferiores al limite .si me devuelve 15 el server>>es TRUE el estado
      setMovieList(movies);
    })();
  }, []);

  const intGetMovies = async () => {
    //se le llama a esta función cuando el usuario cambia de pag o cambia el número de cards que pinta
    // Obtengo las películas usando el nuevo método del servicio API
    const movies = await getMovies(
      page,
      limit,
      sortCriteria,
      order,
      releaseYear
    ); // luego en el useeffect se trae las movies y mete por parametros todos los declarados anteriormente en la api con @

    setNotMoreItems(movies.length < limit); //  las movies pintadas deben ser inferiores al limite
    setMovieList(movies); //y una vez hecho el filtro las pinto(?)
  };

  const onPreviousPage = async () => {
    //esta no necesita ser asincrona porque depende de la de getMovies que es la que hace el fecth
    if (page <= 1) {
      return; //si la pag es = o menor a 1 entonces me quedo igual
    }

    page--; //si no, una página menos. No me hace falta poner un else.

    await intGetMovies(); //dudas con el await
  };

  const onNextPage = async () => {
    if (notMoreItems)
      //aquí not moreitems por estado inicial está en false
      return; //al no haber mas items, me quedo igual

    page++; //si no, una página más

    await intGetMovies();
  };

  const onChangeLimit = async (event) => {
    const value = event.target.value;

    page = 1; //vuleve a la pag 1 para devolverme los primeros items
    limit = value; //si meto 20 el límite tendrá que ser 20. al cambiar este límite accedo a la función de inget que cambia la condicion de setNotMoreitems o directamente el useffect?

    setMovieList([]);
    await intGetMovies();
  };

  return (
    <>
      <div className="divmoviestitle">
        <span className="seriesTitle"> Popular Movies</span>
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
        <div className="salsaPicante">
          <div className="moviesList">
            {moviesList.map((movie) => (
              <div className="divimg" key={movie.title}>
                <img
                  src={movie.images["Poster Art"].url}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = "/claqueta.png";
                  }}
                />
                <button
                  className="modalButton"
                  onClick={() => {
                    changeContent(movie);
                    //setOpenModal(true);
                  }}
                >
                  <h3>{movie.title}</h3>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/*   <Popup
          open={openModal}
          onClose={() => changeContent}
          items={popupContent}
        ></Popup> */}
        {openModal && (
          <div className="popupContainer" onClick={changeContent}>
            {/* se deberia cerrar al pulsar cualquier parte del modal */}
            <div className="popupbody" onClick={(e) => e.stopPropagation()}>
              {/* si no pongo stop stopPropagation este div llama al padre */}
              <div className="popupHeader">
                <button className="closePopupBtn" onClick={changeContent}>
                  X
                </button>
              </div>
              <div className="popupContent">
                {popupContent.map((pop) => {
                  return (
                    <div className="popupCard">
                      <h3>{pop.title}</h3>
                      <p>{pop.description}</p>
                      <p>Release Year:{pop.releaseYear}</p>
                      <img src={pop.images["Poster Art"].url} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="pager">
          <button onClick={onPreviousPage}>Prev Page</button>

          <button onClick={onNextPage}>Next Page</button>
        </div>
      </div>
    </>
  );
};

export default Movies;
