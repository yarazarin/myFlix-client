import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import { propTypes } from "react-bootstrap/esm/Image";

export default MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [viewMovies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

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

  const MovieViewWrapper = () => {
    const { id } = useParams();
    const movieId = decodeURIComponent(id);
    const movie = viewMovies.find((movie) => movie.id === movieId);
    if (!movie) {
      return <div>Movie not found!</div>;
    }
    return <MovieView movie={movie} />;
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
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
                <Container
                  fluid
                  className="d-flex justify-content-between align-items-center mb-4 mt-0"
                >
                  <p className="display-6">Movies</p>
                </Container>

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

        <Route
          path="/movie/:id"
          element={
            <>
              <p className="display-6">The movie</p>
              <div className="d-flex justify-content-center align-items-center">
                <Container
                  fluid
                  className="bg-light p-4 rounded-lg shadow"
                  style={{ maxWidth: "800px", textAlign: "center" }}
                >
                  <Col>
                    <MovieViewWrapper />
                  </Col>
                </Container>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
