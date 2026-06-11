import { View } from "react-native";
import { Board, BOARD_BORDER_WIDTH, CELL_GAP } from "./Board";
import { BoardPath } from "./BoardPath";
import { Cell } from "../Types";
import { useBoardCanvas } from "../hooks/useBoardCanvas";

interface BoardCanvasProps {
  cells: Cell[][];
  isWon: boolean;
  updatePuzzle: (cells: Cell[][]) => void;
  boardWidth: number;
}

export const BoardCanvas = ({
  cells,
  isWon,
  updatePuzzle,
  boardWidth,
}: BoardCanvasProps) => {
  const { cellWidth, panHandlers } = useBoardCanvas({
    cells,
    isWon,
    updatePuzzle,
    boardWidth,
  });

  return (
    <View style={{ width: boardWidth, height: boardWidth }} {...panHandlers}>
      <View pointerEvents="none">
        <Board cells={cells} cellWidth={cellWidth} />
      </View>
      <BoardPath
        cells={cells}
        cellWidth={cellWidth}
        boardWidth={boardWidth}
        cellGap={CELL_GAP}
        boardBorderWidth={BOARD_BORDER_WIDTH}
      />
    </View>
  );
};
