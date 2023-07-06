import React from "react";
import { useContext } from "react";
import { MoviesContext } from "../App";

function Search() {
  const { searchTerm, setSearchTerm } = useContext(MoviesContext);

  console.log(searchTerm);

  return (
    <section className="layout-row justify-content-center mb-40">
      <input
        type="text"
        placeholder="Search for movie by name"
        className="w-75 py-2"
        data-testid="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </section>
  );
}

export default Search;
