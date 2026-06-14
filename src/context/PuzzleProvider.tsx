import { PropsWithChildren } from "react";
import { usePuzzle } from "../hooks/usePuzzle";
import { PuzzleSettings } from "../Types";
import { generateSeed } from "../utils/generateSeed";
import { PuzzleStateContext } from "./PuzzleStateContext";
import { PuzzleSettingsContext } from "./PuzzleSettingsContext";

const initialPuzzleSettings: PuzzleSettings = {
  dimension: 5,
  seed: generateSeed(),
  numberOfCheckpoints: 10,
};

export const PuzzleProvider = ({ children }: PropsWithChildren) => {
  const {
    puzzleNumber,
    puzzle,
    isWon,
    elapsedSeconds,
    result,
    updatePuzzle,
    clearPuzzle,
    puzzleSettings,
    generateNewPuzzle,
    onDimensionPickerValueChange,
    onNumberOfCheckpointsPickerValueChange,
  } = usePuzzle(initialPuzzleSettings);

  return (
    <PuzzleStateContext
      value={{
        puzzleNumber,
        puzzle,
        isWon,
        elapsedSeconds,
        result,
        updatePuzzle,
        clearPuzzle,
      }}
    >
      <PuzzleSettingsContext
        value={{
          puzzleSettings,
          generateNewPuzzle,
          onDimensionPickerValueChange,
          onNumberOfCheckpointsPickerValueChange,
        }}
      >
        {children}
      </PuzzleSettingsContext>
    </PuzzleStateContext>
  );
};
