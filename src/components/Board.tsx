import { Text, View } from "react-native";
import { Cell } from "../Types";

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
                borderWidth: 1,
                borderColor: "#000000",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cell.checkpoint !== null && (
                <Text style={{ fontSize: 20 }}>{cell.checkpoint}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </>
  );
};
