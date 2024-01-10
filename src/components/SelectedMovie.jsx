import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

import "../index.css";

const SelectedMovie = ({ selectMovieId, onCloseMovie, API_KEY }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const selectedMovieById = async () => {
      const res =
        await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectMovieId}
            `);
      const resData = await res.json();
      setMovie(resData);
      setIsLoading(false);
    };

    selectedMovieById();
  }, [API_KEY, selectMovieId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />

            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>{movie.Runtime}</p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Director: {movie.Director}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
