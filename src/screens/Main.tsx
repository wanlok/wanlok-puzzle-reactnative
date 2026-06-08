import { View, useWindowDimensions } from "react-native";
import { BoardCanvas } from "../components/BoardCanvas";
import { BottomContainer } from "../components/BottomContainer";
import { usePuzzle } from "../hooks/usePuzzle";
import { useTimer } from "../hooks/useTimer";
import { GameModal } from "../components/GameModal";
import { TopContainer } from "../components/TopContainer";

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
    restartPuzzle,
    onDimensionPickerValueChange,
    onNumberOfCheckpointsPickerValueChange,
  } = usePuzzle(initialPuzzleSettings);

  const { elapsedSeconds } = useTimer(puzzle, isWon);

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
        <TopContainer
          puzzleSettings={puzzleSettings}
          elapsedSeconds={elapsedSeconds}
          onDimensionPickerValueChange={onDimensionPickerValueChange}
          onNumberOfCheckpointsPickerValueChange={
            onNumberOfCheckpointsPickerValueChange
          }
        />
        <BoardCanvas
          cells={puzzle}
          isWon={isWon}
          updatePuzzle={updatePuzzle}
          boardWidth={boardWidth}
        />
        <BottomContainer
          onClearButtonPress={clearPuzzle}
          onRestartButtonPress={restartPuzzle}
        />
      </View>
      <GameModal
        visible={isWon}
        text={"You won"}
        onButtonPress={showNextPuzzle}
      />
    </>
  );
};
