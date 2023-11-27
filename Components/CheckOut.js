import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";

function CheckOut({ userProfile }) {
  const route = useRoute();
  const { totalPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Out</Text>
      <Text style={styles.infoText}>
        Total Amount: ${totalPrice.toFixed(2)}
      </Text>
      <Text style={styles.infoText}>Name: {userProfile.firstName}</Text>
      <Text style={styles.infoText}>Last Name: {userProfile.lastName}</Text>
      <Text style={styles.infoText}>Address: {userProfile.address}</Text>
      <Text style={styles.infoText}>Zip Code: {userProfile.zipCode}</Text>
      <Text style={styles.infoText}>Country: {userProfile.country}</Text>
      {/* Display other user profile information as needed */}
    </View>
  );
}

const mapStateToProps = (state) => ({
  userProfile: state.userProfile, // Assuming you have a userProfile reducer
});

export default connect(mapStateToProps)(CheckOut);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  // Add more styles as needed
});
