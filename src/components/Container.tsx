import { PropsWithChildren } from "react";
import { View } from "react-native";

export const Container = ({
  isLandscape,
  children,
}: PropsWithChildren<{ isLandscape: boolean }>) => {
  return (
    <View
      style={[
        { backgroundColor: "blue", padding: 16, alignItems: "center" },
        isLandscape ? { flex: 1 } : { alignSelf: "stretch" },
      ]}
    >
      {children}
    </View>
  );
};
