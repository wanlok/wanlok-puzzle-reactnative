import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { palette } from "../theme/palette";
import { usePuzzleContext } from "../context/PuzzleContext";
import { Row } from "../components/Row";

export const Settings = () => {
  const {
    puzzleSettings,
    onDimensionPickerValueChange,
    onNumberOfCheckpointsPickerValueChange,
  } = usePuzzleContext();

  const maxNumberOfCheckpoints = Math.floor(
    (puzzleSettings.dimension * puzzleSettings.dimension) / 2,
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.background.default }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, gap: 16 }}
      >
        <Row
          left="Dimension"
          right={
            <View
              style={{
                borderWidth: 1,
                borderColor: palette.divider,
                backgroundColor: palette.common.white,
              }}
            >
              <Picker
                selectedValue={puzzleSettings.dimension}
                onValueChange={onDimensionPickerValueChange}
                style={{ width: 120 }}
                mode="dialog"
              >
                {Array.from({ length: 5 }, (_, i) => i + 2).map((size) => (
                  <Picker.Item
                    key={size}
                    label={`${size} x ${size}`}
                    value={size}
                  />
                ))}
              </Picker>
            </View>
          }
        />
        <Row
          left="Checkpoints"
          right={
            <View
              style={{
                borderWidth: 1,
                borderColor: palette.divider,
                backgroundColor: palette.common.white,
              }}
            >
              <Picker
                selectedValue={puzzleSettings.numberOfCheckpoints}
                onValueChange={onNumberOfCheckpointsPickerValueChange}
                style={{ width: 120 }}
                mode="dialog"
              >
                {Array.from(
                  { length: maxNumberOfCheckpoints - 1 },
                  (_, i) => i + 2,
                ).map((number) => (
                  <Picker.Item
                    key={number}
                    label={`${number}`}
                    value={number}
                  />
                ))}
              </Picker>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
