import React from "react";
import { Link } from "react-router-dom";
import styles from "./BorderCountries.module.scss";

/* create the adjcent countries list
based on the borders of the current country */
const borderMaker = (totalCountries, countryDetails, darkMode, homePage) => {
  /*  create the adjacent countries list =>
  1- check through total countries list for those countries
  whose alpha3code is included in the borders list of the current country
  2-add the country to the borderCountries' list */
  let borderCountries = totalCountries.filter(country => {
    return countryDetails.borders.includes(country.alpha3Code);
  });
  /* create a seperate link for each country */
  borderCountries = borderCountries.map(country => (
    <Link
      to={`${homePage}countries/${country.name}`}
      key={country.name}
      className={darkMode ? `dark darkElements` : `light lightElements`}
    >
      {country.name}
    </Link>
  ));
  /* only return the list when the list isn't empty */
  return (
    borderCountries.length !== 0 && (
      <React.Fragment>
        <h3>Border Countries: </h3>
        <div> {borderCountries}</div>
      </React.Fragment>
    )
  );
};

//COMPONENT DECLARATION
const BorderCountries = ({
  totalCountries,
  countryDetails,
  darkMode,
  homePage
}) => (
  <div className={`${styles.borderCountries} ${darkMode ? "dark" : "light"}`}>
    {borderMaker(totalCountries, countryDetails, darkMode, homePage)}
  </div>
);

export default BorderCountries;
