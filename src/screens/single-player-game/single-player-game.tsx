import React, { ReactElement } from "react";
import { SafeAreaView } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import {
  printFormattedBoard,
  BoardState,
  isEmpty,
  isFull,
  getAvailableMoves,
  isTerminal,
} from "@utils";

export default function Game(): ReactElement {
  const b: BoardState = ["x", null, "x", "o", "o", null, "x", "o", "x"];
  printFormattedBoard(b);
  console.log(isTerminal(b));

  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          onCellPressed={(index) => {
            alert(index);
          }}
          state={b}
          size={250}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
