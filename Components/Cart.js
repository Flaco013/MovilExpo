import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Stylesheet,
  Alert,
  ImageBackground,
  Modal,
} from "react-native";
import loginStyles from "./Styles";
import { connect } from "react-redux";
import { removeFromCart, addToCart } from "./actions";
import Drinks from "./Drinks";
import { cartStyles } from "./Styles";

const Cart = ({ selectedItems, removeFromCart, addToCart, navigation }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDrinksModalVisible, setDrinksModalVisible] = useState(false);


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
   
    if (item.quantity > 1) {
      
      removeFromCart({ ...item, quantity: item.quantity - 1 });
    } else {
      // If the quantity is 1, remove the item from the cart
      removeFromCart(item);
    }
  };

  const handleAddAnother = (item) => {
    addToCart(item);
  };

  const handleNavigateToCheckout = () => {
    if (totalPrice > 0) {
      navigation.navigate("CheckOut", { totalPrice });
    } else {
  
      Alert.alert("Empty Cart", "Cart is empty. Please add items in cuisine.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const handleShowDrinks = () => {
    setDrinksModalVisible(true);
  };

  const handleCloseDrinks = () => {
    setDrinksModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("/Users/alexisgasga1/todo-list-mobile/assets/sushi.png")}
      style={loginStyles.background}
    >
      <View style={cartStyles.container}>
        <Text style={cartStyles.title}>Your Order</Text>
        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            console.log("this is from Cart component");
            console.log("Rendering Item:", item);
            return (
              <View style={cartStyles.cartItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={cartStyles.itemImage}
                />
                <View style={cartStyles.itemDetails}>
                  <Text style={cartStyles.itemName}>{item.name}</Text>
                  <Text style={cartStyles.itemPrice}>${item.price}</Text>
                </View>
                <View style={cartStyles.buttonsContainer}>
                  <TouchableOpacity onPress={() => handleRemove(item)}>
                    <View style={cartStyles.removeButton}>
                      <Text style={cartStyles.buttonText}> - </Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={cartStyles.itemName}>{item.quantity} </Text>
                  <TouchableOpacity onPress={() => handleAddAnother(item)}>
                    <View style={cartStyles.addButton}>
                      <Text style={cartStyles.buttonText}> + </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity onPress={handleShowDrinks}>
          <View style={cartStyles.addDrinksButton}>
            <Text style={cartStyles.buttonText}>Add Drinks</Text>
          </View>
        </TouchableOpacity>
        <View style={cartStyles.totalContainer}>
          <Text style={cartStyles.totalText}>Total:</Text>
          <Text style={cartStyles.totalAmount}>${totalPrice.toFixed(2)}</Text>
        </View>

       

        <TouchableOpacity onPress={handleNavigateToCheckout}>
          <View style={cartStyles.checkoutButton}>
            <Text style={cartStyles.buttonCheckOutText}>Go to Check Out</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDrinksModalVisible}
          onRequestClose={handleCloseDrinks}
        >
          <Drinks onClose={handleCloseDrinks} onAddToCart={addToCart} />
        </Modal>
      </View>
    </ImageBackground>
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
