import { Text, View } from "react-native";
import { Cell } from "../Types";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";

interface BoardProps {
  cells: Cell[][];
  cellWidth: number;
}

export const CELL_GAP = 1;
export const BOARD_BORDER_WIDTH = 1;

export const Board = ({ cells, cellWidth }: BoardProps) => {
  return (
    <View
      style={{
        gap: CELL_GAP,
        borderWidth: BOARD_BORDER_WIDTH,
        borderColor: palette.divider,
      }}
    >
      {cells.map((row, i) => (
        <View key={i} style={{ flexDirection: "row", gap: CELL_GAP }}>
          {row.map((cell, j) => (
            <View
              key={j}
              style={{
                width: cellWidth,
                height: cellWidth,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: palette.common.white,
              }}
            >
              {cell.checkpoint !== null && (
                <Text style={typography.h6}>{cell.checkpoint}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
