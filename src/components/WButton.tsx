import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";

interface WButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const WButton = ({ title, onPress, style }: WButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? palette.primary.dark : palette.primary.main,
        height: 48,
        paddingHorizontal: 16,
        justifyContent: "center",
      },
      style,
    ]}
  >
    <Text
      style={[
        typography.button,
        {
          color: palette.primary.contrastText,
          textAlign: "center",
        },
      ]}
    >
      {title}
    </Text>
  </Pressable>
);
