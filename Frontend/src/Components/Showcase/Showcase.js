import React from "react";
import "./Showcase.css";
import Carousel from "../Carousel/Carousel";

const Showcase = ({ data }) => {
  return (
    <div className="Showcase">
      <Carousel data={data} />
    </div>
  );
};

export default Showcase;
