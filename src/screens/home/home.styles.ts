import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 120,
  },
  logo: {
    height: 220,
    maxWidth: "60%",
    resizeMode: "contain",
    transform: [{ rotate: "-10deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  buttons: {
    marginTop: 60,
  },
  button: {
    marginBottom: 20,
  },
});

export default styles;
