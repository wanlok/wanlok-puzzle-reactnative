import { ReactNode, useState } from "react";
import { Pressable, SectionList, Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isLiquidGlass } from "../utils/isLiquidGlass";
import { Divider } from "./Divider";
import { Row } from "./Row";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";

export interface WListItem {
  left: ReactNode | string;
  right?: ReactNode;
  onPress: () => void;
}

export interface WSectionListSection {
  title?: string;
  data: WListItem[];
}

interface WSectionListProps {
  sections: WSectionListSection[];
  itemPressableStyle?: ViewStyle;
}

export const WSectionList = ({
  sections,
  itemPressableStyle,
}: WSectionListProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const isScrollable = contentHeight > listHeight;
  const insets = useSafeAreaInsets();

  return (
    <SectionList
      sections={sections}
      keyExtractor={(_, index) => String(index)}
      stickySectionHeadersEnabled
      onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
      onContentSizeChange={(_, height) => setContentHeight(height)}
      renderSectionHeader={({ section }) => {
        {
          return section.title ? (
            <View style={{ backgroundColor: palette.background.default }}>
              <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <Text style={[typography.body1, { lineHeight: 24 }]}>
                  {section.title}
                </Text>
              </View>
              <Divider />
            </View>
          ) : (
            <Divider />
          );
        }
      }}
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
      renderSectionFooter={({ section }) => {
        const isLastSection = sections[sections.length - 1] === section;
        if (isLastSection && isScrollable) {
          return null;
        }
        return <Divider />;
      }}
      style={{ backgroundColor: palette.background.default }}
      contentContainerStyle={{
        paddingBottom: isLiquidGlass ? 16 : 0,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => (
        <Pressable
          onPress={item.onPress}
          style={({ pressed }) => ({
            paddingVertical: 16,
            paddingHorizontal: 24,
            backgroundColor: pressed
              ? palette.background.default
              : palette.common.white,
            ...itemPressableStyle,
          })}
        >
          <Row left={item.left} right={item.right ?? null} />
        </Pressable>
      )}
    />
  );
};
