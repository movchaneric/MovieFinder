import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

const Search = ({ query, setQuery }) => {
  const searchRef = useRef(null);

  const searchInputFocus = () => {
    if (document.activeElement === searchRef.current) return; //input is already in focus

    setQuery("");
    searchRef.current.focus();
  };

  //Listen to enter keypress event and make focus on the search input == Custom hook!
  useKey("Enter", searchInputFocus);

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
