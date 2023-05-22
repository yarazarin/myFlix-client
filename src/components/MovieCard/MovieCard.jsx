import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      onClick={() => onMovieClick(movie)}
      style={{ minHeight: "320px", textAlign: "center" }}
    >
      <Card.Img src={movie.image} />
      <Card.Body>
        <Card.Title style={{ fontSize: "1.2rem" }}>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
      </Card.Body>
    </Card>
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
