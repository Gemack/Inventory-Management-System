import React from "react";
import "./Carousel.css";
import AliceCarousel from "react-alice-carousel";

const Carousel = ({ data }) => {
  let items = data.map((d) => (
    <div
      style={{
        textTransform: "uppercase",
        margin: "3rem",
        color: "white",
        background: "blue",
        width: "15rem",
        height: "15rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30%",
      }}
    >
      <div>
        <span>{d.name}</span>
        <div style={{ color: "black" }}> available: {d.sum}</div>
      </div>
    </div>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        autoPlay
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
