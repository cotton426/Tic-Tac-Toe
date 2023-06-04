import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  difficulty: {
    color: colors.lightGreen,
    fontSize: 22,
    textAlign: "center",
  },
  result: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  resultBox: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    alignItems: "center",
    padding: 15,
    marginHorizontal: 5,
  },
  resultTiTle: {
    textAlign: "center",
    width: 50,
    color: colors.purple,
    fontSize: 18,
  },
  resultCount: {
    color: colors.purple,
    fontSize: 20,
  },
  modal: {
    position: "absolute",
    backgroundColor: colors.purple,
    bottom: 160,
    left: 30,
    right: 30,
    padding: 30,
    paddingTop: 10,
    borderRadius: 10,
  },
  modalText: {
    color: colors.lightGreen,
    fontSize: 28,
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default styles;
