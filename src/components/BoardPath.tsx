import { Line, Svg } from "react-native-svg";
import { Cell, Position } from "../Types";
import { palette } from "../theme/palette";

interface BoardPathProps {
  cells: Cell[][];
  cellWidth: number;
  boardWidth: number;
  cellGap: number;
  boardBorderWidth: number;
}

export const BoardPath = ({ cells, cellWidth, boardWidth, cellGap, boardBorderWidth }: BoardPathProps) => {
  const path: Position[] = cells
    .flatMap((row, i) => row.map((cell, j) => ({ cell, row: i, column: j })))
    .filter(({ cell }) => cell.pathSequence !== null)
    .sort(
      (a, b) =>
        (a.cell.pathSequence as number) - (b.cell.pathSequence as number),
    )
    .map(({ row, column }) => ({ row, column }));

  const cellCenter = (pos: Position) => ({
    x: boardBorderWidth + pos.column * (cellWidth + cellGap) + cellWidth / 2,
    y: boardBorderWidth + pos.row * (cellWidth + cellGap) + cellWidth / 2,
  });

  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width={boardWidth}
      height={boardWidth}
      pointerEvents="none"
    >
      {path.slice(1).map((pos, i) => {
        const from = cellCenter(path[i]);
        const to = cellCenter(pos);
        return (
          <Line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={palette.divider}
            strokeWidth={cellWidth * 0.4}
            strokeLinecap="round"
          />
        );
      })}
    </Svg>
  );
};
