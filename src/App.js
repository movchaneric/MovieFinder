import { useEffect, useState } from "react";

import NavBar from "./components/Nav";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResutls from "./components/NumResults";
import Box from "./components/Box";
import WatchListBox from "./components/WatchListBox";
import MovieList from "./components/MovieList";
import WatchedSummery from "./components/ WatchedSummery";
import WatchedMoviesList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetail from "./components/MovieDetail";
//Custom hooks
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorage";

const App = () => {
  //watched, setWatched] = retured values from the custom hook.
  //Using custom hook instead of typting the whole login in app.js(more cleaner)
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");
  const [selectMovieId, setSelectMovieId] = useState(null);
  const [userStarRating, setUserStarRating] = useState("");

  //onCloseMovie function must be declared before passing it into useMovie
  //otherwise we had to use function named declation so we can type the useMovie first and pass the function name and then declare it.
  const onCloseMovie = () => {
    setSelectMovieId(null);
  };
  //Custom hook!
  const { movies, error, isLoading, API_KEY } = useMovies(query);

  const handleClickMovie = (id) => {
    setSelectMovieId((prevState) => (prevState !== id ? id : null));
  };

  const addMovieToWatchedList = (movie) => {
    setWatched((prevState) => [...prevState, movie]);
  };

  const deleteMovieFromWatchedList = (movieId) => {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbId !== movieId)
    );
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResutls movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleClickMovie={handleClickMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectMovieId ? (
            <MovieDetail
              selectMovieId={selectMovieId}
              onCloseMovie={onCloseMovie}
              API_KEY={API_KEY}
              addMovieToWatchedList={addMovieToWatchedList}
              setUserStarRating={setUserStarRating}
              watched={watched}
              userStarRating={userStarRating}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMoviesList
                watched={watched}
                userStarRating={userStarRating}
                deleteMovieFromWatchedList={deleteMovieFromWatchedList}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
