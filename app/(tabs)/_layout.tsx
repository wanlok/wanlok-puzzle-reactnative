import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { palette } from "../../src/theme/palette";
import { PuzzleProvider } from "../../src/context/PuzzleProvider";

const TabLayout = () => {
  return (
    <PuzzleProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.text.primary,
          tabBarInactiveTintColor: palette.text.disabled,
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 1,
            borderColor: palette.divider,
          },
          tabBarButton: ({ ref, ...props }) => (
            <Pressable {...props} android_ripple={null} />
          ),
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
