import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { WSectionList, WSectionListSection } from "../components/WSectionList";
import { palette } from "../theme/palette";

export const SettingsCheckpoints = () => {
  const { puzzleSettings, onNumberOfCheckpointsPickerValueChange } =
    usePuzzleSettingsContext();

  const maximumNumberOfCheckpoints = Math.floor(
    (puzzleSettings.dimension * puzzleSettings.dimension) / 2,
  );

  const sections: WSectionListSection[] = [
    {
      title:
        "The number of checkpoints is limited to half the total number of cells.",
      data: Array.from({ length: maximumNumberOfCheckpoints - 1 }, (_, i) => {
        const numberOfCheckpoints = i + 2;
        return {
          left: `${numberOfCheckpoints}`,
          right:
            numberOfCheckpoints === puzzleSettings.numberOfCheckpoints ? (
              <Ionicons
                name="checkmark"
                size={24}
                color={palette.common.black}
              />
            ) : null,
          onPress: () => {
            onNumberOfCheckpointsPickerValueChange(numberOfCheckpoints);
            router.back();
          },
        };
      }),
    },
  ];

  return <WSectionList sections={sections} />;
};
