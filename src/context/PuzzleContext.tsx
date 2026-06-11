import { createContext, use, PropsWithChildren } from "react";
import { usePuzzle } from "../hooks/usePuzzle";
import { Cell, PuzzleSettings } from "../Types";

interface PuzzleContextValue {
  puzzleSettings: PuzzleSettings;
  puzzle: Cell[][];
  isWon: boolean;
  updatePuzzle: (cells: Cell[][]) => void;
  clearPuzzle: () => void;
  generateNewPuzzle: (settings: PuzzleSettings) => void;
  onDimensionPickerValueChange: (dimension: number) => void;
  onNumberOfCheckpointsPickerValueChange: (numberOfCheckpoints: number) => void;
}

const PuzzleContext = createContext<PuzzleContextValue | null>(null);

const generateSeed = () => Math.floor(Math.random() * 2 ** 32);

const initialPuzzleSettings: PuzzleSettings = {
  dimension: 5,
  seed: generateSeed(),
  numberOfCheckpoints: 10,
};

export const PuzzleProvider = ({ children }: PropsWithChildren) => {
  const puzzleState = usePuzzle(initialPuzzleSettings);

  return (
    <PuzzleContext value={puzzleState}>
      {children}
    </PuzzleContext>
  );
};

export const usePuzzleContext = () => {
  const context = use(PuzzleContext);
  if (context === null) {
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  }
  return context;
};
