import { StyleProp, Text, View, ViewStyle } from "react-native";
import { Cell } from "./Types";

interface BoardProps {
  cells: Cell[][];
  width: number;
  style?: StyleProp<ViewStyle>;
}

export const Board = ({ cells, width, style }: BoardProps) => {
  const numCols = cells[0]?.length ?? 1;
  const numRows = cells.length;
  const cellWidth = width / Math.max(numCols, numRows);

  return (
    <View style={style}>
      {cells.map((row, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map((cell, j) => (
            <View
              key={j}
              style={{
                width: cellWidth,
                height: cellWidth,
                borderWidth: 1,
                borderColor: "#000000",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cell.value !== null && (
                <Text style={{ fontSize: 20 }}>{cell.value}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
