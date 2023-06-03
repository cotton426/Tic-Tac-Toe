import { BoardState } from "./type";
import { isTerminal, getAvailableMoves, printFormattedBoard } from "./board";

export const getBestMove = (
  state: BoardState,
  maximizing: boolean,
  depth = 0
): number => {
  const chileValues: { [key: string]: string } = {};

  const getBestMoveRecursive = (
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

        const chileValue = getBestMoveRecursive(chile, false, depth + 1);
        console.log("chileValue x", chileValue);

        best = Math.max(best, chileValue);
        if (depth === 0) {
          chileValues[chileValue] = chileValues[chileValue]
            ? `${chileValues[chileValue]},${index}`
            : `${index}`;
        }
      });
      console.log("best x", best);
      console.log("chileValues xs", chileValues);
      if (depth === 0) {
        const arr = chileValues[best].split(",");
        const rand = Math.floor(Math.random() * arr.length);
        return parseInt(arr[rand]);
      }
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

        const chileValue = getBestMoveRecursive(chile, true, depth + 1);
        console.log("chileValue o", chileValue);

        best = Math.min(best, chileValue);
        if (depth === 0) {
          chileValues[chileValue] = chileValues[chileValue]
            ? `${chileValues[chileValue]},${index}`
            : `${index}`;
        }
      });
      console.log("best o", best);
      console.log("chileValues os", chileValues);
      if (depth === 0) {
        const arr = chileValues[best].split(",");
        const rand = Math.floor(Math.random() * arr.length);
        return parseInt(arr[rand]);
      }
      return best;
    }
    throw new Error("Unexpected code path reached: getBestMoveRecursive");
  };
  return getBestMoveRecursive(state, maximizing, depth);
};
