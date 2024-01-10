import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMovies = ({ watched }) => {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovieItem movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
};

export default WatchedMovies;
