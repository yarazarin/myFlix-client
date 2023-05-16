const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <>
      <div>
        <button
          className="movie__card"
          onClick={() => {
            onMovieClick(movie);
          }}
        >
          {movie.title}
        </button>
      </div>
    </>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
