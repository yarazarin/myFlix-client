import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import { ProfileView } from "../ProfileView/ProfileView";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import p from "../../img/p.png";
import SearchMovies from "../SearchMovies/SearchMovies";

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [viewMovies, setViewMovies] = useState([]);

  const MovieViewWrapper = () => {
    const { id } = useParams();
    const movieId = decodeURIComponent(id);
    const movie = viewMovies.find((movie) => movie.id === movieId);
    if (!movie) {
      return <div>It seems you need to login first.</div>;
    }
    return (
      <MovieView
        movie={{ ...movie, _id: movie.id }}
        addMovieToFavorites={addMovieToFavorites}
      />
    );
  };

  const addMovieToFavorites = (movieId) => {
    fetch(
      `https://movie-api-cq59.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-cq59.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromAPI = data.map((movie) => {
          const { _id, Title, Director, imagePath, Description, Genre } = movie;
          return {
            id: _id,
            title: Title,
            director: Director.Name,
            image: imagePath,
            description: Description,
            genre: Genre.Name,
          };
        });
        setViewMovies(moviesFromAPI);
      });
  }, [token]);

  const removeMovieFromFavorites = (movieId) => {
    fetch(
      `https://movie-api-cq59.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserDelete = () => {
    setUser(null);
  };

  return (
    <>
      <Router>
        <NavBar user={user} setUser={setUser} setToken={setToken} />
        <img src={p} alt="" className="main-background" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !user ? (
                <Row
                  className="justify-content-center align-items-center"
                  style={{ height: "70vh" }}
                >
                  <Col xs={12} md={3}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                </Row>
              ) : (
                <Navigate to="/movies" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? (
                <Row
                  className="justify-content-center align-items-center"
                  style={{ height: "70vh" }}
                >
                  <Col xs={12} md={3}>
                    <SignupView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                </Row>
              ) : (
                <Navigate to="/movies" replace />
              )
            }
          />
          <Route
            path="/movies"
            element={
              !user ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <div className="search-container">
                    <SearchMovies movies={viewMovies} />
                  </div>
                  <h3>Movies</h3>
                  <Container
                    fluid
                    className="d-flex justify-content-between align-items-center mb-4 mt-0"
                  ></Container>
                  {viewMovies.length === 0 ? (
                    <div>Empty!</div>
                  ) : (
                    <Container fluid>
                      <Row
                        xs={1}
                        md={6}
                        className="justify-content-center align-items-center"
                      >
                        {viewMovies.map((movie) => (
                          <Col key={movie.id} className="mb-4" md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  )}
                </>
              )
            }
          />
          <Route
            path="/movie/:id"
            element={
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <Container fluid className="bg-dark p-4 rounded-lg shadow">
                    <Col>
                      <MovieViewWrapper />
                    </Col>
                  </Container>
                </div>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  setUser={setUser}
                  setViewMovies={setViewMovies}
                  deleteUser={handleUserDelete}
                  removeMovieFromFavorites={removeMovieFromFavorites}
                />
              )
            }
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
