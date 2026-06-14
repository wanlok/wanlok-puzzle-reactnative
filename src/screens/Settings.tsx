import { Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { WList, WListItem } from "../components/WList";

export const Settings = () => {
  const { puzzleSettings } = usePuzzleSettingsContext();

  const items: WListItem[] = [
    {
      left: "Dimension",
      right: (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={[typography.body1, { color: palette.text.disabled }]}>
            {`${puzzleSettings.dimension} x ${puzzleSettings.dimension}`}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={palette.text.disabled}
          />
        </View>
      ),
      onPress: () => router.push("/settings/dimension"),
    },
    {
      left: "Checkpoints",
      right: (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={[typography.body1, { color: palette.text.disabled }]}>
            {String(puzzleSettings.numberOfCheckpoints)}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={palette.text.disabled}
          />
        </View>
      ),
      onPress: () => router.push("/settings/checkpoints"),
    },
  ];

  return <WList items={items} />;
};
