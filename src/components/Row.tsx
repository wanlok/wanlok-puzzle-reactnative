import { View } from "react-native";

interface RowProps {
  left: React.ReactNode;
  right: React.ReactNode;
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
      {left}
      {right}
    </View>
  );
};
