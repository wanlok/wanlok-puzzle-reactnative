
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
  isWon: boolean;
  updatePuzzle: (cells: Cell[][]) => void;
  boardWidth: number;
}

export const useBoardCanvas = ({
  cells,
  isWon,
  updatePuzzle,
  boardWidth,
}: UseBoardCanvasProps) => {
  const numberOfRows = cells.length;
  const numberOfColumns = cells[0]?.length ?? 1;
  const cellWidth = boardWidth / Math.max(numberOfColumns, numberOfRows);

  const panResponder = PanResponder.create({
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
      const currentPath = getPath(cells);
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
      if (position && getPath(cells).length === 0) {
        updatePuzzle(getUpdatedCells(cells, position, 0));
      }
    },
    onPanResponderMove: (e) => {
      if (isWon) {
        return;
      }
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
      const currentPath = getPath(cells);
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
        updatePuzzle(
          getUpdatedCells(cells, position, currentPath.length),
        );
      } else if (positionIndexInPath === currentPath.length - 2) {
        const removedPosition = currentPath[currentPath.length - 1];
        updatePuzzle(getUpdatedCells(cells, removedPosition, null));
      }
    },
    onPanResponderRelease: () => {},
  });

  return { cellWidth, panHandlers: panResponder.panHandlers };
};
