import { Stack } from "expo-router";
import { palette } from "../../../src/theme/palette";
import { typography } from "../../../src/theme/typography";

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.background.default },
        headerTintColor: palette.text.primary,
        headerTitleStyle: typography.body1,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="dimension" options={{ title: "Dimension" }} />
      <Stack.Screen name="checkpoints" options={{ title: "Checkpoints" }} />
    </Stack>
  );
};

export default SettingsLayout;
