import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GameRecord } from "../Types";
import { loadGameRecords } from "../utils/gameStorage";
import { formatTime } from "../utils/formatTime";
import { isLiquidGlass } from "../utils/isLiquidGlass";
import { Divider } from "../components/Divider";
import { Row } from "../components/Row";
import { palette } from "../theme/palette";

export const Records = () => {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadGameRecords().then(setRecords);
  }, []);

  const reversedRecords = [...records].reverse();

  return (
    <FlatList
      data={reversedRecords}
      keyExtractor={(_, i) => String(i)}
      ListHeaderComponent={<Divider />}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: palette.common.white,
            paddingHorizontal: 24,
          }}
        >
          <Divider />
        </View>
      )}
      ListFooterComponent={records.length > 0 ? <Divider /> : undefined}
      contentContainerStyle={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: isLiquidGlass ? 16 : 0,
      }}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: palette.background.default }}
      renderItem={({ item, index }: { item: GameRecord; index: number }) => {
        const puzzleNumber = records.length - index;
        const date = new Date(item.timestamp).toLocaleDateString();
        return (
          <View
            style={{
              padding: 24,
              backgroundColor: palette.common.white,
              gap: 16,
            }}
          >
            <Row left={`Puzzle ${puzzleNumber}`} right={date} />
            <Row
              left={`${item.dimension} x ${item.dimension}`}
              right={formatTime(item.elapsedSeconds)}
            />
            <Row
              left={`${item.numberOfCheckpoints} checkpoints`}
              right={`${item.moveCount} moves`}
            />
          </View>
        );
      }}
    />
  );
};
