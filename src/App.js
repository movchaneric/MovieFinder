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

const API_KEY = "c6e41545";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]); //List of all movies in the watched list after star rating them
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectMovieId, setSelectMovieId] = useState(null);
  const [userStarRating, setUserStarRating] = useState("");

  console.log("Watched movies list: ", watched);

  const handleClickMovie = (id) => {
    setSelectMovieId((prevState) => (prevState !== id ? id : null));
  };

  const onCloseMovie = () => {
    setSelectMovieId(null);
  };

  const addMovieToWatchedList = (movie) => {
    setWatched((prevState) => [...prevState, movie]);
  };

  const deleteMovieFromWatchedList = (movieId) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== movieId))
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length === 0) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

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
