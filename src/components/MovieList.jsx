import FilmItem from "./FilmItem";

const MovieList = ({ movies, handleClickMovie }) => {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <FilmItem
            movie={movie}
            key={movie.imdbID}
            handleClickMovie={handleClickMovie}
          />
        ))}
      </ul>
    </>
  );
};
export default MovieList;
