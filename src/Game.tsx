import { useRef, useState } from "react";
import { PanResponder, StyleProp, View, ViewStyle } from "react-native";
import { Board } from "./Board";
import { PathOverlay } from "./PathOverlay";
import { Cell, Position } from "./Types";

interface GameProps {
  cells: Cell[][];
  size: number;
  style?: StyleProp<ViewStyle>;
}

export const Game = ({ cells, size, style }: GameProps) => {
  const numberOfColumns = cells[0]?.length ?? 1;
  const numberOfRows = cells.length;
  const cellWidth = size / Math.max(numberOfColumns, numberOfRows);

  const [path, setPath] = useState<Position[]>([]);
  const pathRef = useRef<Position[]>([]);

  const positionAt = (x: number, y: number): Position | null => {
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

  const isInPath = (position: Position, currentPath: Position[]) =>
    currentPath.some(
      (p) => p.row === position.row && p.column === position.column,
    );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = positionAt(locationX, locationY);
        if (!position) {
          return false;
        }
        const lastPosition = pathRef.current[pathRef.current.length - 1];
        return (
          !lastPosition ||
          (lastPosition.row === position.row &&
            lastPosition.column === position.column)
        );
      },
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = positionAt(locationX, locationY);
        if (position && pathRef.current.length === 0) {
          pathRef.current = [position];
          setPath([position]);
        }
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        const position = positionAt(locationX, locationY);
        if (position && !isInPath(position, pathRef.current)) {
          pathRef.current = [...pathRef.current, position];
          setPath([...pathRef.current]);
        }
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  return (
    <View style={style} {...panResponder.panHandlers}>
      <View pointerEvents="none">
        <Board cells={cells} cellWidth={cellWidth} />
      </View>
      <PathOverlay path={path} cellWidth={cellWidth} size={size} />
    </View>
  );
};
