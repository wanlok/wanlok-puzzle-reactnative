import { Button, Text, View } from "react-native";
import { Container } from "./Container";
import { Game } from "./Game";
import { useMain } from "../hooks/useMain";

export const Main = () => {
  const { cells, updateCells, resetCells, newGame, isLandscape, boardWidth } =
    useMain({
      margin: 40,
    });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: isLandscape ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container isLandscape={isLandscape}>
        <Text>Left</Text>
      </Container>
      <Game cells={cells} updateCells={updateCells} boardWidth={boardWidth} />
      <Container isLandscape={isLandscape}>
        <Button title="New" onPress={newGame} />
        <Button title="Reset" onPress={resetCells} />
      </Container>
    </View>
  );
};
