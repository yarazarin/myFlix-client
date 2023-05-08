const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie__view">
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
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
      <button className="back-to" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};

export default MovieView;
