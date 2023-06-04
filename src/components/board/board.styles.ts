import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  board: {
    backgroundColor: "rgba(247, 247, 247, 0.4)",
    flexDirection: "row",
    borderColor: "#F0EEED",
    borderWidth: 2,
    flexWrap: "wrap",
  },
  cell: {
    width: "33.333333%",
    height: "33.333333%",
    borderWidth: 3,
    borderColor: "#F0EEED",
    alignItems: "center",
    justifyContent: "center",
  },
  celltext: {
    fontSize: 70,
  },
});

export default styles;
