import { createContext, use } from "react";
import { Cell } from "../Types";

export interface PuzzleStateContextValue {
  puzzleNumber: number;
  puzzle: Cell[][];
  isWon: boolean;
  elapsedSeconds: number;
  result: { moveCount: number; clearCount: number };
  updatePuzzle: (cells: Cell[][]) => void;
  clearPuzzle: () => void;
}

export const PuzzleStateContext = createContext<PuzzleStateContextValue | null>(null);

export const usePuzzleStateContext = () => {
  const context = use(PuzzleStateContext);
  if (context === null) {
    throw new Error("usePuzzleStateContext must be used within a PuzzleProvider");
  }
  return context;
};
