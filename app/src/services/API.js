import React from "react";

export const getMovie = async (param) => {
  const data = await fetch(
    `https://demo-streaming-app-production.up.railway.app/entries/${param}`
  );
  const res = await data.json();
  return res;
};

export const getShows = async (
  page,
  limit,
  sortCriteria,
  order,
  releaseYear
) => {
  const programType = "series";

  const data = await fetch(
    `https://demo-streaming-app-production.up.railway.app/entries?_page=${page}&_limit=${limit}&_sort=${sortCriteria}&_order=${order}&programType=${programType}&releaseYear_gte=${releaseYear}`
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

  const data = await fetch(
    `https://demo-streaming-app-production.up.railway.app/entries?_page=${page}&_limit=${limit}&_sort=${sortCriteria}&_order=${order}&programType=${programType}&releaseYear_gte=${releaseYear}`
  );
  const res = await data.json();
  return res;
};
