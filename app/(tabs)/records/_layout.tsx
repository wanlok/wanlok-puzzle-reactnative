import { Stack } from "expo-router";
import { palette } from "../../../src/theme/palette";
import { typography } from "../../../src/theme/typography";

const RecordsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.background.default },
        headerTintColor: palette.text.primary,
        headerTitleStyle: typography.body1,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Records" }} />
    </Stack>
  );
};

export default RecordsLayout;
