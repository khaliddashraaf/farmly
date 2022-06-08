import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    height: 47,
    borderRadius: 15,
    backgroundColor: "#619C0B",
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    maxHeight: 200,
  },
  listItem: {
    flex: 1,
    height: 30,
    alignItems: "center",
  },
  circular: {
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  circularText: {
    fontSize: 25,
    fontWeight: "700",
  },
});
