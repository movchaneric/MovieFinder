const WatchedMovieItem = ({ movie, deleteMovieFromWatchedList }) => {
  return (
    <>
      <li key={movie.imdbId}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>

        <button className="btn-delete" onClick={() => deleteMovieFromWatchedList(movie.imdbId)}>X</button>
      </li>
    </>
  );
};

export default WatchedMovieItem;
