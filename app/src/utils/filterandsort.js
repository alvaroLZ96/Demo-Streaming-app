export const filterandsort = (array, show) => {
  return array
    .filter(
      (serie) => serie.programType === `${show}` && serie.releaseYear >= 2010
    )
    .sort((a, b) => {
      return a.title.toLowerCase() <= b.title.toLowerCase() ? -1 : 0;
    });
};
