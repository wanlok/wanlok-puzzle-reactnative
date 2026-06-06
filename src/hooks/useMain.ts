import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Cell } from "../Types";

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

const generatePath = (dimension: number): number[][] => {
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

    let currentRow = Math.floor(Math.random() * dimension);
    let currentColumn = Math.floor(Math.random() * dimension);
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
        return Math.random() - 0.5;
      });

      [currentRow, currentColumn] = neighbors[0];
      grid[currentRow][currentColumn] = step;
    }

    if (success) {
      return grid;
    }
  }
};

const buildCells = (
  dimension: number,
  showNumberOfSequence: number,
): Cell[][] => {
  const total = dimension * dimension;
  const sortedVisibleSequences = Array.from(
    { length: showNumberOfSequence },
    (_, i) =>
      showNumberOfSequence === 1
        ? 1
        : Math.round((i * (total - 1)) / (showNumberOfSequence - 1)) + 1,
  ).sort((first, second) => first - second);
  const visibleSequences = new Set(sortedVisibleSequences);
  const path = generatePath(dimension);
  return path.map((row) =>
    row.map((sequence) => {
      return {
        sequence,
        checkpoint: visibleSequences.has(sequence)
          ? sortedVisibleSequences.indexOf(sequence) + 1
          : null,
        pathSequence: null,
      };
    }),
  );
};

export const useMain = ({ margin }: { margin: number }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const boardWidth = Math.min(width, height) - margin * 2;
  const [cells, setCells] = useState<Cell[][]>(buildCells(5, 10));

  const updateCells = (newCells: Cell[][]) => {
    printPathSequence(newCells);
    setCells(newCells);
  };

  const resetCells = () => {
    setCells(
      cells.map((row) => row.map((cell) => ({ ...cell, pathSequence: null }))),
    );
  };

  const newGame = () => {
    setCells(buildCells(5, 10));
  };

  return { cells, updateCells, resetCells, newGame, isLandscape, boardWidth };
};
