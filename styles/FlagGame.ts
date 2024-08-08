import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  gameContainer: {
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
  },
  targetFlag: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  targetFlagImage: {
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  flagImage: {
    width: 100,
    height: 100,
  },
  countryName: {
    fontSize: 14,
    textAlign: "center",
    padding: 5,
  },
  startAnimation: {
    alignItems: "center",
    width: 250,
    height: 250,
    justifyContent: "center",
    flex: 1,
  },
});
