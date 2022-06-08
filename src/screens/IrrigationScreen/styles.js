import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  statusContainer: {
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    borderRadius: 20,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    minHeight: 180,
  },
  threshContainer: {
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    borderRadius: 20,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    minHeight: 230,
  },
  // Irrigation Component
  buttonContainer: {
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    minHeight: 100,
  },
  irr: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
  },
  irrIcon: {
    marginHorizontal: 20,
  },
  irrText: {
    fontSize: 15,
    fontWeight: "500",
  },
  irrButton: {
    alignSelf: "center",
    backgroundColor: "#A6BF8E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: -50,
  },
  listItem: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
  },
  header: {
    height: 50,
    backgroundColor: "#A6BF8E",
    marginTop: -20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  footer: {
    height: 50,
    backgroundColor: "#A6BF8E",
    width: "100%",
    alignContent: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
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
  thresh: {
    marginTop: 5,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
  },
  texthresh: {
    marginLeft: 15,
    marginTop: 5,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#A6BF8E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
