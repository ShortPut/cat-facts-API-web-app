import React, { useRef } from "react";

import classes from "./AddFact.module.css";

function AddFact(props) {
  const nameRef = useRef("");
  const factRef = useRef("");
  const dateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const fact = {
      name: nameRef.current.value,
      factText: factRef.current.value,
      date: dateRef.current.value,
    };

    props.onAddFact(fact);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="Name">Name this fact</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="fact-text">
          Enter a Cat Fact You Want to Save Here
        </label>
        <textarea rows="4" id="fact-text" ref={factRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Date</label>
        <input type="text" id="date" ref={dateRef} />
      </div>
      <button>Save/Add Cat Fact &#x1F431;</button>
    </form>
  );
}

export default AddFact;
