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
    (async () => {
      const movies = await getMovies(
        page,
        limit,
        sortCriteria,
        order,
        releaseYear
      );
      setNotMoreItems(movies.length < limit); 
      setMovieList(movies);
    })();
  }, []);

  const intGetMovies = async () => {
  
    const movies = await getMovies(
      page,
      limit,
      sortCriteria,
      order,
      releaseYear
    ); 

    setNotMoreItems(movies.length < limit); 
    setMovieList(movies); 
  };

  const onPreviousPage = async () => {
    if (page <= 1) {
      return; 
    }

    page--; 

    await intGetMovies();
  };

  const onNextPage = async () => {
    if (notMoreItems)
      
      return;

    page++; 

    await intGetMovies();
  };

  const onChangeLimit = async (event) => {
    const value = event.target.value;

    page = 1; 
    limit = value;

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
                  }}
                >
                  <h3>{movie.title}</h3>
                </button>
              </div>
            ))}
          </div>
        </div>
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
