import { Button, Modal, Text, View } from "react-native";
import { palette } from "../theme/palette";
import { WButton } from "./WButton";
import { typography } from "../theme/typography";

interface GameModalProps {
  visible: boolean;
  text: string;
  onButtonPress: () => void;
}

export const GameModal = ({ visible, text, onButtonPress }: GameModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "stretch",
            marginHorizontal: 40,
            padding: 24,
            gap: 24,
            borderColor: palette.divider,
            borderWidth: 1,
          }}
        >
          <Text style={typography.body1}>{text}</Text>
          <WButton title="Close" onPress={onButtonPress} />
        </View>
      </View>
    </Modal>
  );
};
