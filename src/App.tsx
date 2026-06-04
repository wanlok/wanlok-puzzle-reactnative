import { StatusBar } from "expo-status-bar";
import { Button, Text, View, useWindowDimensions } from "react-native";
import { Game } from "./Game";
import { Cell } from "./Types";
import { WContainer } from "./WContainer";
import { useState } from "react";

const printPathSequence = (cells: Cell[][]) => {
  for (let i = 0; i < cells.length; i++) {
    const row: string[] = [];
    for (let j = 0; j < cells[i].length; j++) {
      const pathSequence = cells[i][j].pathSequence;
      row.push(
        pathSequence !== null
          ? pathSequence < 10
            ? ` ${pathSequence}`
            : `${pathSequence}`
          : "  ",
      );
    }
    console.log(row.join(" "));
  }
};

const buildCells = (dimension: number): Cell[][] => {
  const data: (number | null)[][] = [
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, 3, null, null],
    [null, null, null, null, null],
    [null, null, null, null, 2],
  ];
  return data.map((row) =>
    row.map((sequence) => ({ sequence, pathSequence: null })),
  );
};

export const App = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;
  const margin = 32;
  const boardWidth = Math.min(windowWidth, windowHeight) - margin * 2;
  const [cells, setCells] = useState<Cell[][]>(buildCells(5));

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
          cells={cells}
          updateCells={(newCells) => {
            printPathSequence(newCells);
            setCells(newCells);
          }}
          boardWidth={boardWidth}
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
