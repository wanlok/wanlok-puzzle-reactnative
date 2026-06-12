import { createContext, use } from "react";
import { PuzzleSettings } from "../Types";

export interface PuzzleSettingsContextValue {
  puzzleSettings: PuzzleSettings;
  generateNewPuzzle: (settings: PuzzleSettings) => void;
  onDimensionPickerValueChange: (dimension: number) => void;
  onNumberOfCheckpointsPickerValueChange: (numberOfCheckpoints: number) => void;
}

export const PuzzleSettingsContext = createContext<PuzzleSettingsContextValue | null>(null);

export const usePuzzleSettingsContext = () => {
  const context = use(PuzzleSettingsContext);
  if (context === null) {
    throw new Error("usePuzzleSettingsContext must be used within a PuzzleProvider");
  }
  return context;
};
