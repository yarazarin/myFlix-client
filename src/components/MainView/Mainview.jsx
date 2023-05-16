import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import PropTypes from "prop-types";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://evening-inlet-09970.herokuapp.com/movies")
      .then((respounse) => respounse.json())
      .then((data) => {
        const moviesFromAPI = data.map((movie) => {
          const { _id, Title, Director, imagePath, Description, Genre } = movie;
          return {
            id: _id,
            title: Title,
            director: Director.name,
            image: imagePath,
            description: Description,
            genre: Genre.name,
          };
        });
        setMovies(moviesFromAPI);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>Empty!</div>;
  }

  return (
    <div className="container_main">
      <div className="main__title">myFlix</div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      genre: PropTypes.string.isRequired,
    })
  ),
};

export default MainView;
