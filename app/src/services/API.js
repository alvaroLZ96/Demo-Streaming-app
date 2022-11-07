import React from "react";

export const getMovie = async (param) => {
  const data = await fetch(`http://localhost:8080/entries/${param}`);
  const res = await data.json();
  return res;
};

/**
 * Get movies
 *
 * @param page
 * @param limit
 * @param sortCriteria
 * @param order
 * @param releaseYear
 * @returns
 */
export const getShows = async (
  page,
  limit,
  sortCriteria,
  order,
  releaseYear
) => {
  const programType = "series";

  // https://github.com/typicode/json-server

  const data = await fetch(
    `http://localhost:8080/entries?_page=${page}&_limit=${limit}&_sort=${sortCriteria}&_order=${order}&programType=${programType}&releaseYear_gte=${releaseYear}`
  );
  const res = await data.json();
  return res;
};

export const getMovies = async (
  page,
  limit,
  sortCriteria,
  order,
  releaseYear
) => {
  const programType = "movie";

  // https://github.com/typicode/json-server

  const data = await fetch(
    `http://localhost:8080/entries?_page=${page}&_limit=${limit}&_sort=${sortCriteria}&_order=${order}&programType=${programType}&releaseYear_gte=${releaseYear}`
  );
  const res = await data.json();
  return res;
};
