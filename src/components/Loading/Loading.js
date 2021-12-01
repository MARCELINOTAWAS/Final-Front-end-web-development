import React from "react";

const Loading = ({ darkMode }) => (
  <img
    className="loadingGif"
    src={`${process.env.PUBLIC_URL}/assets/pics/loading--${
      darkMode ? `dark` : `light`
    }.svg`}
    alt="loading"
  />
);
export default Loading;
