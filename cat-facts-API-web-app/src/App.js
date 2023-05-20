import React, { useState, useEffect, useCallback } from "react";

import CatFact from "./components/CatFact";
import CatFactList from "./components/CatFactList";
import "./App.css";
import AddFact from "./components/AddFact";

function App() {
  const [catFact, setCatFact] = useState([]);
  const [catFacts, setCatFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFactPublicHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://meowfacts.herokuapp.com/?id=${event.target[0].value}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const catData = await response.json();

      const catFact = catData.data[0];

      setCatFact(catFact);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const getRandFactPublicHandler = useCallback(async function () {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const catData = await response.json();

      const catFact = catData.data[0];

      setCatFact(catFact);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const addFactHandler = async (fact) => {
    const response = await fetch("YOUR DATABASE", {
      method: "POST",
      body: JSON.stringify(fact),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  };

  const getFactPrivateHandler = async (event) => {
    event.preventDefault();
    const factId = event.target[0].value;
    const loadedFacts = [];
    setCatFacts(loadedFacts);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("YOUR DATABASE");
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const catDataPrivate = await response.json();

      loadedFacts.push({
        id: factId,
        name: catDataPrivate[factId].name,
        factText: catDataPrivate[factId].factText,
        date: catDataPrivate[factId].date,
      });

      setCatFacts(loadedFacts);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const getAllFactsPrivateHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("YOUR DATABASE");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedFacts = [];

      for (const key in data) {
        loadedFacts.push({
          id: key,
          name: data[key].name,
          factText: data[key].factText,
          date: data[key].date,
        });
      }

      setCatFacts(loadedFacts);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getAllFactsPrivateHandler();
  }, [getAllFactsPrivateHandler]);

  useEffect(() => {
    getRandFactPublicHandler();
  }, [getRandFactPublicHandler]);

  return (
    <React.Fragment>
      <section>
        <div class="flexbox">
          <form onSubmit={getFactPublicHandler}>
            <input type="number" min="0" />
            <button type="submit">
              Get a Cat Fact Associated with a Number &#x1F431;
            </button>
          </form>
        </div>
        <button onClick={getRandFactPublicHandler}>
          Get a Random Cat Fact &#x1F431;
        </button>
        {!loading && catFact.length > 0 && <CatFact catFact={catFact} />}
        {!loading && catFact.length === 0 && !error && (
          <p>No cat facts found.</p>
        )}
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
      </section>
      <section>
        <AddFact onAddFact={addFactHandler} />
      </section>
      <section>
        <div>
          <form onSubmit={getFactPrivateHandler}>
            <input type="text" />
            <button type="submit">Retreive Saved Fact with ID &#x1F431;</button>
          </form>
          <button onClick={getAllFactsPrivateHandler}>
            Retreive ALL Saved Facts &#x1F431;
          </button>
        </div>
        {!loading && catFacts.length > 0 && <CatFactList catFacts={catFacts} />}
        {!loading && catFacts.length === 0 && !error && (
          <p>No cat facts found.</p>
        )}
        {loading && <p>Loading...</p>}
        {error && !loading && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
