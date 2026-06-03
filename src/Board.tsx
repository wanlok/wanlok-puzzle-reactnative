import { Text, View } from "react-native";
import { Grid } from "./Types";

const CELL_SIZE = 64;

const GRID_DATA: (number | null)[][] = [
  [1, null, null, null, null],
  [null, null, null, null, null],
  [null, null, 3, null, null],
  [null, null, null, null, null],
  [null, null, null, null, 2],
];

const buildGrid = (data: (number | null)[][]): Grid => {
  return data.map((row, i) =>
    row.map((value, j) => ({ row: i, col: j, value })),
  );
};

const grid: Grid = buildGrid(GRID_DATA);

export const Board = () => {
  return (
    <View>
      {grid.map((row, r) => (
        <View key={r} style={{ flexDirection: "row" }}>
          {row.map((cell) => (
            <View
              key={cell.col}
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
