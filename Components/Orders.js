import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

function Orders({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        const allOrdersQuery = query(ordersCollection, orderBy("date", "desc"));

        const querySnapshot = await getDocs(allOrdersQuery);
        const allOrders = querySnapshot.docs
          .filter((doc) => {
            const data = doc.data();
            return data.id === userId; // Only include orders for the logged-in user
          })
          .map((doc) => {
            const data = doc.data();
            return {
              id_ref: doc.id,
              date: data.date.toDate(),
              id: data.id ? String(data.id) : "", // Convert to string or use an empty string
              total_amount: data.total_amount.toFixed(2),
            };
          });

        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        // Handle the error in a user-friendly way, e.g., show an error message to the user
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id_ref}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderAmount}>
              Total Amount: ${item.total_amount}
            </Text>
            <Text style={styles.orderDate}>
              Order Date: {item.date.toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId,
});

export default connect(mapStateToProps)(Orders);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Dark text color
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff", // White background
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
    color: "#333",
  },
  orderDate: {
    fontSize: 16,
    color: "#666", // Medium gray text color
  },
});
