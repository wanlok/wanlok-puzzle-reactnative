import { Button, Modal, Text, View } from "react-native";

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
            borderColor: "#000000",
            borderWidth: 1,
          }}
        >
          <Text>{text}</Text>
          <Button title="Close" onPress={onButtonPress}></Button>
        </View>
      </View>
    </Modal>
  );
};
