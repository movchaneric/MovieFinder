import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const searchRef = useRef(null);

  //Listen to enter keypress event and make focus on the search input
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (document.activeElement === searchRef.current) return; //To avoid deleting when there is still text inside the input.
      
      if (e.key === "Enter") {
        setQuery("");
        searchRef.current.focus();
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          setQuery("");
          searchRef.current.focus();
        }
      });
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchRef}
    />
  );
};

export default Search;
