import React from "react";

const Card = ({ index, name }) => {
  return (
    <div
      style={{
        border: "1px solid grey",
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: 10 }}>{index}.</h1>
      <p>{name}</p>
    </div>
  );
};

export default Card;
