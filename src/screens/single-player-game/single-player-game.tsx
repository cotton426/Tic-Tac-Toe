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
} from "@utils";

export default function Game(): ReactElement {
  const [state, setstate] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  // const b: BoardState = ["x", null, "x", "o", "o", null, "x", "o", "x"];
  // printFormattedBoard(b);
  // console.log(isTerminal(b));

  // console.log(isEmpty(b));
  // console.log(isFull(b));
  // console.log(getAvailableMoves(b));
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
