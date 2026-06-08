import { Button, Text, View, useWindowDimensions } from "react-native";
import { Container } from "../components/Container";
import { BoardCanvas } from "../components/BoardCanvas";
import { usePuzzle } from "../hooks/usePuzzle";
import { GameModal } from "../components/GameModal";

const MARGIN = 40;

export const Main = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const boardWidth = Math.min(width, height) - MARGIN * 2;
  const { seed, cells, isWon, updateCells, resetCells, generateNewCells } =
    usePuzzle();
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container isLandscape={isLandscape}>
          <Text>Seed: {seed}</Text>
        </Container>
        <BoardCanvas
          cells={cells}
          updateCells={updateCells}
          boardWidth={boardWidth}
        />
        <Container
          isLandscape={isLandscape}
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button title="Reset" onPress={resetCells} />
          <Button title="New" onPress={generateNewCells} />
        </Container>
      </View>
      <GameModal
        visible={isWon}
        text={"You won"}
        onButtonClick={generateNewCells}
      />
    </>
  );
};
