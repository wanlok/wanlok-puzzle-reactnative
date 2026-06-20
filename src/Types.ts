export type Cell = {
  sequence: number;
  checkpoint: number | null;
  isCheckpointHidden: boolean;
  pathSequence: number | null;
};

export type Position = {
  row: number;
  column: number;
};

export type PuzzleSettings = {
  dimension: number;
  seed: number;
  numberOfCheckpoints: number;
};

export type GameRecord = {
  cells: Cell[][];
  timestamp: number;
  elapsedSeconds: number;
  moveCount: number;
  clearCount: number;
};
