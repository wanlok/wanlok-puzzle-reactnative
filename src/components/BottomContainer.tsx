import { Button, useWindowDimensions } from "react-native";
import { Container } from "./Container";

interface BottomContainerProps {
  onClearButtonPress: () => void;
  onRestartButtonPress: () => void;
}

export const BottomContainer = ({
  onClearButtonPress,
  onRestartButtonPress,
}: BottomContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <Container
      isLandscape={isLandscape}
      style={{
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button title="Clear" onPress={onClearButtonPress} />
      <Button title="Restart" onPress={onRestartButtonPress} />
    </Container>
  );
};
