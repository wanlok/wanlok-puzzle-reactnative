import { Button, Text, View } from "react-native";
import { Container } from "../components/Container";
import { BoardCanvas } from "../components/BoardCanvas";
import { useMain } from "../hooks/useMain";
import { GameModal } from "../components/GameModal";

export const Main = () => {
  const {
    cells,
    updateCells,
    resetCells,
    newCells,
    isWon,
    isLandscape,
    boardWidth,
  } = useMain({
    margin: 40,
  });
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: isLandscape ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container isLandscape={isLandscape}></Container>
        <BoardCanvas
          cells={cells}
          updateCells={updateCells}
          boardWidth={boardWidth}
        />
        <Container
          isLandscape={isLandscape}
          style={{ flexDirection: "row", gap: 16, justifyContent: "center" }}
        >
          <Button title="New" onPress={newCells} />
          <Button title="Reset" onPress={resetCells} />
        </Container>
      </View>
      <GameModal visible={isWon} text={"You won"} onButtonClick={newCells} />
    </>
  );
};
