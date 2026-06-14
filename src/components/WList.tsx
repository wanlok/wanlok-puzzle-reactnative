import { ReactNode } from "react";
import { FlatList, TouchableHighlight, View } from "react-native";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { palette } from "../theme/palette";

export interface WListItem {
  left: string;
  right?: ReactNode;
  onPress: () => void;
}

interface WListProps {
  items: WListItem[];
}

export const WList = ({ items }: WListProps) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.left}
      ListHeaderComponent={Divider}
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
      ListFooterComponent={Divider}
      style={{ backgroundColor: palette.background.default }}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={item.onPress}
          underlayColor={palette.divider}
        >
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 24,
              backgroundColor: palette.common.white,
            }}
          >
            <Row left={item.left} right={item.right ?? null} />
          </View>
        </TouchableHighlight>
      )}
    />
  );
};
