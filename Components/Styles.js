import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertical center
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "pink",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default loginStyles;
