import { router } from "expo-router";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { RowValue } from "../components/RowValue";
import { WSectionList, WSectionListSection } from "../components/WSectionList";

export const Settings = () => {
  const { puzzleSettings } = usePuzzleSettingsContext();

  const sections: WSectionListSection[] = [
    {
      title: "Puzzle",
      data: [
        {
          left: "Dimension",
          right: (
            <RowValue
              value={`${puzzleSettings.dimension} x ${puzzleSettings.dimension}`}
            />
          ),
          onPress: () => router.push("/settings/dimension"),
        },
        {
          left: "Checkpoints",
          right: (
            <RowValue value={String(puzzleSettings.numberOfCheckpoints)} />
          ),
          onPress: () => router.push("/settings/checkpoints"),
        },
      ],
    },
  ];

  return <WSectionList sections={sections} />;
};
