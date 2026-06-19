import { typography } from "../theme/typography";

export const getCheckpointFontSize = (cellWidth: number) => {
  const scaledFontSize = cellWidth * 0.32;
  if (scaledFontSize > typography.h6.fontSize) {
    return typography.h6.fontSize;
  }
  return scaledFontSize;
};
