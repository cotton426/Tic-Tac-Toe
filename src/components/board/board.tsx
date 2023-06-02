import React, { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import { BoardState } from "@utils";

type BoardProps = {
  state: BoardState;
  size: number;
  onCellPressed?: (index: number) => void;
};

export default function Board({
  state,
  size,
  onCellPressed,
}: BoardProps): ReactElement {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "#f7f7f7",
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 3,
      }}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={{
              width: "33.333333%",
              height: "33.333333%",
              borderWidth: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: size / 5,
              }}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
