import { View } from "react-native";
import { Board } from "./Board";
import { BoardPath } from "./BoardPath";
import { Cell } from "../Types";
import { useBoardCanvas } from "../hooks/useBoardCanvas";

interface BoardCanvasProps {
  cells: Cell[][];
  updatePuzzle: (cells: Cell[][]) => void;
  boardWidth: number;
}

export const BoardCanvas = ({
  cells,
  updatePuzzle,
  boardWidth,
}: BoardCanvasProps) => {
  const { cellWidth, panHandlers } = useBoardCanvas({
    cells,
    updatePuzzle,
    boardWidth,
  });

  return (
    <View style={{ width: boardWidth, height: boardWidth }} {...panHandlers}>
      <View pointerEvents="none">
        <Board cells={cells} cellWidth={cellWidth} />
      </View>
      <BoardPath cells={cells} cellWidth={cellWidth} boardWidth={boardWidth} />
    </View>
  );
};
