import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);
    const historyMode = [...history];

    if (replace) {
      historyMode.pop();
    }

    historyMode.push(mode);
    setHistory(historyMode);
  };

  const back = () => {
    //if history array has 1 item you cannot go back
    if (history.length > 1) {
      //make a copy of history state
      const historyArray = [...history];
      historyArray.pop();

      const lastItem = historyArray[historyArray.length - 1];
      setMode(lastItem);
      setHistory(historyArray);
    }
  };

  return { mode, transition, back };
}