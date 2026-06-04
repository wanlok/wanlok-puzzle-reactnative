import { useRef, useState } from "react";
import { PanResponder, StyleProp, View, ViewStyle } from "react-native";
import { Board } from "./Board";
import { PathOverlay } from "./PathOverlay";
import { Cell, Position } from "./Types";

interface GameBoardProps {
  cells: Cell[][];
  size: number;
  style?: StyleProp<ViewStyle>;
}

export const GameBoard = ({ cells, size, style }: GameBoardProps) => {
  const numberOfColumns = cells[0]?.length ?? 1;
  const numberOfRows = cells.length;
  const cellWidth = size / Math.max(numberOfColumns, numberOfRows);

  const [path, setPath] = useState<Position[]>([]);
  const pathRef = useRef<Position[]>([]);
  const boardOrigin = useRef({ x: 0, y: 0 });
  const boardRef = useRef<View>(null);

  const positionAt = (pageX: number, pageY: number): Position | null => {
    const x = pageX - boardOrigin.current.x;
    const y = pageY - boardOrigin.current.y;
    const column = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellWidth);
    if (row >= 0 && row < numberOfRows && column >= 0 && column < numberOfColumns) {
      return { row, column };
    }
    return null;
  };

  const isInPath = (position: Position, currentPath: Position[]) =>
    currentPath.some((p) => p.row === position.row && p.column === position.column);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        boardRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
          boardOrigin.current = { x: pageX, y: pageY };
        });
        const { pageX, pageY } = e.nativeEvent;
        const position = positionAt(pageX, pageY);
        if (position) {
          pathRef.current = [position];
          setPath([position]);
        }
      },
      onPanResponderMove: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        const position = positionAt(pageX, pageY);
        if (position && !isInPath(position, pathRef.current)) {
          pathRef.current = [...pathRef.current, position];
          setPath([...pathRef.current]);
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View ref={boardRef} style={style} {...panResponder.panHandlers}>
      <Board cells={cells} cellWidth={cellWidth} />
      <PathOverlay path={path} cellWidth={cellWidth} size={size} />
    </View>
  );
};
