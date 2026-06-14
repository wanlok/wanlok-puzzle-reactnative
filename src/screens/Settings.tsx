import { router } from "expo-router";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { RowValue } from "../components/RowValue";
import { WList, WListItem } from "../components/WList";

export const Settings = () => {
  const { puzzleSettings } = usePuzzleSettingsContext();

  const items: WListItem[] = [
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
      right: <RowValue value={String(puzzleSettings.numberOfCheckpoints)} />,
      onPress: () => router.push("/settings/checkpoints"),
    },
  ];

  return <WList items={items} />;
};
