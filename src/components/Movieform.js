import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { MoviesContext } from "../App";

function Movieform() {
  const [error, setError] = useState(false);
  const {  setMoviesList } = useContext(MoviesContext);
  const [newMovie, setNewMovie] = useState({
    name: "",
    rating: 0,
    duration: "",
  });

  function convertToMinutes(duration) {
    const durationRegex = /^(\d+(\.\d+)?)(h)$/;
    const match = duration.match(durationRegex);

    if (match) {
      const hours = parseFloat(match[1]);
      const minutes = hours * 60;
      setNewMovie(prev => ({...prev, duration:`${minutes}m`}))
    }

    return null;
  }

  function isValidDuration(value) {
    const durationRegex = /^\d+(\.\d+)?[hm]$/;
    return durationRegex.test(value);
  }
  const checkValidity = () => {
    return newMovie.name !== "" && newMovie.rating !== "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidDuration(newMovie.duration)) {
      setError(true);
      return;
    }
    if (!checkValidity) {
      return;
    }
    convertToMinutes(newMovie.duration);
    setMoviesList((prev) => [...prev, newMovie]);
    setNewMovie({ name: "", rating: 0, duration: "" });
  };

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={handleSubmit}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Movie Name"
              data-testid="nameInput"
              value={newMovie.name}
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
              value={newMovie.rating}
              onChange={(e) =>
                setNewMovie((prev) => ({ ...prev, rating: e.target.value }))
              }
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
              value={newMovie.duration}
              onChange={(e) => {
                setError(false);
                setNewMovie((prev) => ({ ...prev, duration: e.target.value }));
              }}
            />
          </div>
          {error ? (
            <div className="alert error mb-30" data-testid="alert">
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          ) : null}
          <div className="layout-row justify-content-end">
            <button type="submit" className="mx-0" data-testid="addButton">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Movieform;
