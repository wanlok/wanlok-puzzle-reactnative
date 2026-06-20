export const getCheckpointCircleRadius = (cellWidth: number) => cellWidth * 0.3;

export const getCheckpointCircleStrokeWidth = (cellWidth: number) => {
  let lineStrokeWidth = cellWidth * 0.4;
  if (lineStrokeWidth > 16) {
    lineStrokeWidth = 16;
  }

  const minimumStrokeWidth = 2.4;
  const strokeWidth = lineStrokeWidth * 0.1;
  if (strokeWidth < minimumStrokeWidth) {
    return minimumStrokeWidth;
  }
  return strokeWidth;
};
