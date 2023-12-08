import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { drinkStyles } from "./Styles";

const Drinks = ({ onClose, onAddToCart }) => {
  const [drinksData, setDrinksData] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(
        "http://192.168.1.69:3000/drinks_nonalcoholic"
      );
      const data = await response.json();

      const simplifiedData = data.map((item) => ({
        id: item.id,
        imageUrl: item.picture,
        price: item.price,
        name: item.name,
      }));

      setDrinksData(simplifiedData);
    };

    fetchDrinks();
  }, []);

  const handleAddToCart = (drink) => {
    onAddToCart(drink);
    onClose();
  };

  return (
    <View style={drinkStyles.container}>
      <Text style={drinkStyles.title}>Add Drinks</Text>
      <FlatList
        data={drinksData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <View style={drinkStyles.drinkItem}>
              <Text style={drinkStyles.drinkName}>{item.name}</Text>
              <Text style={drinkStyles.drinkPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={onClose}>
        <View style={drinkStyles.closeButton}>
          <Text style={drinkStyles.buttonText}>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Drinks;
