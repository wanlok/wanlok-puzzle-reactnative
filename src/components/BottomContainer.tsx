import { useWindowDimensions } from "react-native";
import { Container } from "./Container";
import { WButton } from "./WButton";

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
      <WButton title="Clear" onPress={onClearButtonPress} />
      <WButton title="Restart" onPress={onRestartButtonPress} />
    </Container>
  );
};
