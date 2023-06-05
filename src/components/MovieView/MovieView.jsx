import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieView = ({ movie, addMovieToFavorites }) => {
  return (
    <Row>
      <Col
        md={7}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div>
          <h2>{movie.title}</h2>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <br />
        <Button onClick={() => addMovieToFavorites(movie._id)}>
          Add to Favorites
        </Button>
        <Link to="/movies">
          <Button>Back</Button>
        </Link>
        <br />
      </Col>

      <Col md={5}>
        <Image src={movie.image} />
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  addMovieToFavorites: PropTypes.func.isRequired,
};

export default MovieView;
