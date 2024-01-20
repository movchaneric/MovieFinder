import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

import "../index.css";
import { useKey } from "./useKey";

const MovieDetail = ({
  selectMovieId,
  onCloseMovie,
  API_KEY,
  addMovieToWatchedList,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isSelectedMovieIsRated = watched
    .map((movie) => movie.imdbId)
    .includes(selectMovieId);

  const handleAddToList = () => {
    const newWatchedMovie = {
      imdbId: selectMovieId,
      Title: movie.Title,
      imdbRating: movie.imdbRating,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      Poster: movie.Poster,
      userRating: userRating,
    };
    addMovieToWatchedList(newWatchedMovie);
    onCloseMovie();
  };

  const ratedMovieStars = watched.find(
    (movie) => movie.imdbId === selectMovieId
  )?.userRating;

  useEffect(() => {
    setIsLoading(true);
    const selectedMovieById = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectMovieId}
            `
      );
      const resData = await res.json();
      setMovie(resData);
      setIsLoading(false);
    };

    selectedMovieById();
  }, [API_KEY, selectMovieId]);
  
  useKey("Escape", onCloseMovie);
  // useEffect(() => {
  //   document.addEventListener("keydown", (event) => {
  //     if (event.code === "Escape") {
  //       onCloseMovie(); //close movie detail function
  //       console.log("Closed.");
  //     }
  //   });

  //   return () => {
  //     document.removeEventListener("keydown", () => {
  //       document.addEventListener("keydown", (event) => {
  //         if (event.code === "Escape") {
  //           onCloseMovie(); //close movie detail function
  //           console.log("Closed.");
  //         }
  //       });
  //     });
  //   };
  // }, [onCloseMovie]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie: ${movie.Title}`;

    return () => {
      document.title = "🍿Movie Finder";
    };
  }, [movie.Title]);

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
            {/* User Star Rating */}

            <div className="rating">
              {!isSelectedMovieIsRated ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddToList}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie: {ratedMovieStars} 🌟</p>
              )}
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

export default MovieDetail;
