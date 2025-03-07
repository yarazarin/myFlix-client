import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <>
      <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
        <Card
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "350px",
          }}
        >
          <Card.Img className="movie_card_images" src={movie.image} />
          <Card.Body>
            <Card.Title style={{ fontSize: "1.2rem" }}>
              {movie.title}
            </Card.Title>
            <Card.Text>{movie.director}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
};
export default MovieCard;
