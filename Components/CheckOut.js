import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { clearCart } from "./actions";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import loginStyles from "./Styles";
import { checkOutStyles } from "./Styles";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

function CheckOut({ userProfile, userId, dispatchClearCart }) {
  const route = useRoute();
  const { totalPrice } = route.params;
  const nav = useNavigation();

  const [debitCard, setDebitCard] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const handlePlaceOrder = async () => {
    // Validate the debit card number
    if (!/^\d{16}$/.test(debitCard)) {
      Alert.alert(
        "Invalid Debit Card",
        "Please enter a valid 16-digit debit card number."
      );
      return;
    }

    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const currentMonth = new Date().getMonth() + 1;

    const [enteredMonth, enteredYear] = expirationDate
      .split("/")
      .map((s) => parseInt(s, 10));

    if (
      !/^(0[1-9]|1[0-2])\/(2[3-9]|3[0-9]|4[0-9]|5[0-5])$/.test(
        expirationDate
      ) ||
      (enteredYear === currentYear && enteredMonth < currentMonth) // Expiration date is in the past
    ) {
      Alert.alert(
        "Invalid Expiration Date",
        "Please enter a valid expiration date in the format MM/YY that is greater than the current date."
      );
      return;
    }

    // Validate the CVV
    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert("Invalid CVV", "Please enter a valid 3-digit CVV.");
      return;
    }

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
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <View style={checkOutStyles.container}>
        <Text style={checkOutStyles.title}>Delivery Details</Text>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>First Name:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.firstName}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>Last Name:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.lastName}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>Address:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.address}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>City:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.city}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>State:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.state}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>Zip Code:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.zipCode}</Text>
        </View>
        <View style={checkOutStyles.infoContainer}>
          <Text style={checkOutStyles.infoLabel}>Country:</Text>
          <Text style={checkOutStyles.infoValue}>{userProfile.country}</Text>
        </View>

        <TextInput
          style={checkOutStyles.input}
          placeholder="Debit Card Number (16 digits)"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={(text) => setDebitCard(text)}
        />

        <TextInput
          style={checkOutStyles.input}
          placeholder="Expiration Date (MM/YY)"
          maxLength={5}
          onChangeText={(text) => setExpirationDate(text)}
        />

        <TextInput
          style={checkOutStyles.input}
          placeholder="CVV (3 digits)"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(text) => setCVV(text)}
        />

        <Text style={checkOutStyles.amountText}>
          Total Amount: ${totalPrice.toFixed(2)}
        </Text>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={checkOutStyles.placeOrderButton}
        >
          <Text style={checkOutStyles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
