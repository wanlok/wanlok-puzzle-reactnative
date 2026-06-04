import { StatusBar } from "expo-status-bar";
import { Button, Text, View, useWindowDimensions } from "react-native";
import { Game } from "./Game";
import { Cell } from "./Types";
import { WContainer } from "./Dummy";

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
        <WContainer isLandscape={isLandscape}>
          <Text>Left</Text>
        </WContainer>
        <Game
          cells={buildCells(GRID_DATA)}
          size={boardWidth}
          style={{
            width: boardWidth,
            height: boardWidth,
          }}
        />
        <WContainer isLandscape={isLandscape}>
          <Text>Right</Text>
          <Button title="Reset" />
        </WContainer>
      </View>
    </>
  );
};
