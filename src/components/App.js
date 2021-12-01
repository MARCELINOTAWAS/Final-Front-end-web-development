import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import CountryDetails from "./CountryDetails/CountryDetails";
import NotFound from "./NotFoundPage/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    //determine the homepage path based on the development mode
    this.homePage =
      process.env.NODE_ENV === "development"
        ? "/"
        : "/REST-Countries-API-with-color-theme-switcher/";
  }
  state = {
    darkMode: true,
    totalCountries: []
  };
  //change the darkmode state based on user interaction
  appModeChanger = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }));
  };

  componentDidMount() {
    // fetch the countrylist's data from the api
    // we saved the json file in another repository on github cause the original api was broken somehow
    axios
      .get(
        `https://raw.githubusercontent.com/sinamoraddar/REST-Countries-API-with-color-theme-switcher--API/master/all.json`
      )
      .then(res => {
        this.setState(() => ({
          totalCountries: res.data
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { darkMode, totalCountries } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={this.homePage}
            render={routeProps => (
              <Dashboard
                {...routeProps}
                appModeChanger={this.appModeChanger}
                darkMode={darkMode}
                homePage={this.homePage}
                totalCountries={totalCountries}
              />
            )}
          ></Route>
          <Route
            exact
            path={`${this.homePage}countries/:countryName`}
            render={routeProps => (
              <CountryDetails
                {...routeProps}
                darkMode={darkMode}
                homePage={this.homePage}
                appModeChanger={this.appModeChanger}
                totalCountries={totalCountries}
              />
            )}
          />
          <Route
            render={routeProps => (
              <NotFound
                {...routeProps}
                darkMode={darkMode}
                homePage={this.homePage}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
