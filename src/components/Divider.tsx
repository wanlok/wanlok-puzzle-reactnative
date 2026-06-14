import { View } from "react-native";
import { palette } from "../theme/palette";

export const Divider = () => (
  <View
    style={{ height: 1, backgroundColor: palette.divider, width: "100%" }}
  />
);
