import { View, ViewStyle } from "react-native";
import { palette } from "../theme/palette";

interface DividerProps {
  style?: ViewStyle;
}

export const Divider = ({ style }: DividerProps = {}) => (
  <View
    style={{ height: 1, backgroundColor: palette.divider, width: "100%", ...style }}
  />
);
