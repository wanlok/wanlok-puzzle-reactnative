import { Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "../../src/theme/palette";
import { PuzzleProvider } from "../../src/context/PuzzleProvider";
import { isLiquidGlass } from "../../src/utils/isLiquidGlass";

const { Trigger } = NativeTabs;
const { Icon, Label } = Trigger;

const TAB_BAR_HEIGHT = 49;

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  if (isLiquidGlass) {
    return (
      <PuzzleProvider>
        <NativeTabs tintColor={palette.text.primary}>
          <Trigger name="index">
            <Icon sf="square.grid.2x2" />
            <Label>Puzzle</Label>
          </Trigger>
          <Trigger name="records">
            <Icon sf="list.bullet" />
            <Label>Records</Label>
          </Trigger>
          <Trigger name="settings">
            <Icon sf="gearshape" />
            <Label>Settings</Label>
          </Trigger>
        </NativeTabs>
      </PuzzleProvider>
    );
  }

  return (
    <PuzzleProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.text.primary,
          tabBarInactiveTintColor: palette.text.disabled,
          tabBarStyle: {
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 1,
            borderColor: palette.divider,
          },
          tabBarButton:
            Platform.OS === "android"
              ? ({ ref, ...props }) => (
                  <Pressable {...props} android_ripple={null} />
                )
              : undefined,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Puzzle",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PuzzleProvider>
  );
};

export default TabLayout;
