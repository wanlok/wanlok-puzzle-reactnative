import { Text, View, ViewStyle } from "react-native";
import { Cell } from "../Types";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";
import { getCheckpointFontSize } from "../utils/getCheckpointFontSize";
import {
  getCheckpointCircleRadius,
  getCheckpointCircleStrokeWidth,
} from "../utils/getCheckpointCircleMetrics";

interface BoardProps {
  cells: Cell[][];
  cellWidth: number;
  showCheckpoints?: boolean;
  style?: ViewStyle;
}

export const CELL_GAP = 1;

export const Board = ({
  cells,
  cellWidth,
  showCheckpoints = true,
  style,
}: BoardProps) => {
  return (
    <View
      style={{
        gap: CELL_GAP,
        backgroundColor: palette.background.default,
        ...style,
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
              {showCheckpoints &&
                cell.checkpoint !== null &&
                (cell.isCheckpointHidden ? (
                  <View
                    style={{
                      width: getCheckpointCircleRadius(cellWidth) * 2,
                      height: getCheckpointCircleRadius(cellWidth) * 2,
                      borderRadius: getCheckpointCircleRadius(cellWidth),
                      borderWidth: getCheckpointCircleStrokeWidth(cellWidth),
                      borderColor: palette.divider,
                      backgroundColor: palette.common.white,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      ...typography.h6,
                      fontSize: getCheckpointFontSize(cellWidth),
                    }}
                  >
                    {cell.checkpoint}
                  </Text>
                ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
