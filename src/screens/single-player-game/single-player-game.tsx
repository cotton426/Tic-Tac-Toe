import React, { ReactElement, useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBackground } from "@components";
import { Board } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove } from "@utils";
import { Audio } from "expo-av";

export default function Game(): ReactElement {
  // prettier-ignore
  const [state, setstate] = useState<BoardState>([
    null,null,null,
    null,null,null,
    null,null,null,
  ]);
  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() < 0.5 ? "HUMAN" : "BOT"
  );
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);

  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setstate(stateCopy);
    try {
      symbol === "x"
        ? popSoundRef.current?.replayAsync()
        : pop2SoundRef.current?.replayAsync();
    } catch (error) {
      console.error();
    }
  };

  const handleOncellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;
    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  useEffect(() => {
    if (gameResult) {
      alert("Game Over");
    } else {
      if (turn === "BOT") {
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];
          const firstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];
          insertCell(firstMove, "x");
          setIsHumanMaximizing(false);
          setTurn("HUMAN");
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [state, turn]);

  useEffect(() => {
    // Load sound
    /* eslint-disable @typescript-eslint/no-var-requires */
    const popSoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();

    const loadSounds = async () => {
      try {
        await popSoundObject.loadAsync(require("@assets/pop.wav"));
        popSoundRef.current = popSoundObject;

        await pop2SoundObject.loadAsync(require("@assets/pop.mp3"));
        pop2SoundRef.current = pop2SoundObject;
      } catch (error) {
        console.error("Error loading sound:", error); // Log error message
      }
    };
    loadSounds();

    return () => {
      // Unload sound
      popSoundObject?.unloadAsync();
      pop2SoundObject?.unloadAsync();
    };
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
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
