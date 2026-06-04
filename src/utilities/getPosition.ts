import { Position } from "../Types";

export const getPosition = (
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
