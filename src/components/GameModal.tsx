import { Modal, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "../theme/palette";
import { WButton } from "./WButton";
import { typography } from "../theme/typography";
import { usePuzzleStateContext } from "../context/PuzzleStateContext";
import { usePuzzleSettingsContext } from "../context/PuzzleSettingsContext";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { generateSeed } from "../utils/generateSeed";
import { formatTime } from "../utils/formatTime";

export const GameModal = () => {
  const { puzzleNumber, isWon, elapsedSeconds, result } =
    usePuzzleStateContext();
  const { puzzleSettings, generateNewPuzzle } = usePuzzleSettingsContext();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const insets = useSafeAreaInsets();

  const onNextButtonPress = () => {
    generateNewPuzzle({ ...puzzleSettings, seed: generateSeed() });
  };

  return (
    <Modal transparent visible={isWon} animationType="slide">
      <View
        style={{
          flex: 1,
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingLeft: insets.left,
          paddingRight: insets.right,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "stretch",
            marginHorizontal: 40,
            padding: 24,
            gap: 24,
            borderColor: palette.divider,
            borderWidth: 1,
          }}
        >
          <Text style={typography.h6}>Puzzle {puzzleNumber} Result</Text>
          <Divider />
          <View
            style={{
              flexDirection: isLandscape ? "row" : "column",
              gap: isLandscape ? 48 : 24,
            }}
          >
            <View style={[{ flex: isLandscape ? 1 : undefined, gap: 24 }]}>
              <Row
                left="Dimension"
                right={`${puzzleSettings.dimension} x ${puzzleSettings.dimension}`}
              />
              <Row
                left="Checkpoints"
                right={String(puzzleSettings.numberOfCheckpoints)}
              />
              <Row left="Time" right={formatTime(elapsedSeconds)} />
            </View>
            <View style={[{ flex: isLandscape ? 1 : undefined, gap: 24 }]}>
              <Row
                left="Moves"
                right={`${result.moveCount} / ${puzzleSettings.dimension * puzzleSettings.dimension}`}
              />
              <Row
                left="Clear button pressed"
                right={String(result.clearCount)}
              />
            </View>
          </View>
          <WButton title="Next" onPress={onNextButtonPress} />
        </View>
      </View>
    </Modal>
  );
};
