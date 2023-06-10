import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchMovies = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  useEffect(() => {
    const filterMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filterMovies);
  }, [searchQuery, movies]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="search-movies">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>
      {searchQuery !== "" && (
        <div className="list-group">
          {filteredMovies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="list-group-item list-group-item-action"
            >
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchMovies;
