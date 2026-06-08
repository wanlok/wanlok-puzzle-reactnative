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

  const initialPuzzleSettings = {
    dimension: 5,
    seed: 1,
    numberOfCheckpoints: 10,
  };

  const {
    puzzleSettings,
    puzzle,
    isWon,
    updatePuzzle,
    clearPuzzle,
    generateNewPuzzle,
  } = usePuzzle(initialPuzzleSettings);

  const showNextPuzzle = () => {
    const seed = puzzleSettings.seed + 1;
    generateNewPuzzle({
      ...puzzleSettings,
      seed,
      numberOfCheckpoints:
        seed % 11 === 0
          ? puzzleSettings.numberOfCheckpoints - 1
          : puzzleSettings.numberOfCheckpoints,
    });
  };

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
          <Text>Puzzle {puzzleSettings.seed}</Text>
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
          <Button title="Clear" onPress={clearPuzzle} />
          <Button
            title="Restart"
            onPress={() => generateNewPuzzle(initialPuzzleSettings)}
          />
        </Container>
      </View>
      <GameModal
        visible={isWon}
        text={"You won"}
        onButtonClick={showNextPuzzle}
      />
    </>
  );
};
