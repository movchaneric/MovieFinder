import { useEffect } from "react";

export const useKey = (key, action ) => {
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
          if (event.code === key) {
            action() // function that will do somethign depends on which key was pressed.
            console.log("Closed.");
          }
        });
    
        return () => {
          document.removeEventListener("keydown", () => {
            document.addEventListener("keydown", (event) => {
              if (event.code.toLowerCase() === key.toLowerCase()) {
                action();
                console.log("Closed.");
              }
            });
          });
        };
      }, [action, key]);
}