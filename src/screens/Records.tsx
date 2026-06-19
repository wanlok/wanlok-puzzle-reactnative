import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Text, View } from "react-native";
import { GameRecord } from "../Types";
import { loadGameRecords } from "../utils/gameStorage";
import { formatTime } from "../utils/formatTime";
import { Board, CELL_GAP } from "../components/Board";
import { BoardPath } from "../components/BoardPath";
import { WSectionList, WSectionListSection } from "../components/WSectionList";
import { typography } from "../theme/typography";
import { BOARD_BORDER_WIDTH } from "../components/BoardCanvas";
import { palette } from "../theme/palette";

const THUMBNAIL_WIDTH = 150;
const THUMBNAIL_INNER_WIDTH = THUMBNAIL_WIDTH - 2 * BOARD_BORDER_WIDTH;

const getThumbnailCellWidth = (dimension: number) =>
  (THUMBNAIL_INNER_WIDTH - (dimension - 1) * CELL_GAP) / dimension;

export const Records = () => {
  const [records, setRecords] = useState<GameRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadGameRecords().then(setRecords);
    }, []),
  );

  const sections: WSectionListSection[] = [
    {
      data: [...records].reverse().map((record, index) => {
        const dimension = record.cells.length;
        const numberOfCheckpoints = record.cells
          .flat()
          .filter((cell) => cell.checkpoint !== null).length;
        const cellWidth = getThumbnailCellWidth(dimension);
        return {
          left: (
            <View
              style={{
                width: THUMBNAIL_WIDTH,
                height: THUMBNAIL_WIDTH,
                borderWidth: BOARD_BORDER_WIDTH,
                borderColor: palette.divider,
                overflow: "hidden",
              }}
            >
              <Board
                cells={record.cells}
                cellWidth={cellWidth}
                showCheckpoints={false}
              />
              <BoardPath
                cells={record.cells}
                cellWidth={cellWidth}
                boardWidth={THUMBNAIL_INNER_WIDTH}
                cellGap={CELL_GAP}
                showCheckpoints={false}
              />
            </View>
          ),
          right: (
            <View style={{ flex: 1, gap: 8 }}>
              <Text style={typography.body2}>
                Puzzle {records.length - index}
              </Text>
              <Text style={typography.body2}>
                {new Date(record.timestamp).toLocaleDateString()}
              </Text>
              <Text style={typography.body2}>
                {formatTime(record.elapsedSeconds)}
              </Text>
              <Text style={typography.body2}>
                {numberOfCheckpoints} checkpoints
              </Text>
              <Text style={typography.body2}>
                {record.moveCount} / {dimension * dimension} moves
              </Text>
            </View>
          ),
          onPress: () => {},
        };
      }),
    },
  ];

  return (
    <WSectionList
      sections={sections}
      itemPressableStyle={{ paddingVertical: 24 }}
    />
  );
};
