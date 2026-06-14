import { View } from "react-native";
import { WButton } from "./WButton";

interface BottomContainerProps {
  onClearButtonPress: () => void;
  width?: number;
}

export const BottomContainer = ({
  onClearButtonPress,
  width,
}: BottomContainerProps) => {
  return (
    <View
      style={[
        { padding: 24 },
        width !== undefined ? { width } : { alignSelf: "stretch" },
      ]}
    >
      <WButton title="Clear" onPress={onClearButtonPress} />
    </View>
  );
};
