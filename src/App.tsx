import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World 123</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00FF00",
    alignItems: "center",
    justifyContent: "center",
  },
});
