import React from "react";
import { useContext } from "react";
import { MoviesContext } from "../App";

function Movieslist() {
  const { searchedList } = useContext(MoviesContext);

// Ths component shows the list of added movies by the users
  return (
    <section>
      <ul className="styled w-100 pl-0" data-testid="moviesList">
        {searchedList.map((movie, index) => (
          <li
            key={index}
            className="flex slide-up-fade-in justify-content-between"
            style={{ borderBottom: "2px solid var(--primary-color)" }}
          >
            <div className="layout-column w-40">
              <h3 className="my-3">{movie.name}</h3>
              <p className="my-0">{movie.rating}/100</p>
            </div>
            <div className="layout-row my-auto mr-20">
              <p className="justify-content-end">{movie.duration}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Movieslist;
