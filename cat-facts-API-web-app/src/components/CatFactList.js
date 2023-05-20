import React from "react";

import CatFactPrivate from "./CatFactPrivate";
import classes from "./CatFactList.module.css";

const CatFactList = (props) => {
  return (
    <ul className={classes["cat-fact-list"]}>
      {props.catFacts.map((catFact) => (
        <CatFactPrivate
          id={catFact.id}
          name={catFact.name}
          factText={catFact.factText}
          date={catFact.date}
        />
      ))}
    </ul>
  );
};

export default CatFactList;
