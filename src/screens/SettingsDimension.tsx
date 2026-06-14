import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { WSectionList, WSectionListSection } from "../components/WSectionList";
import { palette } from "../theme/palette";

export const SettingsDimension = () => {
  const { puzzleSettings, onDimensionPickerValueChange } =
    usePuzzleSettingsContext();

  const sections: WSectionListSection[] = [
    {
      data: Array.from({ length: 5 }, (_, i) => {
        const dimension = i + 2;
        return {
          left: `${dimension} x ${dimension}`,
          right:
            dimension === puzzleSettings.dimension ? (
              <Ionicons
                name="checkmark"
                size={24}
                color={palette.common.black}
              />
            ) : null,
          onPress: () => {
            onDimensionPickerValueChange(dimension);
            router.back();
          },
        };
      }),
    },
  ];

  return <WSectionList sections={sections} />;
};
