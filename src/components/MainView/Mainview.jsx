import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
            director: Director.Name,
            image: imagePath,
            description: Description,
            genre: Genre.Name,
          };
        });
        setMovies(moviesFromAPI);
      });
  }, [token]);

  if (!user) {
    return (
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
    );
  }

  if (selectedMovie) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Container
          fluid
          className="bg-light p-4 rounded-lg shadow"
          style={{ maxWidth: "800px", textAlign: "center" }}
        >
          <Col>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </Container>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>Empty!</div>;
  }

  return (
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

      <Container fluid>
        <Row
          xs={1}
          md={6}
          className="justify-content-center align-items-center"
        >
          {movies.map((movie) => (
            <Col key={movie.id} className="mb-4" md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MainView;
