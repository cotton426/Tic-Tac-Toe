import { ReactElement } from "react";
import { BoardState } from "./type";

export const printFormattedBoard = (state: BoardState): void => {
  let formattedString = "";
  state.forEach((cell, index) => {
    formattedString += cell ? ` ${cell} |` : `   |`;
    if ((index + 1) % 3 === 0) {
      formattedString = formattedString.slice(0, -1);
      if (index < 8) {
        formattedString +=
          "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    }
  });
  console.log("\n" + formattedString);
};