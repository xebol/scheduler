import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(() => newMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const modeHistory = [...history];
      modeHistory.pop(mode);

      setHistory(() => modeHistory)
      setMode(() => modeHistory[(modeHistory.length -1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}