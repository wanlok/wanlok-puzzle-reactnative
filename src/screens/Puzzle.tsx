import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoardCanvas } from "../components/BoardCanvas";
import { BottomContainer } from "../components/BottomContainer";
import { useTimer } from "../hooks/useTimer";
import { GameModal } from "../components/GameModal";
import { TopContainer } from "../components/TopContainer";
import { palette } from "../theme/palette";
import { usePuzzleContext } from "../context/PuzzleContext";

const MARGIN = 24;

const generateSeed = () => Math.floor(Math.random() * 2 ** 32);

export const Puzzle = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [containerHeight, setContainerHeight] = useState(height);
  const boardWidth = Math.min(width, containerHeight) - MARGIN * 2;

  const {
    puzzleSettings,
    puzzle,
    isWon,
    updatePuzzle,
    clearPuzzle,
    generateNewPuzzle,
  } = usePuzzleContext();

  const { elapsedSeconds } = useTimer(puzzle, isWon);

  const showNextPuzzle = () => {
    generateNewPuzzle({
      ...puzzleSettings,
      seed: generateSeed(),
    });
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: palette.background.default,
        }}
        onLayout={(event) =>
          setContainerHeight(event.nativeEvent.layout.height)
        }
      >
        <TopContainer elapsedSeconds={elapsedSeconds} />
        <BoardCanvas
          cells={puzzle}
          isWon={isWon}
          updatePuzzle={updatePuzzle}
          boardWidth={boardWidth}
        />
        <BottomContainer onClearButtonPress={clearPuzzle} />
      </SafeAreaView>
      <GameModal
        visible={isWon}
        text={"You won"}
        onButtonPress={showNextPuzzle}
      />
    </>
  );
};
