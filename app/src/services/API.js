import React from "react";

export const getMovie = async (param) => {
  const data = await fetch(`http://localhost:8080/entries/${param}`);
  const res = await data.json();
  return res;
};
