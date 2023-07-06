import React from "react";
import "./App.css";
import "h8k-components";

import { Movieform, Movieslist, Search } from "./components";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

const title = "Favorite Movie Directory";

export const MoviesContext = createContext(null);

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const result = moviesList.filter((movies) =>
        movies.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSearchedList(result);
    } else {
      setSearchedList(moviesList);
    }
  }, [searchTerm, moviesList]);

  const context_value = {
    moviesList,
    setMoviesList,
    searchTerm,
    setSearchTerm,
    searchedList,
  };

  return (
    <MoviesContext.Provider value={context_value}>
      <div>
        <h8k-navbar header={title} />
        <div className="layout-row justify-content-center mt-100">
          <div className="w-30 mr-75">
            <Movieform />
          </div>
          <div className="layout-column w-30">
            <Search />

            {searchedList.length ? <Movieslist /> : null}
            {searchTerm.length >= 2 ? (
              <div data-testid="noResult">
                <h3 className="text-center">No Results Found</h3>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MoviesContext.Provider>
  );
}

export default App;
