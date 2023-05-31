import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

export default MainView = () => {
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
            director: Director.Name,
            image: imagePath,
            description: Description,
            genre: Genre.Name,
          };
        });
        setMovies(moviesFromAPI);
      });
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Row
                  className="justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <Col xs={12} md={3}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                  <Col xs={12} md={5}>
                    <SignupView />
                  </Col>
                </Row>
              ) : (
                <Navigate to="/movies" replace />
              )
            }
          />
          <Route
            path="/movie/:title"
            element={
              selectedMovie && (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                  <Container
                    fluid
                    className="bg-light p-4 rounded-lg shadow"
                    style={{ maxWidth: "800px", textAlign: "center" }}
                  >
                    <Col>
                      <MovieView
                        movie={selectedMovie}
                        onBackClick={() => {
                          setSelectedMovie(null);
                          window.history.back();
                        }}
                      />
                    </Col>
                  </Container>
                </div>
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
                  <Container
                    fluid
                    className="d-flex justify-content-between align-items-center mb-4 mt-0"
                  >
                    <p className="display-4">myFlix</p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                  </Container>

                  {movies.length === 0 ? (
                    <div>Empty!</div>
                  ) : (
                    <Container fluid>
                      <Row
                        xs={1}
                        md={6}
                        className="justify-content-center align-items-center"
                      >
                        {movies.map((movie) => (
                          <Col key={movie.title} className="mb-4" md={3}>
                            {/* <Link to={`/movie/${movie.title}`}> */}
                            {/* <Link to={`/movie/${encodeURIComponent(movie.title + movie.id)}`}> */}
                            <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
                              <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                  setSelectedMovie(newSelectedMovie);
                                }}
                              />
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  )}
                </>
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
