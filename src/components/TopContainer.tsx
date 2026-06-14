import { Text, View, useWindowDimensions } from "react-native";
import { typography } from "../theme/typography";
import { formatTime } from "../utils/formatTime";
import { Divider } from "./Divider";

interface TopContainerProps {
  puzzleNumber: number;
  elapsedSeconds: number;
  width?: number;
}

export const TopContainer = ({
  puzzleNumber,
  elapsedSeconds,
  width,
}: TopContainerProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;

  return (
    <View
      style={[
        {
          paddingHorizontal: 24,
          paddingVertical: 16,
          alignItems: "center",
        },
        width !== undefined ? { width } : { alignSelf: "stretch" },
      ]}
    >
      <Text style={[typography.h6, { marginBottom: 16 }]}>
        Puzzle {puzzleNumber}
      </Text>
      <Divider />
      <Text style={[typography.h4, { marginTop: isLandscape ? 8 : 16 }]}>
        {formatTime(elapsedSeconds)}
      </Text>
    </View>
  );
};
