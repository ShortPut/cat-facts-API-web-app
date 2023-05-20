import React from "react";

import classes from "./CatFact.module.css";

const CatFact = (props) => {
  return (
    <li className={classes.catFact}>
      <h2>Your Cat Fact</h2>
      <p>{props.catFact}</p>
    </li>
  );
};

export default CatFact;
