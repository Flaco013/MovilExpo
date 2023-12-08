import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import loginStyles from "./Styles";
import { orderStyles } from "./Styles";

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
              id: data.id ? String(data.id) : "",
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
      <View style={orderStyles.container}>
        <Text style={orderStyles.title}>Your Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id_ref}
          renderItem={({ item }) => (
            <View style={orderStyles.orderItem}>
              <Text style={orderStyles.orderAmount}>
                Total Amount: ${item.total_amount}
              </Text>
              <Text style={orderStyles.orderDate}>
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
