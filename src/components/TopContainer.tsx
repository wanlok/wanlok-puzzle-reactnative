import { Text, useWindowDimensions, View } from "react-native";
import { Container } from "./Container";
import { typography } from "../theme/typography";
import { formatTime } from "../utils/formatTime";

interface TopContainerProps {
  elapsedSeconds: number;
  puzzleNumber: number;
}

export const TopContainer = ({
  elapsedSeconds,
  puzzleNumber,
}: TopContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Container isLandscape={isLandscape} style={{ gap: 16 }}>
      <Text style={typography.h6}>Puzzle {puzzleNumber}</Text>
      <Text style={typography.h4}>{formatTime(elapsedSeconds)}</Text>
    </Container>
  );
};
