import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function CheckOut({ userProfile, userId }) {
  const route = useRoute();
  const { totalPrice } = route.params;

  console.log("this should be the ID", userId);

  const handlePlaceOrder = async () => {
    try {
      // Create a reference to the 'orders' collection in Firestore
      const db = getFirestore();
      const ordersCollection = collection(db, "orders");

      // Create a new order document with user ID, total amount, and timestamp
      const newOrder = {
        id: userId, /// Assuming you have a userId in your userProfile
        total_amount: totalPrice,
        date: serverTimestamp(),
      };

      // Add the new order to the 'orders' collection
      const docRef = await addDoc(ordersCollection, newOrder);

      console.log("Order placed successfully! Order ID:", docRef.id);

      // Show an alert when the order is placed successfully
      Alert.alert("Success", "Order placed successfully!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.error("Error placing order:", error.message);
      // Show an alert for the error if needed
      Alert.alert("Error", `Error placing order: ${error.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ship to </Text>
      <Text style={styles.infoText}>First Name: {userProfile.firstName}</Text>
      <Text style={styles.infoText}>Last Name: {userProfile.lastName}</Text>
      <Text style={styles.infoText}>Address: {userProfile.address}</Text>
      <Text style={styles.infoText}>city: {userProfile.city}</Text>
      <Text style={styles.infoText}>State: {userProfile.sate}</Text>
      <Text style={styles.infoText}>Zip Code: {userProfile.zipCode}</Text>
      <Text style={styles.infoText}>Country: {userProfile.country}</Text>

      <Text style={styles.amountText}>
        Total Amount: ${totalPrice.toFixed(2)}
      </Text>

      {/* Place Order Button */}
      <TouchableOpacity
        onPress={handlePlaceOrder}
        style={styles.placeOrderButton}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  userProfile: state.userProfile, // Assuming you have a userProfile reducer
  userId: state.userId,
});

export default connect(mapStateToProps)(CheckOut);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },

  amountText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
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
  // Add more styles as needed
});
