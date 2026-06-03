import { StatusBar } from "expo-status-bar";
import { Text, View, useWindowDimensions } from "react-native";
import { Board } from "./Board";
import { Cell } from "./Types";
import { Dummy } from "./Dummy";

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
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;
  const margin = 32;
  const boardWidth = Math.min(windowWidth, windowHeight) - margin * 2;

  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Dummy isLandscape={isLandscape}>
          <Text>Left</Text>
        </Dummy>
        <Board
          cells={buildCells(GRID_DATA)}
          width={boardWidth}
          style={{
            width: boardWidth,
            height: boardWidth,
          }}
        />
        <Dummy isLandscape={isLandscape}>
          <Text>Right</Text>
        </Dummy>
      </View>
    </>
  );
};
