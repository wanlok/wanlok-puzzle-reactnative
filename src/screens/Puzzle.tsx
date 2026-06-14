import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();
  const containerWidth = isLandscape
    ? (width - insets.left - insets.right - boardWidth) / 2
    : undefined;

  const {
    puzzleNumber,
    puzzle,
    isWon,
    elapsedSeconds,
    updatePuzzle,
    clearPuzzle,
  } = usePuzzleStateContext();

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: palette.background.default,
        }}
        onLayout={(event) =>
          setContainerHeight(event.nativeEvent.layout.height)
        }
      >
        <TopContainer
          elapsedSeconds={elapsedSeconds}
          puzzleNumber={puzzleNumber}
          width={containerWidth}
        />
        <BoardCanvas
          cells={puzzle}
          isWon={isWon}
          updatePuzzle={updatePuzzle}
          boardWidth={boardWidth}
        />
        <BottomContainer
          onClearButtonPress={clearPuzzle}
          width={containerWidth}
        />
      </View>
      <GameModal />
    </>
  );
};
