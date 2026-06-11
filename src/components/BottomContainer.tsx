import { useWindowDimensions } from "react-native";
import { Container } from "./Container";
import { WButton } from "./WButton";

interface BottomContainerProps {
  onClearButtonPress: () => void;
}

export const BottomContainer = ({ onClearButtonPress }: BottomContainerProps) => {
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
      <WButton title="Clear" onPress={onClearButtonPress} style={{ flex: 1 }} />
    </Container>
  );
};
