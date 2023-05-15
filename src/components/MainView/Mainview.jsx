import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import PropTypes from 'prop-types';

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




// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import MovieCard from "../MovieCard/MovieCard";
// import MovieView from "../MovieView/MovieView";

// const MainView = () => {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   useEffect(() => {
//     fetch("https://evening-inlet-09970.herokuapp.com/movies")
//       .then((response) => response.json())
//       .then((data) => {
//         const moviesFromAPI = data.map((movie) => ({
//           id: movie._id,
//           title: movie.Title,
//           director: movie.Director.name,
//           image: movie.imagePath,
//           description: movie.Description,
//           genre: movie.Genre.name,
//         }));
//         setMovies(moviesFromAPI);
//       });
//   }, []);

//   const handleMovieClick = (newSelectedMovie) => {
//     setSelectedMovie(newSelectedMovie);
//   };

//   const handleBackClick = () => {
//     setSelectedMovie(null);
//   };

//   if (selectedMovie) {
//     return <MovieView movie={selectedMovie} onBackClick={handleBackClick} />;
//   }

//   if (movies.length === 0) {
//     return <div>Empty!</div>;
//   }

//   return (
//     <div>
//       <div className="main__title">myFlix</div>
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.id}
//           movie={movie}
//           onMovieClick={handleMovieClick}
//         />
//       ))}
//     </div>
//   );
// };

// MainView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       director: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       genre: PropTypes.string.isRequired,
//     })
//   ),
// };

// export default MainView;
