import { ReactNode } from "react";
import { FlatList, Pressable, View } from "react-native";
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
      style={{ backgroundColor: palette.background.default }}
      renderItem={({ item }) => (
        <Pressable
          onPress={item.onPress}
          style={({ pressed }) => ({
            padding: 24,
            backgroundColor: pressed
              ? palette.background.default
              : palette.common.white,
          })}
        >
          <Row left={item.left} right={item.right ?? null} />
        </Pressable>
      )}
    />
  );
};
