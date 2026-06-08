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
  const { seed, puzzle, isWon, updatePuzzle, resetPuzzle, generateNewPuzzle } =
    usePuzzle(27);
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
          cells={puzzle}
          updatePuzzle={updatePuzzle}
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
          <Button title="Reset" onPress={resetPuzzle} />
          <Button title="New" onPress={() => generateNewPuzzle(28)} />
        </Container>
      </View>
      <GameModal
        visible={isWon}
        text={"You won"}
        onButtonClick={() => generateNewPuzzle(28)}
      />
    </>
  );
};
