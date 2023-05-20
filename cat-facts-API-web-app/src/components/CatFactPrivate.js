import React from "react";

import classes from "./CatFactPrivate.module.css";

const CatFactPrivate = (props) => {
  return (
    <li className={classes.catFactPrivate}>
      <h2>{props.name}</h2>
      <h3>{props.date}</h3>
      <h3>ID: {props.id}</h3>
      <p>{props.factText}</p>
    </li>
  );
};

export default CatFactPrivate;
