import "./MainView.scss"
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://evening-inlet-09970.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((respounse) => respounse.json())
      .then((data) => {
        console.log("data :", data);
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
  }, [token]);

  if (!user) {
    return (
      <div className="log__view">
        <h3>Log in!</h3>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <h3> Or Signup!</h3>
        <SignupView />
      </div>
    );
  }

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
      <br />
      <button
      className="submit__btn"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;
