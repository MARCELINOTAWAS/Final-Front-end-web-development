import React, { Component } from "react";
import styles from "./Dashboard.module.scss";
import NavBar from "../NavBar/NavBar";
import FilterBar from "./FilterBar/FilterBar";
import CountryList from "./CountryList/CountryList";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    /* create a ref for scrolling functionality */
    this.scrollTo = React.createRef(null);
    this.state = {
      filteredCountries: null,
      countrySearchField: "",
      regionFilter: ""
    };
  }

  //update the state whenever the searchfield changes
  onCountrySearchFieldChange = country => {
    this.setState(
      () => ({ countrySearchField: country }),
      this.updateFilteredCountries
    );
  };

  //update region filter based on the dropdown menu's current item
  onRegionChange = region => {
    this.setState(
      () => ({ regionFilter: region }),
      this.updateFilteredCountries
    );
  };

  //update the filtered countries list based on the current state
  updateFilteredCountries = () => {
    this.setState((prevState, prevProps) => {
      const { totalCountries } = prevProps;
      const { countrySearchField, regionFilter } = prevState;
      //filter based on searchfield
      let filteredCountries = totalCountries.filter(country => {
        return country.name
          .toLowerCase()
          .includes(countrySearchField.toLowerCase());
      });
      //filter based on region
      if (regionFilter) {
        filteredCountries = filteredCountries.filter(country => {
          return country.region.toLowerCase() === regionFilter.toLowerCase();
        });
      }
      return { filteredCountries };
    });
  };

  componentDidMount() {
    //update the document's title right after the component is mounted
    document.title = "Where in the World ?";
  }

  render() {
    const { countrySearchField, filteredCountries, regionFilter } = this.state;
    const { totalCountries, homePage } = this.props;
    return (
      <React.Fragment>
        <header className={styles.dashboard}>
          <NavBar
            darkMode={this.props.darkMode}
            appModeChanger={this.props.appModeChanger}
            homePage={homePage}
          />
          <FilterBar
            countrySearchField={countrySearchField}
            darkMode={this.props.darkMode}
            regionFilter={regionFilter}
            onCountrySearchFieldChange={this.onCountrySearchFieldChange}
            onRegionChange={this.onRegionChange}
            scrollTo={this.scrollTo}
          />
        </header>
        <main
          className={`${styles.container} ${styles.dashboard} ${
            styles.fillTheRemainingHeight
          } ${this.props.darkMode ? `dark` : `light`}`}
        >
          <CountryList
            filteredCountries={
              filteredCountries ? filteredCountries : totalCountries
            }
            homePage={homePage}
            totalCountries={totalCountries}
            darkMode={this.props.darkMode}
            scrollTo={this.scrollTo}
          />
        </main>
      </React.Fragment>
    );
  }
}
export default Dashboard;
