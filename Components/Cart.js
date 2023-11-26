import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { removeFromCart, addToCart } from "./actions";

const Cart = ({ selectedItems, removeFromCart, addToCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price when the selected items change
  useEffect(() => {
    console.log("Received selectedItems in Cart:", selectedItems);

    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      let total = 0;
      selectedItems.forEach((item) => {
        console.log("Item:", item);
        total += item.price * item.quantity || 0; // Adjust for quantity
      });
      setTotalPrice(total);
      console.log("Total Price:", total);
    } else {
      setTotalPrice(0);
      console.log("Total Price:", 0);
    }
  }, [selectedItems]);

  const handleRemove = (item) => {
    // Check if the quantity is greater than 1
    if (item.quantity > 1) {
      // If yes, decrement the quantity
      removeFromCart({ ...item, quantity: item.quantity - 1 });
    } else {
      // If the quantity is 1, remove the item from the cart
      removeFromCart(item);
    }
  };

  const handleAddAnother = (item) => {
    addToCart(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          console.log("this is from Cart component");
          console.log("Rendering Item:", item);
          return (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleRemove(item)}>
                  <View style={styles.removeButton}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddAnother(item)}>
                  <View style={styles.addButton}>
                    <Text style={styles.buttonText}>Add Another</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  selectedItems: state.selectedItems,
});

const mapDispatchToProps = {
  removeFromCart,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

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
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center", // Align items vertically in the row
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "gray",
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
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
