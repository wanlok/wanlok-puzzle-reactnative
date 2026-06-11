import { Text, useWindowDimensions, View } from "react-native";
import { Container } from "./Container";
import { typography } from "../theme/typography";

interface TopContainerProps {
  elapsedSeconds: number;
}

export const TopContainer = ({ elapsedSeconds }: TopContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Container isLandscape={isLandscape}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={typography.h4}>{formattedTime}</Text>
      </View>
    </Container>
  );
};
