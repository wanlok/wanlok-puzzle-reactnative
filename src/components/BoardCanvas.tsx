import { View } from "react-native";
import { Board, CELL_GAP } from "./Board";
import { BoardPath } from "./BoardPath";
import { Cell } from "../Types";
import { useBoardCanvas } from "../hooks/useBoardCanvas";
import { palette } from "../theme/palette";

export const BOARD_BORDER_WIDTH = 1;

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

  const innerBoardWidth = boardWidth - 2 * BOARD_BORDER_WIDTH;

  return (
    <View
      style={{
        width: boardWidth,
        height: boardWidth,
        borderWidth: BOARD_BORDER_WIDTH,
        borderColor: palette.divider,
        overflow: "hidden",
      }}
      {...panHandlers}
    >
      <View pointerEvents="none">
        <Board cells={cells} cellWidth={cellWidth} />
      </View>
      <BoardPath
        cells={cells}
        cellWidth={cellWidth}
        boardWidth={innerBoardWidth}
        cellGap={CELL_GAP}
      />
    </View>
  );
};
