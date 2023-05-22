import PropTypes from "prop-types";
import { Col, Container, Row, Button, Image } from "react-bootstrap";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <Row>
        <Col md={7} className="d-flex flex-column justify-content-center align-items-center">
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
          <Button onClick={onBackClick}>Back</Button>
          <br/>
        </Col>

        <Col md={5}>
          <Image src={movie.image} />
        </Col>
      </Row>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
