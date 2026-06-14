import { Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { WList, WListItem } from "../components/WList";
import { palette } from "../theme/palette";
import { Divider } from "../components/Divider";
import { typography } from "../theme/typography";

export const SettingsCheckpoints = () => {
  const { puzzleSettings, onNumberOfCheckpointsPickerValueChange } =
    usePuzzleSettingsContext();

  const maximumNumberOfCheckpoints = Math.floor(
    (puzzleSettings.dimension * puzzleSettings.dimension) / 2,
  );

  const items: WListItem[] = Array.from(
    { length: maximumNumberOfCheckpoints - 1 },
    (_, i) => {
      const numberOfCheckpoints = i + 2;
      return {
        left: `${numberOfCheckpoints}`,
        right:
          numberOfCheckpoints === puzzleSettings.numberOfCheckpoints ? (
            <Ionicons name="checkmark" size={24} color={palette.common.black} />
          ) : null,
        onPress: () => {
          onNumberOfCheckpointsPickerValueChange(numberOfCheckpoints);
          router.back();
        },
      };
    },
  );

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: palette.background.default,
        }}
      >
        <Text style={[typography.body1, { lineHeight: 24 }]}>
          The number of checkpoints is limited to half the total number of
          cells.
        </Text>
      </View>
      <Divider />
      <WList items={items} />
    </>
  );
};
