import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = ({ darkMode, appModeChanger, homePage }) => (
  <>
    <nav
      className={`${styles.container} ${styles.navBar} ${
        darkMode ? `dark darkElements` : `light lightElements`
      }`}
    >
      <Link to={homePage} className={styles.bold}>
        Where in the world?
      </Link>
      <button
        className={`${styles.semiBold} ${
          darkMode ? `dark darkElements` : `light lightElements`
        }`}
        onClick={appModeChanger}
      >{/* change the icons based on darkMode's state */}
        {darkMode ? (
          <>
            <i className="fas fa-moon"></i> Light Mode
          </>
        ) : (
          <>
            <i className="far fa-moon"></i> Dark Mode
          </>
        )}
      </button>
    </nav>
  </>
);

export default NavBar;
