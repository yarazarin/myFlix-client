import { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieView from "../MovieView/MovieView";

const MainView = () => {
  const [movies, setMovies] = useState(
    [
      {
        id: 1,
        title: "The Enchanted Voyage",
        director: "John Smith",
        image: "https://picsum.photos/300/300?random=1",
        description: "Magical journey with unexpected wonders",
        genre: "Fantasy",
      },
      {
        id: 2,
        title: "Rise of the Shadows",
        director: "Emily Johnson",
        image: "https://picsum.photos/300/300?random=2",
        description: "Battle against impending darkness",
        genre: "Action",
      },
      {
        id: 3,
        title: "Lost in Time",
        director: "Michael Anderson",
        image: "https://picsum.photos/300/300?random=3",
        description: "Time-travel adventure with unforeseen consequences",
        genre: "Sci-Fi",
      },
      {
        id: 4,
        title: "The Forgotten Kingdom",
        director: "Sarah Williams",
        image: "https://picsum.photos/300/300?random=4",
        description: "Uncover the secrets of a long-lost kingdom",
        genre: "Adventure",
      },
      {
        id: 5,
        title: "Echoes of Destiny",
        director: "Robert Thompson",
        image: "https://picsum.photos/300/300?random=5",
        description: "Fate intertwined in a mesmerizing tale",
        genre: "Drama",
      },
    ],
  );

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>Empty!</div>;
  }

  return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
  );
};

export default MainView;
