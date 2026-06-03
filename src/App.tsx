import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Board } from "./Board";
import { Cell } from "./Types";

const GRID_DATA: (number | null)[][] = [
  [1, null, null, null, null],
  [null, null, null, null, null],
  [null, null, 3, null, null],
  [null, null, null, null, null],
  [null, null, null, null, 2],
];

const buildCells = (data: (number | null)[][]): Cell[][] => {
  return data.map((row) => row.map((value) => ({ value })));
};

export const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Board cells={buildCells(GRID_DATA)} />
      </View>
    </>
  );
};
