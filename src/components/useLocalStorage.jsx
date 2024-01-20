import { useEffect, useState } from "react";

//the initialState is the [] we passed to the useLocalStorageState as an initial value so we have to mention it. 

export const useLocalStorageState = (initialState, localStorageKey) => {
  const [value, setValue] = useState(() => {
    const storedValues = localStorage.getItem(localStorageKey);
    return storedValues ? JSON.parse(storedValues) : initialState;
  }); //lasy evaluation , instead of passing single value.

  //save to local storage.
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};
