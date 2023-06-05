import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F0EEED",
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 30,

    // Shadow settings for iOS
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 1,

    // Shadow settings for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#332C39",
    textAlign: "center",
  },
});

export default styles;
