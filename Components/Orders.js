import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import loginStyles from "./Styles";

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
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
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
    </ImageBackground>
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
