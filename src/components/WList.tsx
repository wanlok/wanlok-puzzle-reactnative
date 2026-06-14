import { ReactNode } from "react";
import { FlatList, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { palette } from "../theme/palette";

export interface WListItem {
  label: string;
  right?: ReactNode;
  onPress: () => void;
}

interface WListProps {
  items: WListItem[];
}

export const WList = ({ items }: WListProps) => {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: palette.common.white }}
    >
      <Divider />
      <FlatList
        data={items}
        keyExtractor={(item) => item.label}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={item.onPress}
            underlayColor={palette.divider}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 14,
                backgroundColor: palette.common.white,
              }}
            >
              <Row left={item.label} right={item.right ?? null} />
            </View>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};
