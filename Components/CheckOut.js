import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { clearCart } from "./actions";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

function CheckOut({ userProfile, userId, dispatchClearCart }) {
  const route = useRoute();
  const { totalPrice } = route.params;
  const nav = useNavigation();

  const handlePlaceOrder = async () => {
    try {
      const db = getFirestore();
      const ordersCollection = collection(db, "orders");

      const newOrder = {
        id: userId,
        total_amount: totalPrice,
        date: serverTimestamp(),
      };

      const docRef = await addDoc(ordersCollection, newOrder);

      dispatchClearCart();

      Alert.alert("Success", "Order placed successfully!", [
        {
          text: "OK",
          onPress: () => {
            nav.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error("Error placing order:", error.message);
      Alert.alert("Error", `Error placing order: ${error.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Details</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>First Name:</Text>
        <Text style={styles.infoValue}>{userProfile.firstName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Name:</Text>
        <Text style={styles.infoValue}>{userProfile.lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoValue}>{userProfile.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>City:</Text>
        <Text style={styles.infoValue}>{userProfile.city}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>State:</Text>
        <Text style={styles.infoValue}>{userProfile.state}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Zip Code:</Text>
        <Text style={styles.infoValue}>{userProfile.zipCode}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Country:</Text>
        <Text style={styles.infoValue}>{userProfile.country}</Text>
      </View>

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
  userProfile: state.userProfile,
  userId: state.userId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchClearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
});
