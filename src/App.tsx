import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const CELL_SIZE = 60;

type Cell = {
  row: number;
  col: number;
  value: number | null;
};

type Grid = Cell[][];

const GRID_DATA: (number | null)[][] = [
  [1, null, null, null, null],
  [null, null, null, null, null],
  [null, null, 3, null, null],
  [null, null, null, null, null],
  [null, null, null, null, 2],
];

const buildGrid = (data: (number | null)[][]): Grid =>
  data.map((row, r) => row.map((value, c) => ({ row: r, col: c, value })));

const grid: Grid = buildGrid(GRID_DATA);

export const App = () => {
  return (
    <View style={styles.container}>
      <View>
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell) => (
              <View key={cell.col} style={styles.cell}>
                {cell.value !== null && (
                  <Text style={styles.cellText}>{cell.value}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
