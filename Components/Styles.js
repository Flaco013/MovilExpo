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

const orderStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  orderDate: {
    fontSize: 16,
    color: "#666",
  },
});

const cartStyles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    //backgroundColor: "#fff", // Add background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Add text color
  },
  addDrinksButton: {
    backgroundColor: "#0080ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center", // Align items vertically in the row
    backgroundColor: "#f5f5f5", // Add item background color
    padding: 10, // Add padding
    borderRadius: 8, // Add border radius
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Add text color
  },
  itemPrice: {
    fontSize: 19,
    fontWeight: "bold",
    color: "orange",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonCheckOutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black", // Add text color
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7fff00",
  },
});

const cuisineStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#59CDCE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 30,
    width: "80%",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 14,
    borderColor: "#59515E",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 8,
    borderColor: "black",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "orange",
    marginBottom: 5,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});

const drinkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  drinkItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drinkName: {
    fontSize: 18,
    color: "#fff",
  },
  drinkPrice: {
    fontSize: 18,
    color: "#7fff00",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

const checkOutStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#59CDCE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    width: 120,
  },
  infoValue: {
    fontSize: 18,
  },
  amountText: {
    fontSize: 23,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#59515E",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeOrderButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff", // Set background color
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderColor: "#ccc", // Lighter border color
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24, // Add more top margin
  },
  saveButtonText: {
    color: "white",
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff", // Set background color
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderColor: "#ccc", // Lighter border color
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24, // Add more top margin
  },
  saveButtonText: {
    color: "white",
    fontSize: 18, // Increase font size
    fontWeight: "bold", // Add bold style
  },
});

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomButtonsContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  zoomButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
});

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //backgroundColor: "#f7f7f7", // Light background color
  },
  button: {
    backgroundColor: "#eee",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#333", // Dark text color
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff6347", // Tomato color
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  logoutButtonText: {
    color: "white", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default loginStyles;
export {
  orderStyles,
  cartStyles,
  cuisineStyles,
  drinkStyles,
  checkOutStyles,
  profileStyles,
  mapStyles,
  settingStyles,
};
