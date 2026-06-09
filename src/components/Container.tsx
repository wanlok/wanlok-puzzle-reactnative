import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ContainerProps {
  isLandscape: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Container = ({
  isLandscape,
  style,
  children,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <View
      style={[
        { padding: 24, alignItems: "center" },
        isLandscape ? { flex: 1 } : { alignSelf: "stretch" },
        style,
      ]}
    >
      {children}
    </View>
  );
};
