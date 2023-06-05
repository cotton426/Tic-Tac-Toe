import { StyleSheet } from "react-native";
import { colors } from "@utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  field: {
    marginBottom: 30,
  },
  label: {
    color: colors.darkPurple,
    fontSize: 22,
    margin: 5,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  subChoice: {
    backgroundColor: colors.lightGreen,
    padding: 10,
    margin: 5,
    borderRadius: 4,
  },
  choiceText: {
    color: colors.darkPurple,
    fontSize: 22,
  },
  switchField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
