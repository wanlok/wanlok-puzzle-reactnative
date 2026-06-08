import { useEffect, useRef, useState } from "react";
import { Cell } from "../Types";

export const useTimer = (puzzle: Cell[][], isWon: boolean) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const hasStarted = puzzle.flat().some((cell) => cell.pathSequence !== null);
  const isRunning = hasStarted && !isWon;

  useEffect(() => {
    if (!hasStarted) {
      startTimeRef.current = null;
      setStartTime(null);
      setEndTime(null);
      setElapsedSeconds(0);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (isWon && startTimeRef.current !== null) {
      setEndTime(Date.now());
    }
  }, [isWon]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const now = Date.now();
    startTimeRef.current = now;
    setStartTime(now);

    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - (startTimeRef.current as number)) / 1000),
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return { startTime, endTime, elapsedSeconds };
};
