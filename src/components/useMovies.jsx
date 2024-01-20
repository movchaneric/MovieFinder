import { useState, useEffect } from "react";

const API_KEY = "c6e41545";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (query.length === 0 || query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    //clean up function
    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error , API_KEY};
};
