import React from "react";
import "./Carousel.css";
import AliceCarousel from "react-alice-carousel";

const Carousel = ({ data }) => {
  const formatDate = (string) => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(string).toLocaleDateString([], options);
  };

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
        <div className="latest">
          {" "}
          product Name: <span className="latestName"> {d.product} </span>
        </div>
        <div className="latest">
          {" "}
          Time: <span className="latestName">{formatDate(d.created)}</span>{" "}
        </div>
        <div className="latest">
          {" "}
          SOLD: <span className="latestName">{d.sold}</span>{" "}
        </div>
        <div className="latest">
          {" "}
          Purchased: <span className="latestName">{d.purchased}</span>{" "}
        </div>
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
    <>
      <h2
        style={{
          textAlign: "center",
          color: "blue",
          fontSize: "2rem",
          textTransform: "uppercase",
        }}
      >
        Latest Inventory entries
      </h2>
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
    </>
  );
};

export default Carousel;
