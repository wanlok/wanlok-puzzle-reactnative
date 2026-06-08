export type Cell = {
  sequence: number;
  checkpoint: number | null;
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
