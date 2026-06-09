import { View, useWindowDimensions } from "react-native";
import { BoardCanvas } from "../components/BoardCanvas";
import { BottomContainer } from "../components/BottomContainer";
import { usePuzzle } from "../hooks/usePuzzle";
import { useTimer } from "../hooks/useTimer";
import { GameModal } from "../components/GameModal";
import { TopContainer } from "../components/TopContainer";
import { palette } from "../theme/palette";

const MARGIN = 24;

const generateSeed = () => Math.floor(Math.random() * 2 ** 32);

const initialPuzzleSettings = {
  dimension: 5,
  seed: generateSeed(),
  numberOfCheckpoints: 10,
};

export const Main = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const boardWidth = Math.min(width, height) - MARGIN * 2;

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
    generateNewPuzzle({
      ...puzzleSettings,
      seed: generateSeed(),
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
          backgroundColor: palette.background.default,
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
