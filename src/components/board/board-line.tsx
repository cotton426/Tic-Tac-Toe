import React, { ReactElement, useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { BoardResult, colors } from "@utils";

const style = StyleSheet.create({
  line: {
    position: "absolute",
    backgroundColor: colors.redpink,
  },
  vLine: {
    width: 6,
  },
  hLine: {
    height: 6,
  },
  dLine: {
    width: 6,
    top: 0,
    left: "50%",
  },
});

type BoardLineProps = {
  gameResult?: BoardResult | false;
  size: number;
};

export default function BoardLine({
  size,
  gameResult,
}: BoardLineProps): ReactElement {
  const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));

  const animationRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && (
        <Animated.View
          style={[
            style.line,
            style.vLine,
            {
              left: `${33.333 * gameResult.column - 16.666}%`,
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.row && gameResult.direction === "H" && (
        <Animated.View
          style={[
            style.line,
            style.hLine,
            {
              top: `${33.333 * gameResult.row - 16.66}%`,
              width: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
        <Animated.View
          style={[
            style.line,
            style.dLine,
            {
              height: animationRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHeight],
              }),
              transform: [
                {
                  translateY: animationRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHeight - size) / 2],
                  }),
                },
                {
                  rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                },
              ],
            },
          ]}
        ></Animated.View>
      )}
    </>
  );
}
