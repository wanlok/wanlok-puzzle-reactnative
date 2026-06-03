import { Text, View } from "react-native";
import { Cell } from "./Types";

const CELL_SIZE = 64;

interface BoardProps {
  cells: Cell[][];
}

export const Board = ({ cells }: BoardProps) => {
  return (
    <View>
      {cells.map((row, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map((cell, j) => (
            <View
              key={j}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
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
