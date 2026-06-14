import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../theme/palette";
import { typography } from "../theme/typography";

interface RowValueProps {
  value: string;
}

export const RowValue = ({ value }: RowValueProps) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
    <Text style={[typography.body1, { color: palette.text.primary }]}>
      {value}
    </Text>
    <Ionicons name="chevron-forward" size={16} color={palette.text.disabled} />
  </View>
);
