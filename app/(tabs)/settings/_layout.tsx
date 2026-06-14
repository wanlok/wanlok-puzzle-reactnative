import { Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import { palette } from "../../../src/theme/palette";
import { typography } from "../../../src/theme/typography";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={navigation.goBack}
      accessibilityLabel=""
      android_ripple={{
        color: palette.divider,
        borderless: true,
        radius: 20,
      }}
    >
      <Ionicons name="arrow-back" size={24} color={palette.text.primary} />
    </Pressable>
  );
};

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.background.default },
        headerTintColor: palette.text.primary,
        headerTitleStyle: typography.body1,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center",
        ...(Platform.OS === "android" && {
          headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
        }),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="dimension" options={{ title: "Dimension" }} />
      <Stack.Screen name="checkpoints" options={{ title: "Checkpoints" }} />
    </Stack>
  );
};

export default SettingsLayout;
