import { View } from "react-native";
import { Board } from "./Board";
import { BoardPath } from "./BoardPath";
import { Cell } from "../Types";
import { useBoardCanvas } from "../hooks/useBoardCanvas";

interface BoardCanvasProps {
  cells: Cell[][];
  updateCells: (cells: Cell[][]) => void;
  boardWidth: number;
}

export const BoardCanvas = ({
  cells,
  updateCells,
  boardWidth,
}: BoardCanvasProps) => {
  const { cellWidth, panHandlers } = useBoardCanvas({
    cells,
    updateCells,
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
