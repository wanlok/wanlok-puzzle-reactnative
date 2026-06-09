import { Text, useWindowDimensions, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PuzzleSettings } from "../Types";
import { Container } from "./Container";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { palette } from "../theme/palette";

interface TopContainerProps {
  puzzleSettings: PuzzleSettings;
  elapsedSeconds: number;
  onDimensionPickerValueChange: (dimension: number) => void;
  onNumberOfCheckpointsPickerValueChange: (numberOfCheckpoints: number) => void;
}

export const TopContainer = ({
  puzzleSettings,
  elapsedSeconds,
  onDimensionPickerValueChange,
  onNumberOfCheckpointsPickerValueChange,
}: TopContainerProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const maxNumberOfCheckpoints = Math.floor(
    (puzzleSettings.dimension * puzzleSettings.dimension) / 2,
  );

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Container isLandscape={isLandscape} style={{ gap: 16 }}>
      <Row
        left={<Text>Dimension</Text>}
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
        left={<Text>Checkpoints</Text>}
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
                <Picker.Item key={number} label={`${number}`} value={number} />
              ))}
            </Picker>
          </View>
        }
      />

      <Divider />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text>{puzzleSettings.seed}</Text>
        <Text>{formattedTime}</Text>
      </View>
    </Container>
  );
};
