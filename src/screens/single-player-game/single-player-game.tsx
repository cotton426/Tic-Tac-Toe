import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import { printFormattedBoard, BoardState } from "@utils";

export default function Game(): ReactElement {
  const a: BoardState = ["x", "o", "x", "x", "o", "x", "x", "o", null];
  printFormattedBoard(a);
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={a}
          size={250}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
