import React, { ReactElement, useEffect, useState } from "react";
import { SafeAreaView, Dimensions, View } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBackground, Board, Text, Button } from "@components";
import {
  BoardState,
  isEmpty,
  isTerminal,
  getBestMove,
  Cell,
  useSounds,
} from "@utils";

const SCREEN_WIDTH = Dimensions.get("screen").width;

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

  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  useSounds();
  const playSound = useSounds();

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;
    stateCopy[cell] = symbol;
    setstate(stateCopy);
    try {
      symbol === "x" ? playSound("pop") : playSound("pop2");
    } catch (error) {
      console.error();
    }
  };

  const handleOncellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;
    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "END" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }
    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }
    return "END";
  };

  const newGame = () => {
    setstate([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);

      if (winner === "HUMAN") {
        playSound("win");
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }

      if (winner === "BOT") {
        playSound("loss");
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }

      if (winner === "END") {
        playSound("end");
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
      }
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

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.difficulty}>Difficulty:Hard</Text>
          <View style={styles.result}>
            <View style={styles.resultBox}>
              <Text style={styles.resultTiTle}>Win</Text>
              <Text style={styles.resultCount}>{gamesCount.wins}</Text>
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultTiTle}>Draw</Text>
              <Text style={styles.resultCount}>{gamesCount.draws}</Text>
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultTiTle}>Loss</Text>
              <Text style={styles.resultCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn !== "HUMAN"}
          onCellPressed={(cell) => {
            handleOncellPressed(cell);
          }}
          state={state}
          gameResult={gameResult}
          size={SCREEN_WIDTH - 150}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
              {getWinner(gameResult.winner) === "BOT" && "You Lost"}
              {getWinner(gameResult.winner) === "END" && "DRAW"}
            </Text>
            <Button
              onPress={() => {
                newGame();
              }}
              title="Play Again"
            ></Button>
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
