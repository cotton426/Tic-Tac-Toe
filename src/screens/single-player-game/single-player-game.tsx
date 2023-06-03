import React, { ReactElement, useState } from "react";
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
  getBestMove,
} from "@utils";

export default function Game(): ReactElement {
  const [state, setstate] = useState<BoardState>([
    null,
    "x",
    null,
    "o",
    null,
    "x",
    "o",
    "o",
    "x",
  ]);
  console.log("getBestMove", getBestMove(state, true));

  const handleOncellPressed = (cell: number): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = "x";
    setstate(stateCopy);
  };
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state))}
          onCellPressed={(cell) => {
            handleOncellPressed(cell);
          }}
          state={state}
          size={250}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
