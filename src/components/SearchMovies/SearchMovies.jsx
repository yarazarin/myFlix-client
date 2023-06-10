import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="search-results">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SearchMovies;
