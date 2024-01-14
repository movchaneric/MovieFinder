import WatchedMovieItem from "./WatchedMovieItem";

const WatchedMoviesList = ({
  watched,
  userStarRating,
  deleteMovieFromWatchedList,
}) => {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovieItem
            movie={movie}
            key={movie.imdbID}
            userStarRating={userStarRating}
            deleteMovieFromWatchedList={deleteMovieFromWatchedList}
          />
        ))}
      </ul>
    </>
  );
};

export default WatchedMoviesList;
