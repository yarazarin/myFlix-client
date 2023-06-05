import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  // const [bookmarked, setBookmarked] = useState(false);
  // const handleBookmarkClick = () => {
  //   setBookmarked(!bookmarked);
  // };
  return (
    <>
      <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
        <Card style={{ minHeight: "320px", textAlign: "center" }}>
          <Card.Img src={movie.image} />
          <Card.Body>
            <Card.Title style={{ fontSize: "1.2rem" }}>
              {movie.title}
            </Card.Title>
            <Card.Text>{movie.director}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      {/* <button
        className={`fa ${bookmarked ? "fa-solid fa fa-check" : "fa fa-plus"}`}
        style={{
          position: "relative",
          fontSize: "1rem",
          bottom: "15px",
          border: "none",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          boxShadow: "0 0 0 1px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
        onClick={handleBookmarkClick}
      /> */}
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
