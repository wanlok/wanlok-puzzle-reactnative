import { Text, View } from "react-native";
import { Cell } from "../Types";
import { palette } from "../theme/palette";

interface BoardProps {
  cells: Cell[][];
  cellWidth: number;
}

export const Board = ({ cells, cellWidth }: BoardProps) => {
  return (
    <>
      {cells.map((row, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map((cell, j) => (
            <View
              key={j}
              style={{
                width: cellWidth,
                height: cellWidth,
                padding: 4,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backgroundColor: palette.common.white,
                }}
              >
                {cell.checkpoint !== null && (
                  <Text style={{ fontSize: 20 }}>{cell.checkpoint}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </>
  );
};
