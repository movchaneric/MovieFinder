import { useState } from "react";
import WatchedSummery from "./ WatchedSummery";
import WatchedMoviesList from "./WatchedMovieList";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchListBox = ({ watched }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            <WatchedSummery watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        )}
      </div>
    </>
  );
};

export default WatchListBox;
