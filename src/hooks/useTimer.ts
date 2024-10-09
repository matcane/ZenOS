import { useEffect, useState, useRef } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");

  const timer = `${minutes}:${seconds}:${milliseconds}`;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now() - time;
      }

      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current!;
        setTime(elapsedTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
  };

  return { time, timer, isRunning, toggleTimer, resetTimer };
}
