import React, { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import { BoardState, BoardResult } from "@utils";
import BoardLine from "./board-line";
import styles from "./board.styles";

type BoardProps = {
  state: BoardState;
  size: number;
  disabled?: boolean;
  gameResult?: BoardResult | false;
  onCellPressed?: (index: number) => void;
};

export default function Board({
  state,
  size,
  disabled,
  gameResult,
  onCellPressed,
}: BoardProps): ReactElement {
  return (
    <View
      style={[
        styles.board,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={styles.cell}
          >
            <Text style={styles.celltext}>{cell}</Text>
          </TouchableOpacity>
        );
      })}
      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
}
