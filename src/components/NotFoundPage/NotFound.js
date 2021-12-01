import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
const NotFound = ({ darkMode, homePage }) => (
  <main className={`${styles.notFoundPage} ${darkMode ? `dark` : `light`}`}>
    404 not found
    <Link to={homePage} className={darkMode ? "darkElements" : "lightElements"}>
      Go Back Home
    </Link>
  </main>
);

export default NotFound;
