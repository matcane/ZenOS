import { useEffect, useState } from "react";

const EVERY_MINUTE = 60000;
const EVERY_SECOND = 1000;

export function useTime(seconds?: boolean) {
  const [time, setTime] = useState(new Date());
  const ms = seconds ? EVERY_SECOND : EVERY_MINUTE;
  const maxChars = seconds ? 8 : 5;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, ms);

    return () => clearInterval(intervalId);
  }, [ms]);

  const currentTime = time.toTimeString().slice(0, maxChars);
  const currentDate = time.toDateString();

  return { currentTime, currentDate };
}
