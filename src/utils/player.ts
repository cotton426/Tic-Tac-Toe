import { BoardState } from "./type";
import { isTerminal, getAvailableMoves, printFormattedBoard } from "./board";

export const getBestMove = (
  state: BoardState,
  maximizing: boolean,
  depth = 0
): number => {
  const terminalObject = isTerminal(state);
  if (terminalObject) {
    if (terminalObject.winner === "x") {
      return 100 - depth;
    } else if (terminalObject.winner === "o") {
      return -100 + depth;
    }
    return 0;
  }
  if (maximizing) {
    let best = -100;
    getAvailableMoves(state).forEach((index) => {
      const chile: BoardState = [...state];
      chile[index] = "x";
      console.log(`Chile board (x turn) (depth: ${depth}`);
      console.log(chile);

      printFormattedBoard(chile);

      const chileValue = getBestMove(chile, false, depth + 1);
      console.log("chileValue", chileValue);

      best = Math.max(best, chileValue);
    });
    console.log("best", best);
    return best;
  }

  if (!maximizing) {
    let best = 100;
    getAvailableMoves(state).forEach((index) => {
      const chile: BoardState = [...state];
      chile[index] = "o";
      console.log(`Chile board (o turn) (deapth: ${depth}`);
      console.log(chile);

      printFormattedBoard(chile);

      const chileValue = getBestMove(chile, true, depth + 1);
      console.log("chileValue", chileValue);

      best = Math.min(best, chileValue);
    });
    console.log("best", best);
    return best;
  }
  throw new Error("Unexpected code path reached: getBestMove");
};
