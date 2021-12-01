import React, { useState, useEffect } from "react";
import CountryItem from "./CountryItem/CountryItem";
import Loading from "../../Loading/Loading";
import Pagination from "./Pagination/Pagination";
import styles from "./CountryList.module.scss";

//create courntry  items
const countryItemCreator = (filteredCountries, currentPage, darkMode,homePage) => {
  //create the items by mapping over the filtered countries
  return filteredCountries
    .slice(currentPage * 8, currentPage * 8 + 8)
    .map(country => (
      <CountryItem key={country.name} {...country} darkMode={darkMode} homePage={homePage} />
    ));
};

//component declaration
const CountryList = ({ filteredCountries, darkMode, totalCountries,homePage ,scrollTo}) => {
  //declare the state properties using react hooks
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  //update totalpages whenever the filterd countries' list changes
  useEffect(() => {
    //calculate the number of totalpages if there are more than 8 countries available
    //otherwise set it to 1
    const tempTotalPages =
      filteredCountries.length > 8
        ? Math.ceil(filteredCountries.length / 8)
        : 1;
    setTotalPages(tempTotalPages);
  }, [filteredCountries]);
  //update the currentPage whenever the filteredcountries' list changes
  useEffect(() => {
    setCurrentPage(0);
  }, [filteredCountries]);
  return (
    <section className={styles.countryList}>
      {/* check if the countries have yet been fetched or not
        if not->show loading gif
        if they did->show the countries list
      */}
      {totalCountries.length > 0 ? (
        filteredCountries.length !== 0 ? (
          <React.Fragment>
            <div>
              {/* show only 8 countries per page based on the filtered countries' list*/}
              {countryItemCreator(filteredCountries, currentPage, darkMode,homePage)}
            </div>
            <Pagination
              currentPage={currentPage}
              darkMode={darkMode}
              /* we use scollTo ref for the auto scoll behavior */
              scrollTo={scrollTo}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </React.Fragment>
        ) : (
          <p className={styles.error}>
            Oops, we have no idea what you're talking about
            <br />
            Search for something else
          </p>
        )
      ) : (
        <Loading darkMode={darkMode} />
      )}
    </section>
  );
};
export default CountryList;
