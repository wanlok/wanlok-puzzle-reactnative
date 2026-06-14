import { useEffect, useRef, useState } from "react";
import { Cell, PuzzleSettings } from "../Types";
import { loadGameRecords, saveGameRecord } from "../utils/gameStorage";

const printPathSequence = (cells: Cell[][]) => {
  for (let i = 0; i < cells.length; i++) {
    const row: string[] = [];
    for (let j = 0; j < cells[i].length; j++) {
      const pathSequence = cells[i][j].pathSequence;
      row.push(
        pathSequence !== null
          ? pathSequence < 10
            ? ` ${pathSequence}`
            : `${pathSequence}`
          : "  ",
      );
    }
    console.log(row.join(" "));
  }
};

const createRandom = (seed: number): (() => number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const generatePath = (dimension: number, random: () => number): number[][] => {
  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const getUnvisitedNeighbors = (
    grid: number[][],
    row: number,
    column: number,
  ): [number, number][] =>
    directions
      .map(([rowDelta, columnDelta]): [number, number] => [
        row + rowDelta,
        column + columnDelta,
      ])
      .filter(
        ([neighborRow, neighborColumn]) =>
          neighborRow >= 0 &&
          neighborRow < dimension &&
          neighborColumn >= 0 &&
          neighborColumn < dimension &&
          grid[neighborRow][neighborColumn] === 0,
      );

  while (true) {
    const grid: number[][] = Array.from({ length: dimension }, () =>
      new Array(dimension).fill(0),
    );

    let currentRow = Math.floor(random() * dimension);
    let currentColumn = Math.floor(random() * dimension);
    grid[currentRow][currentColumn] = 1;

    let success = true;

    for (let step = 2; step <= dimension * dimension; step++) {
      const neighbors = getUnvisitedNeighbors(grid, currentRow, currentColumn);

      if (neighbors.length === 0) {
        success = false;
        break;
      }

      neighbors.sort((firstNeighbor, secondNeighbor) => {
        const firstCount = getUnvisitedNeighbors(
          grid,
          firstNeighbor[0],
          firstNeighbor[1],
        ).length;
        const secondCount = getUnvisitedNeighbors(
          grid,
          secondNeighbor[0],
          secondNeighbor[1],
        ).length;
        if (firstCount !== secondCount) {
          return firstCount - secondCount;
        }
        return random() - 0.5;
      });

      [currentRow, currentColumn] = neighbors[0];
      grid[currentRow][currentColumn] = step;
    }

    if (success) {
      return grid;
    }
  }
};

const generatePuzzle = (puzzleSettings: PuzzleSettings): Cell[][] => {
  const { dimension, seed, numberOfCheckpoints } = puzzleSettings;
  const total = dimension * dimension;
  const checkpointSequences = Array.from(
    { length: numberOfCheckpoints },
    (_, i) =>
      numberOfCheckpoints === 1
        ? 1
        : Math.round((i * (total - 1)) / (numberOfCheckpoints - 1)) + 1,
  ).sort((first, second) => first - second);
  const checkpoints = new Set(checkpointSequences);
  return generatePath(dimension, createRandom(seed)).map((row) =>
    row.map((sequence) => {
      return {
        sequence,
        checkpoint: checkpoints.has(sequence)
          ? checkpointSequences.indexOf(sequence) + 1
          : null,
        pathSequence: null,
      };
    }),
  );
};

const checkWin = (cells: Cell[][]): boolean => {
  const allCells = cells.flat();

  if (allCells.some((cell) => cell.pathSequence === null)) {
    return false;
  }

  const checkpoints = allCells
    .filter((cell) => cell.checkpoint !== null)
    .sort((a, b) => (a.checkpoint as number) - (b.checkpoint as number));

  for (let i = 0; i < checkpoints.length - 1; i++) {
    if (
      (checkpoints[i].pathSequence as number) >=
      (checkpoints[i + 1].pathSequence as number)
    ) {
      return false;
    }
  }

  const firstCheckpoint = checkpoints[0];
  if ((firstCheckpoint.pathSequence as number) !== 0) {
    return false;
  }

  const lastCheckpoint = checkpoints[checkpoints.length - 1];
  if ((lastCheckpoint.pathSequence as number) !== allCells.length - 1) {
    return false;
  }

  return true;
};

export const usePuzzle = (initialPuzzleSettings: PuzzleSettings) => {
  const [puzzleNumber, setPuzzleNumber] = useState(1);
  const [puzzleSettings, setPuzzleSettings] = useState<PuzzleSettings>(
    initialPuzzleSettings,
  );
  const [puzzle, setPuzzle] = useState<Cell[][]>(() =>
    generatePuzzle(puzzleSettings),
  );
  const [isWon, setIsWon] = useState<boolean>(false);
  const resultRef = useRef({ moveCount: 0, clearCount: 0 });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const hasStarted = puzzle.flat().some((cell) => cell.pathSequence !== null);
  const isRunning = hasStarted && !isWon;

  useEffect(() => {
    loadGameRecords().then((records) => {
      setPuzzleNumber(records.length + 1);
    });
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      startTimeRef.current = null;
      setElapsedSeconds(0);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const now = Date.now();
    startTimeRef.current = now;

    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - (startTimeRef.current as number)) / 1000),
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const updatePuzzle = (newCells: Cell[][]) => {
    printPathSequence(newCells);
    resultRef.current.moveCount += 1;
    setPuzzle(newCells);
    if (checkWin(newCells)) {
      setIsWon(true);
      saveGameRecord({
        timestamp: Date.now(),
        dimension: puzzleSettings.dimension,
        numberOfCheckpoints: puzzleSettings.numberOfCheckpoints,
        elapsedSeconds,
        moveCount: resultRef.current.moveCount,
        clearCount: resultRef.current.clearCount,
      });
    }
  };

  const clearPuzzle = () => {
    setPuzzle(
      puzzle.map((row) => row.map((cell) => ({ ...cell, pathSequence: null }))),
    );
    resultRef.current.clearCount += 1;
    resultRef.current.moveCount = 0;
    setIsWon(false);
  };

  const generateNewPuzzle = (newPuzzleSettings: PuzzleSettings) => {
    if (isWon) {
      setPuzzleNumber((previous) => previous + 1);
    }
    setPuzzleSettings(newPuzzleSettings);
    setPuzzle(generatePuzzle(newPuzzleSettings));
    resultRef.current = { moveCount: 0, clearCount: 0 };
    setIsWon(false);
  };

  const onDimensionPickerValueChange = (dimension: number) => {
    const maxNumberOfCheckpoints = Math.floor((dimension * dimension) / 2);
    const numberOfCheckpoints = Math.min(
      puzzleSettings.numberOfCheckpoints,
      maxNumberOfCheckpoints,
    );
    generateNewPuzzle({
      ...initialPuzzleSettings,
      dimension,
      numberOfCheckpoints,
    });
  };

  const onNumberOfCheckpointsPickerValueChange = (
    numberOfCheckpoints: number,
  ) => {
    generateNewPuzzle({ ...puzzleSettings, numberOfCheckpoints });
  };

  return {
    puzzleNumber,
    puzzleSettings,
    puzzle,
    isWon,
    elapsedSeconds,
    result: resultRef.current,
    updatePuzzle,
    clearPuzzle,
    generateNewPuzzle,
    onDimensionPickerValueChange,
    onNumberOfCheckpointsPickerValueChange,
  };
};
