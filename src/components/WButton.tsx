import { Pressable, Text } from "react-native";
import { palette } from "../theme/palette";

interface WButtonProps {
  title: string;
  onPress: () => void;
}

export const WButton = ({ title, onPress }: WButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: pressed ? palette.primary.dark : palette.primary.main,
      height: 48,
      paddingHorizontal: 16,
      justifyContent: "center",
    })}
  >
    <Text
      style={{
        color: palette.primary.contrastText,
        letterSpacing: 0.4,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  </Pressable>
);
