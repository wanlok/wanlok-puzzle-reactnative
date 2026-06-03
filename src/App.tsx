import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Board } from "./Board";

export const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Board />
      </View>
    </>
  );
};
