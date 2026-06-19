import { Fragment } from "react";
import { Circle, Line, Svg, Text as SvgText } from "react-native-svg";
import { Cell, Position } from "../Types";
import { palette } from "../theme/palette";
import { getCheckpointFontSize } from "../utils/getCheckpointFontSize";

interface BoardPathProps {
  cells: Cell[][];
  cellWidth: number;
  boardWidth: number;
  cellGap: number;
  showCheckpoints?: boolean;
}

export const BoardPath = ({
  cells,
  cellWidth,
  boardWidth,
  cellGap,
  showCheckpoints = true,
}: BoardPathProps) => {
  const path: (Position & { cell: Cell })[] = cells
    .flatMap((row, i) => row.map((cell, j) => ({ cell, row: i, column: j })))
    .filter(({ cell }) => cell.pathSequence !== null)
    .sort(
      (a, b) =>
        (a.cell.pathSequence as number) - (b.cell.pathSequence as number),
    );

  const cellCenter = (pos: Position) => ({
    x: pos.column * (cellWidth + cellGap) + cellWidth / 2,
    y: pos.row * (cellWidth + cellGap) + cellWidth / 2,
  });

  let strokeWidth = cellWidth * 0.4;

  if (strokeWidth > 16) {
    strokeWidth = 16;
  }

  const circleStrokeMinWidth = 2.4;
  let circleStrokeWidth = strokeWidth * 0.1;
  if (circleStrokeWidth < circleStrokeMinWidth) {
    circleStrokeWidth = circleStrokeMinWidth;
  }

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
            stroke={palette.success.main}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
      {path
        .filter(({ cell }) => cell.checkpoint !== null)
        .map((pos) => {
          const center = cellCenter(pos);
          return (
            <Fragment key={pos.cell.sequence}>
              <Circle
                cx={center.x}
                cy={center.y}
                r={cellWidth * 0.3}
                fill={palette.common.white}
                stroke={palette.success.main}
                strokeWidth={circleStrokeWidth}
              />
              {showCheckpoints && (
                <SvgText
                  x={center.x}
                  y={center.y}
                  dy={getCheckpointFontSize(cellWidth) * 0.05}
                  fontSize={getCheckpointFontSize(cellWidth)}
                  fill={palette.success.main}
                  textAnchor="middle"
                  alignmentBaseline="central"
                >
                  {pos.cell.checkpoint}
                </SvgText>
              )}
            </Fragment>
          );
        })}
    </Svg>
  );
};
