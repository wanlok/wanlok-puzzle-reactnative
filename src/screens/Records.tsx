import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GameRecord } from "../Types";
import { loadGameRecords } from "../utils/gameStorage";
import { formatTime } from "../utils/formatTime";
import { Board, BOARD_BORDER_WIDTH, CELL_GAP } from "../components/Board";
import { BoardPath } from "../components/BoardPath";
import { WSectionList, WSectionListSection } from "../components/WSectionList";
import { typography } from "../theme/typography";

const THUMBNAIL_WIDTH = 200;

const getThumbnailCellWidth = (dimension: number) => {
  const innerWidth = THUMBNAIL_WIDTH - 2 * BOARD_BORDER_WIDTH;
  return (innerWidth - (dimension - 1) * CELL_GAP) / dimension;
};

export const Records = () => {
  const [records, setRecords] = useState<GameRecord[]>([]);

  useEffect(() => {
    loadGameRecords().then(setRecords);
  }, []);

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
            <View style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_WIDTH }}>
              <Board cells={record.cells} cellWidth={cellWidth} />
              <BoardPath
                cells={record.cells}
                cellWidth={cellWidth}
                boardWidth={THUMBNAIL_WIDTH}
                cellGap={CELL_GAP}
                boardBorderWidth={BOARD_BORDER_WIDTH}
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
              <Text style={typography.body2}>{record.moveCount} moves</Text>
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
