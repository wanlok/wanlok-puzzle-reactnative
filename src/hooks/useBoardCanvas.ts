import { useRef } from "react";
import { PanResponder } from "react-native";
import { Cell, Position } from "../Types";

const getPosition = (
  x: number,
  y: number,
  numberOfRows: number,
  numberOfColumns: number,
  cellWidth: number,
): Position | null => {
  const column = Math.floor(x / cellWidth);
  const row = Math.floor(y / cellWidth);
  if (
    row >= 0 &&
    row < numberOfRows &&
    column >= 0 &&
    column < numberOfColumns
  ) {
    return { row, column };
  }
  return null;
};

const getUpdatedCells = (
  cells: Cell[][],
  position: Position,
  pathSequence: number | null,
): Cell[][] => {
  return cells.map((row, i) =>
    row.map((cell, j) =>
      i === position.row && j === position.column
        ? { ...cell, pathSequence }
        : cell,
    ),
  );
};

const getPath = (cells: Cell[][]): Position[] => {
  return cells
    .flatMap((row, i) => row.map((cell, j) => ({ cell, row: i, column: j })))
    .filter(({ cell }) => cell.pathSequence !== null)
    .sort(
      (a, b) =>
        (a.cell.pathSequence as number) - (b.cell.pathSequence as number),
    )
    .map(({ row, column }) => ({ row, column }));
};

interface UseBoardCanvasProps {
  cells: Cell[][];
  updateCells: (cells: Cell[][]) => void;
  boardWidth: number;
}

export const useBoardCanvas = ({
  cells,
  updateCells,
  boardWidth,
}: UseBoardCanvasProps) => {
  const numberOfRows = cells.length;
  const numberOfColumns = cells[0]?.length ?? 1;
  const cellWidth = boardWidth / Math.max(numberOfColumns, numberOfRows);

  const cellsRef = useRef<Cell[][]>([]);
  cellsRef.current = cells;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = getPosition(
          locationX,
          locationY,
          numberOfRows,
          numberOfColumns,
          cellWidth,
        );
        if (!position) {
          return false;
        }
        const currentPath = getPath(cellsRef.current);
        const lastPosition = currentPath[currentPath.length - 1];
        return (
          !lastPosition ||
          (lastPosition.row === position.row &&
            lastPosition.column === position.column)
        );
      },
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = getPosition(
          locationX,
          locationY,
          numberOfRows,
          numberOfColumns,
          cellWidth,
        );
        if (position && getPath(cellsRef.current).length === 0) {
          updateCells(getUpdatedCells(cellsRef.current, position, 0));
        }
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = getPosition(
          locationX,
          locationY,
          numberOfRows,
          numberOfColumns,
          cellWidth,
        );
        if (!position) {
          return;
        }
        const currentPath = getPath(cellsRef.current);
        const positionIndexInPath = currentPath.findIndex(
          (p) => p.row === position.row && p.column === position.column,
        );
        if (positionIndexInPath === -1) {
          const lastPosition = currentPath[currentPath.length - 1];
          if (lastPosition) {
            const rowDifference = Math.abs(position.row - lastPosition.row);
            const columnDifference = Math.abs(
              position.column - lastPosition.column,
            );
            const isAdjacentToLastCell =
              (rowDifference === 1 && columnDifference === 0) ||
              (rowDifference === 0 && columnDifference === 1);
            if (!isAdjacentToLastCell) {
              return;
            }
          }
          updateCells(
            getUpdatedCells(cellsRef.current, position, currentPath.length),
          );
        } else if (positionIndexInPath === currentPath.length - 2) {
          const removedPosition = currentPath[currentPath.length - 1];
          updateCells(getUpdatedCells(cellsRef.current, removedPosition, null));
        }
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  return { cellWidth, panHandlers: panResponder.panHandlers };
};
