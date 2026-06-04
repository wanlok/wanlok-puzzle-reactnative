import { Line, Svg } from "react-native-svg";
import { Position } from "./Types";

interface PathOverlayProps {
  path: Position[];
  cellWidth: number;
  size: number;
}

export const PathOverlay = ({ path, cellWidth, size }: PathOverlayProps) => {
  const cellCenter = (pos: Position) => ({
    x: pos.column * cellWidth + cellWidth / 2,
    y: pos.row * cellWidth + cellWidth / 2,
  });

  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width={size}
      height={size}
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
            stroke="blue"
            strokeWidth={cellWidth * 0.4}
            strokeLinecap="round"
          />
        );
      })}
    </Svg>
  );
};
