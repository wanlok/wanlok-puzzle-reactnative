import { Text, useWindowDimensions, View } from "react-native";
import { Container } from "./Container";
import { typography } from "../theme/typography";
import { formatTime } from "../utils/formatTime";

interface TopContainerProps {
  elapsedSeconds: number;
}

export const TopContainer = ({ elapsedSeconds }: TopContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Container isLandscape={isLandscape}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={typography.h4}>{formatTime(elapsedSeconds)}</Text>
      </View>
    </Container>
  );
};
