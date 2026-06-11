import { ReactNode } from "react";
import { Text, View } from "react-native";
import { typography } from "../theme/typography";

interface RowProps {
  left: ReactNode | string;
  right: ReactNode | string;
}

export const Row = ({ left, right }: RowProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {typeof left === "string" ? (
        <Text style={typography.body1}>{left}</Text>
      ) : (
        left
      )}
      {typeof right === "string" ? (
        <Text style={typography.body1}>{right}</Text>
      ) : (
        right
      )}
    </View>
  );
};
