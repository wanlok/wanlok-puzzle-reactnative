import { PropsWithChildren } from "react";
import { View } from "react-native";

export const Dummy = ({
  isLandscape,
  children,
}: PropsWithChildren<{ isLandscape: boolean }>) => {
  return (
    <View
      style={[
        { backgroundColor: "red", alignItems: "center" },
        isLandscape ? { flex: 1 } : { alignSelf: "stretch" },
      ]}
    >
      {children}
    </View>
  );
};
