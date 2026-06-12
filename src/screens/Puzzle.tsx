import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoardCanvas } from "../components/BoardCanvas";
import { BottomContainer } from "../components/BottomContainer";
import { GameModal } from "../components/GameModal";
import { TopContainer } from "../components/TopContainer";
import { palette } from "../theme/palette";
import { usePuzzleStateContext } from "../context/PuzzleStateContext";

const MARGIN = 24;

export const Puzzle = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [containerHeight, setContainerHeight] = useState(height);
  const boardWidth = Math.min(width, containerHeight) - MARGIN * 2;

  const { puzzle, isWon, elapsedSeconds, updatePuzzle, clearPuzzle } = usePuzzleStateContext();

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
      <GameModal />
    </>
  );
};
